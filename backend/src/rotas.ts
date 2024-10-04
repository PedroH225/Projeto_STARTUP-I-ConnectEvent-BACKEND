import { Router } from 'express';
import { EnderecoControlador } from './controladores/EnderecoControlador';
import { EmpresarioControlador } from './controladores/EmpresarioControlador';

const routes = Router();

const enderecoControlador = new EnderecoControlador();
const empresarioControlador = new EmpresarioControlador();


// Endereço

routes.post("/endereco", enderecoControlador.criar.bind(enderecoControlador));
routes.get("/endereco", enderecoControlador.visualizarTodos.bind(enderecoControlador));
routes.delete("/endereco/:id", enderecoControlador.deletar.bind(enderecoControlador));
routes.put("/endereco/:id", enderecoControlador.editar.bind(enderecoControlador));

// Empresário
routes.get("/empresario", empresarioControlador.visualizarTodos.bind(empresarioControlador))

export { routes };
