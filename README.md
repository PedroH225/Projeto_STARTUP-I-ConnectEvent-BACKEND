# ConnectEvent Backend

> Read in other languages: [English](README.en.md)

## Descrição
A ConnectEvent é uma plataforma digital que possui a finalidade de conectar as pessoas (consumidores) aos eventos de empresários e organizadores.

## Instalação
Para executar o backend do projeto, é necessário a instalação de: NodeJS, NPM e criar o banco de dados utilizando o MySQL com o script disponível em:
[Link para o script do banco de dados](https://github.com/VictorAlexandreMuller/Projeto_STARTUP-I-ConnectEvent-DOC-DB/tree/main/Banco%20de%20Dados)

1. **Clone o repositório**:
  - Abra o terminal do GitBash no diretório desejado e digite os comandos:
   ```bash
   git init
   git clone git@github.com:VictorAlexandreMuller/Projeto_STARTUP-I-ConnectEvent-BACKEND.git
   cd ./backend/
  ```

2. **Instale as dependências**:
  - No mesmo terminal, execute:
   ```bash
   npm install
   ```
   
3. **Configure as variáveis de ambiente**:
  - No diretório `./backend/`, crie o arquivo `.env`.
  - Configure as variáveis de ambiente de acordo com o seu banco de dados. Um exemplo de configuração é:

     ```env
     DB_HOST=SEU_HOST
     DB_PORT=SEU_PORT
     DB_USER=SEU_USER
     DB_PASSWORD=SUA_SENHA
     DB_NAME=connect-event-db
     
     JWT_SECRET=minha_chave_secreta_123
     ```

4. **Execute o projeto**:
  - No terminal do diretório `./backend/`, execute o comando:
  
   ```bash
   npm run dev
   ```
   
   
### **Execute o backend estatísticas**

- Para rodar o backend de estatísticas é necessário possuir o python instalado e seguir os passos abaixo:


1. **Abra um terminal na pasta `back-estatisticas`**:
   - Navegue até o diretório `back-estatisticas` usando o terminal.
   
  
2. **Crie um ambiente virtual**:
   - Execute o seguinte comando para criar um ambiente virtual:
     ```bash
     python -m venv env-back-estatisticas
     ```


3. **Ative o ambiente virtual**:
   - No Windows, execute:
     ```bash
     .\env-back-estatisticas\Scripts\activate
     ```
   - No macOS ou Linux, execute:
     ```bash
     source env-back-estatisticas/bin/activate
     ```


4. **Instale as dependências**:
   - Execute o comando abaixo para instalar as bibliotecas necessárias:
     ```bash
     pip install -r requirements.txt
     ```


5. **Execute o servidor**:
   - Agora, inicie o servidor de estatísticas com o seguinte comando:
     ```bash
     uvicorn app:app --reload
     ```


Com isso, o backend de estatísticas estará em funcionamento. A API estará disponível para requisições.
   
## **Execute o frontend**:
  - Siga as instruções de execução do frontend:
    [Link para o frontend](https://github.com/VictorAlexandreMuller/Projeto_STARTUP-I-ConnectEvent-FRONTEND)


## Uso
Faça requisições para o Backend em ferramentas como Postman.
  - Endpoints disponíveis:
[Link para os endpoints]()

  
  
