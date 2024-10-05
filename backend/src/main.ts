import "reflect-metadata";
import express from 'express';
import "./bd";
import { routes } from "./rotas";

const app = express();

app.use(express.json())

app.use(routes);

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000!");

})