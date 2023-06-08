from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.templating import Jinja2Templates

import logging

from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain
from langchain.llms import OpenAI
from langchain.callbacks.base import AsyncCallbackHandler
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores.chroma import Chroma
from langchain.chains.summarize import load_summarize_chain


from utils.schemas import ChatResponse
from utils.chromadb_manager import get_vectorstore, get_documents


app = FastAPI()
templates = Jinja2Templates(directory="templates")


class MyCustomCallbackHandler(AsyncCallbackHandler):
    def __init__(self, websocket):
        self.websocket = websocket

    async def on_llm_new_token(self, token: str, **kwargs) -> None:
        resp = ChatResponse(sender="bot", message=token, type="stream")
        await self.websocket.send_json(resp.dict())


@app.on_event("startup")
async def startup():
    logging.log(msg="Starting up", level=logging.INFO)


@app.websocket("/summary")
async def summary_endpoint(websocket: WebSocket):
    try:
        await websocket.accept()

        # Construct a message containing the document summary
        start_resp = ChatResponse(sender="bot", message="", type="start")
        await websocket.send_json(start_resp.dict())

        # Load the document and initialize necessary components
        docs = get_documents("./client/docs/doc.pdf")
        embeddings = OpenAIEmbeddings()
        vectordb = Chroma.from_documents(docs, embeddings)
        llm = OpenAI(streaming=True, callbacks=[MyCustomCallbackHandler(websocket)], temperature=0)
        chain = load_summarize_chain(llm, chain_type="stuff")

        # Process the summary request
        search = vectordb.similarity_search(" ")
        summary = await chain.arun(input_documents=search, question="Write a summary within 150 words.")

        # Send the summary response
        end_resp = ChatResponse(sender="bot", message="", type="end")
        await websocket.send_json(end_resp.dict())

    except Exception as e:
        # Handle and log the exception
        error_resp = ChatResponse(sender="bot", message=str(e), type="error")
        await websocket.send_json(error_resp.dict())

    finally:
        await websocket.close()
        print("WebSocket closed")


@app.websocket("/chat")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()

    while True:
        try:
            # Receive and send back the client message
            question = await websocket.receive_text()
            resp = ChatResponse(sender="you", message=question, type="stream")
            await websocket.send_json(resp.dict())
            chat_history = []

            # Construct a response
            start_resp = ChatResponse(sender="bot", message="", type="start")
            await websocket.send_json(start_resp.dict())

            vectorstore = get_vectorstore(db_dir="./client/chromadb")
            memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)

            qa = ConversationalRetrievalChain.from_llm(
                    OpenAI(
                        streaming=True,
                        callbacks=[MyCustomCallbackHandler(websocket)],
                        temperature=0),
                    vectorstore.as_retriever(),
                    memory=memory,
                    chain_type="stuff",
            )

            result = await qa.acall({"question": question})

            end_resp = ChatResponse(sender="bot", message="", type="end")
            await websocket.send_json(end_resp.dict())


        except WebSocketDisconnect:
            await websocket.close()
            print("WebSocket closed")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=9000)