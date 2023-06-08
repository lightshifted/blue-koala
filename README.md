# Apollo 🚀 Research Build

Apollo is a cutting-edge research build. This document provides comprehensive steps on how to set up and get started with this project.

## ⚙ Setup

The setup process involves the following steps: 

1. Install Dependency Manager (Poetry)
2. Clone Repository
3. Install Dependencies
4. Launch APIs
5. Launch Frontend

### 1. Install Dependency Manager (Poetry)

This project uses [Poetry](https://python-poetry.org/docs/) for managing dependencies. Here are the steps to install it:

```bash
# Install Poetry
curl -sSL https://install.python-poetry.org | python3 -

# Verify the installation
poetry --version
```
On successful installation, the second command should return `Poetry (version 1.4.2)` or higher.

### 2. Clone Repository
Next, clone the repository to your local system using the following command:

```bash
git clone https://github.com/lightshifted/blue-koala
```


### 3. Install Dependencies
Navigate to the `blue-koala/backend` directory and run the following command to install the required dependencies:

```bash
poetry install
```



### 4. Launch APIs
Once the dependencies are installed, execute the following command from the root directory `blue-koala/backend` to launch the API servers:

```bash
poetry run python execute_commands.py
```

### 5. Launch Frontend
To start the frontend interface, navigate to the `blue-koala/frontend` directory and run the following command:

```bash
npm start
```

That's it! Your Apollo Research Build is now up and running. Enjoy coding!