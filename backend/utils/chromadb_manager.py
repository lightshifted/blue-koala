import os
from typing import List
from dotenv import load_dotenv
from langchain.document_loaders import PyMuPDFLoader, PyPDFLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma
import chromadb


# load environment variables
load_dotenv()


def get_documents(doc_dir: str) -> List[str]:
    """
    Get documents from a directory.

    Parameters:
        - doc_dir (str): The directory path containing the documents.

    Returns:
        list[str]: List of document texts.
    """
    loader = PyMuPDFLoader(doc_dir)
    docs = loader.load()
    text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
    return text_splitter.split_documents(docs)


def create_chromadb_settings(db_dir: str) -> chromadb.config.Settings:
    """
    Create ChromaDB settings.

    Parameters:
        - db_dir (str): The directory path for the ChromaDB.

    Returns:
        chromadb.config.Settings: ChromaDB settings.
    """
    return chromadb.config.Settings(
        chroma_db_impl="duckdb+parquet",
        persist_directory=db_dir,
        anonymized_telemetry=False
    )


def init_chromadb(db_dir: str, file_path: str) -> None:
    """
    Initialize ChromaDB with documents.

    Parameters:
        - db_dir (str): The directory path for the ChromaDB.
        - file_path (str): The path of the file to be added to ChromaDB.

    Returns:
        None
    """
    settings = create_chromadb_settings(db_dir)
    embeddings = OpenAIEmbeddings()

    vectorstore = Chroma(
        collection_name="langchain_store",
        embedding_function=embeddings,
        client_settings=settings,
        persist_directory=db_dir,
    )

    vectorstore.add_documents(documents=get_documents(file_path), embedding=embeddings)
    vectorstore.persist()


def get_vectorstore(db_dir: str) -> Chroma:
    """
    Get the ChromaDB vectorstore.

    Parameters:
        - db_dir (str): The directory path for the ChromaDB.

    Returns:
        Chroma: The ChromaDB vectorstore.
    """
    settings = create_chromadb_settings(db_dir)
    embeddings = OpenAIEmbeddings()

    vectorstore = Chroma(
        collection_name="langchain_store",
        embedding_function=embeddings,
        client_settings=settings,
        persist_directory=db_dir,
    )

    return vectorstore


def query_chromadb(vectorstore: Chroma, query: str, k: int = 3) -> List[str]:
    """
    Query ChromaDB for similar documents.

    Parameters:
        - vectorstore (Chroma): The ChromaDB vectorstore.
        - query (str): The query string.
        - k (int): The number of similar documents to retrieve. Default is 3.

    Returns:
        list[str]: List of similar document IDs.
    """
    docs = vectorstore.similarity_search_with_score(query=query, k=k)
    return [doc[0] for doc in docs]
