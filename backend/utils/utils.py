from langchain.prompts import PromptTemplate
from langchain.memory.motorhead_memory import MotorheadMemory
from langchain.document_loaders import PyMuPDFLoader
from langchain.chat_models import ChatOpenAI
from langchain.chains import QAGenerationChain
from langchain.text_splitter import CharacterTextSplitter
from langchain import OpenAI
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores.chroma import Chroma
from langchain.chains.summarize import load_summarize_chain


from dotenv import load_dotenv
import random
import json
import os

# load the variables in the .env file
load_dotenv()


def create_prompt_template(template: str) -> PromptTemplate:
    return PromptTemplate(
        input_variables=["chat_history", "human_input", "context"],
        template=template
    )

def initialize_memory(
        session_id: str="test_session",
        url: str="http://localhost:8080",
        memory_key: str="chat_history",
        input_key: str="human_input",
    ) -> MotorheadMemory:

    return MotorheadMemory(
        session_id=session_id,
        url=url,
        memory_key=memory_key,
        input_key=input_key,
    )

def generate_numbers(n_samples: int=3):
    return random.sample(range(1, 20), n_samples)

def generate_documents():
    filename_path = "./client_data/filenames/filename.json"
    with open(filename_path, 'r') as f:
        filename_dict = json.load(f)
        file_path = "./client_data/source_docs/" + filename_dict['file-path']

    # Handle IndexError if list index is out of range
    try:
        return [PyMuPDFLoader(file_path).load()[i] for i in generate_numbers()]
    except IndexError:
        print("No documents generated")

def generate_questions():
    docs = generate_documents()
    chain = QAGenerationChain.from_llm(ChatOpenAI(temperature=0))
    questions = [chain.run(docs[i].page_content)[0]['question'] for i in range(3)]
    if not questions:
        print("No questions generated")
    return questions

def get_documents(doc_dir: str="../client/docs/doc.pdf"):
    loader = PyMuPDFLoader(doc_dir)
    docs = loader.load()
    text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
    return text_splitter.split_documents(docs)