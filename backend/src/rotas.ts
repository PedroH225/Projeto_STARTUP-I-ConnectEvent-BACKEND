import { Router } from 'express';
import { EnderecoControlador } from './controladores/EnderecoControlador';

const routes = Router();

const enderecoControlador = new EnderecoControlador();

// Endereço

routes.post("/endereco", enderecoControlador.criar.bind(enderecoControlador));
routes.get("/endereco", enderecoControlador.visualizarTodos.bind(enderecoControlador));
routes.delete("/endereco/:id", enderecoControlador.deletar.bind(enderecoControlador));
routes.put("/endereco/:id", enderecoControlador.editar.bind(enderecoControlador));

export { routes };
