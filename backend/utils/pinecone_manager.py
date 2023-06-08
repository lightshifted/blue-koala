from langchain.embeddings import OpenAIEmbeddings
from pinecone_text.sparse import BM25Encoder
from langchain.document_loaders import PyMuPDFLoader
from langchain.retrievers import PineconeHybridSearchRetriever
from utils.utils import get_documents

import os
import pinecone
from dotenv import load_dotenv

load_dotenv()


def init_pinecone() -> None:
    pinecone.init()
    pinecone.whoami()
    return


def create_index(index_name: str)-> None:
    pinecone.create_index(
    name = index_name,
    dimension = 1536,  # dimensionality of dense model
    metric = "dotproduct",  # sparse values supported only for dotproduct
    pod_type = "s1",
    metadata_config={"indexed": []}
    )
    return pinecone.Index(index_name)

def get_similarity():
    # init_pinecone() # Initialize Pinecone
    # index_name = "hybrid-search-index"
    # index = create_index(index_name)

    embeddings = OpenAIEmbeddings()
    bm25_encoder = BM25Encoder().default()

    corpus = get_documents()

    # fit tf-idf values on your corpus
    bm25_encoder.fit(corpus)

    # store the values to a json file
    bm25_encoder.dump("client/bm25_values.json")

    # load to your BM25Encoder object
    bm25_encoder = BM25Encoder().load("bm25_values.json")

    retriever = PineconeHybridSearchRetriever(embeddings=embeddings, sparse_encoder=bm25_encoder, index=index)

    return retriever


if __name__ == "__main__":
    get_similarity()
