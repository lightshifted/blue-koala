from fastapi.testclient import TestClient
from fastapi import FastAPI, UploadFile
from typing import Optional
import os
import json
from starlette.datastructures import UploadFile as StarletteUploadFile

# Assuming that your FastAPI app is named app
app = FastAPI()

# ... Your route here ...

client = TestClient(app)

def test_upload_file():
    # Prepare a file for testing
    filename = "test.txt"
    content = "test content"
    with open(filename, 'w') as f:
        f.write(content)

    # We have to create the Starlette's UploadFile manually
    # because the TestClient does not create it automatically
    with open(filename, 'rb') as f:
        test_file = StarletteUploadFile(filename, file=f)

    response = client.post("/api/ingest", files={"file": test_file})

    assert response.status_code == 200
    assert response.json() == {"message": "200 - File uploaded successfully"}

    # Check if the file was saved correctly
    assert os.path.exists("../client/docs/" + filename)
    with open("../client/docs/" + filename, 'r') as f:
        assert f.read() == content

    # Check if the filename was saved correctly
    assert os.path.exists("../client/filename/filename.json")
    with open("../client/filename/filename.json", 'r') as f:
        filename_dict = json.load(f)
        assert filename_dict == {'filename': filename, 'file-path': filename.replace(" ", "_").replace("(","").replace(")","")}

    # Cleanup the test file
    os.remove(filename)
    os.remove("../client/docs/" + filename)
    os.remove("../client/filename/filename.json")
