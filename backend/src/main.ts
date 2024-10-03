import  "reflect-metadata";
import express from 'express';
import "./bd";

const app = express();

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000!");
    
})