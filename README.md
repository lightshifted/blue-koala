<p align="center">
<h1 align="center">Apollo 🚀 Research Build</h1>
</p>

## ⚙ Setup
To get up and running, I install the dependency manager [Poetry](https://python-poetry.org/docs/):

```bash
curl -sSL https://install.python-poetry.org | python3 -
```

### Clone Repository

```bash
git clone https://github.com/lightshifted/blue-koala
```

### Install Poetry
To install Poetry, I execute this command:

```bash
curl -sSL https://install.python-poetry.org | python3 -
```

I then check my installation with:

```bash
poetry --version
```

### Install Dependencies
To install dependencies, I execute this command from the `blue-koala/backend` directory:

```bash
poetry install
```

### Start Stream
To initialize streaming, I execute this command from the `blue-koala/backend` directory:

```bash
poetry run uvicorn stream:app --reload --port 9000
```

### Start API
To initialize the API, I execute this command from the `blue-koala/backend/api` directory:

```bash
poetry run uvicorn app:app --reload --port 8000
```

### Start Frontend
To start the client-side interface, I execute this command from the `blue-koala/frontend` directory:

```bash
npm start
```