from fastapi import FastAPI, File, UploadFile, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain
from langchain.llms import OpenAI
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
from werkzeug.utils import secure_filename
import shutil
import json
import os
import sys

sys.path.append("../utils")
from query_data import *
from chromadb_manager import *
from utils import *
from callback import *
from schemas import *

app = FastAPI()

# Configure CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # client-side application domain(s)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post('/api/answer')
async def answer(request: Request) -> JSONResponse:
    """
    Endpoint for answering a question.

    Parameters:
        - request (Request): The incoming request containing the question.

    Returns:
        JSONResponse: The answer to the question.
    """
    data = await request.json()
    question: str = data["question"]

    # Get vectorstore
    vectorstore = get_vectorstore(db_dir="../client/chromadb")

    # Initialize memory
    memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)

    # Initialize Conversational Retrieval Chain
    qa = ConversationalRetrievalChain.from_llm(
        OpenAI(streaming=True,
                callbacks=[StreamingStdOutCallbackHandler()],
                temperature=0),
        vectorstore.as_retriever(),
        memory=memory,
        chain_type="stuff"
    )

    return qa({"question": question})


@app.post('/api/ingest')
async def upload_file(file: UploadFile = File(...)) -> JSONResponse:
    """
    Endpoint for uploading a file.

    Parameters:
        - file (UploadFile): The uploaded file.

    Returns:
        JSONResponse: A success message.
    """
    # Obtain the filename from the uploaded file
    filename: str = file.filename

    if file:
        try:
            # Empty the source_docs directory
            dir_path: str = "../client/docs/"
            for file_name in os.listdir(dir_path):
                os.remove(os.path.join(dir_path, file_name))
        except IsADirectoryError:
            print("Directory is empty")

        file_path: str = "../client/docs/doc.pdf"
        with open(file_path, 'wb') as f:
            shutil.copyfileobj(file.file, f)

        # Saving filename to JSON object and store in client_data directory
        filename_dict = {'filename': filename, 'file-path': filename.replace(" ", "_").replace("(","").replace(")","")}
        filename_path: str = "../client/filename/filename.json"
        with open(filename_path, 'w') as f:
            json.dump(filename_dict, f)

        init_chromadb(db_dir="../client/chromadb/", file_path=file_path)

    return {"message": "200 - File uploaded successfully"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
