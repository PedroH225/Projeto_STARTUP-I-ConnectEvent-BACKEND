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
routes.get("/empresario", empresarioControlador.visualizarTodos.bind(empresarioControlador));
routes.get("/empresario/:id", empresarioControlador.visualizar.bind(empresarioControlador));
routes.post("/empresario", empresarioControlador.criar.bind(empresarioControlador));
routes.put("/empresario/:id", empresarioControlador.editar.bind(empresarioControlador));
routes.delete("/empresario/:id", empresarioControlador.apagar.bind(empresarioControlador));

export { routes };
