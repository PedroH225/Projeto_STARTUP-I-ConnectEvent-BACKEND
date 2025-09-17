# ConnectEvent Backend

## Description
ConnectEvent is a digital platform designed to connect people (consumers) to events hosted by entrepreneurs

## Installation
To run the project backend, you need to have NodeJS, NPM installed and create the database using MySQL with the script available at:
[Database script link](https://github.com/VictorAlexandreMuller/Projeto_STARTUP-I-ConnectEvent-DOC-DB/tree/main/Banco%20de%20Dados)

1. **Clone the repository**:
   - Open GitBash terminal in the desired directory and type:
   ```bash
   git init
   git clone git@github.com:PedroH225/Projeto_STARTUP-I-ConnectEvent-BACKEND.git
   cd ./backend/
   ```

2. **Install dependencies**:
  - In the same terminal, run::
   ```bash
   npm install
   ```

3. **Configure environment variables**:
  - Inside `./backend/`, create a `.env` file.
  - Configure the environment variables according to your database. Example::

     ```env
    DB_HOST=YOUR_HOST
	DB_PORT=YOUR_PORT
	DB_USER=YOUR_USER
	DB_PASSWORD=YOUR_PASSWORD
	DB_NAME=connect-event-db

	JWT_SECRET=my_secret_key_123
     ```

4. **Run the project**:
  - In the `./backend/` directory terminal, run:
 
   ```bash
   npm run dev
   ```

### **Run the statistics backend**

- To run the statistics backend, Python must be installed. Follow the steps below::

1. **Open a terminal in the `back-estatisticas` folder:**:
   - Navigate to the back-estatisticas directory using the terminal.

2. **Create a virtual environment:**:
   - Run the command below to create a virtual environment:
     ```bash
     python -m venv env-back-estatisticas
     ```

3. **Activate the virtual environment:**:
   - On Windows:
     ```bash
     .\env-back-estatisticas\Scripts\activate
     ```
   - On macOS or Linux:
     ```bash
     source env-back-estatisticas/bin/activate
     ```

4. **Install dependencies:**:
   - Run the command below to install the required libraries:
     ```bash
     pip install -r requirements.txt
     ```

5. **Start the server:**:
   - Now, start the statistics server with::
     ```bash
     uvicorn app:app --reload
     ```

Once this is done, the statistics backend will be up and running. The API will be available for requests.

## **Run the frontend**:
  - Follow the frontend execution instructions:
    [Frontend link](https://github.com/PedroH225/ProjetoSTARTUP-I-ConnectEvent-FRONTEND.git)


## Usage
Send requests to the Backend using tools like Postman.
  - Available endpoints:
[Endpoints link]()
