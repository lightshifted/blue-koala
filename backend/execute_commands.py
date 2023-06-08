import subprocess
import os
import concurrent.futures


def start_stream():
    subprocess.run(['poetry', 'run', 'uvicorn', 'stream:app', '--reload', '--port', '9000'], check=True)

def start_api() -> None:
    """
    Start the API server using uvicorn.
    """
    api_dir = os.path.join('api')
    subprocess.run(['poetry', 'run', 'uvicorn', 'app:app', '--reload', '--port', '8000'], cwd=api_dir, check=True)

def start_stream() -> None:
    """
    Start the stream server using uvicorn.
    """
    subprocess.run(['poetry', 'run', 'uvicorn', 'stream:app', '--reload', '--port', '9000'], check=True)

def main():

    # Create a ThreadPoolExecutor
    with concurrent.futures.ThreadPoolExecutor() as executor:
        # Submit each task to the executor
        stream_future = executor.submit(start_stream)
        api_future = executor.submit(start_api)

        # Wait for all tasks to complete
        concurrent.futures.wait([stream_future, api_future])

if __name__ == '__main__':
    main()
