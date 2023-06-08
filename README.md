<p align="center">
<h1 align="center">Apollo V2 🚀</h1>
</p>

## ⚙ Setup
To get up and running, I install Poetry dependency manager:

```bash
curl -sSL https://install.python-poetry.org | python3 -
```

### Clone Repository

```bash
git clone https://github.com/lightshifted/rebel-backpack
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
To install dependencies, I execute this command from the `rebel-backpack/contractqa` directory:

```bash
poetry install
```

### Start Stream
To initialize streaming, I execute this command from the `rebel-backpack/contractqa/contractqa` directory:

```bash
poetry run uvicorn stream:app --reload --port 9000
```

### Start API
To initialize the API, I execute this command from the `rebel-backpack/contractqa/contractqa/api` directory:

```bash
poetry run uvicorn app:app --reload --port 8000
```

### Start Frontend
To start the client-side interface, I execute this command from the `rebel-backpack/contractqa/frontend` directory:

```bash
npm start
```