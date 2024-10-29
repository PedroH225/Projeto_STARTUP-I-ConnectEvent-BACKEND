import "reflect-metadata";
import express from "express";
import "./bd";
import { routes } from "./rotas";
import cors from "cors";
import path from 'path';

const app = express();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Configurar CORS aqui
app.use(cors()); // Permite requisições de outras origens (como seu frontend Angular)

app.use(express.json());

app.use(routes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000!");
});
