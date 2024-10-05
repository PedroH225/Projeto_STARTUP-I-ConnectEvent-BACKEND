import { Router } from 'express';
import { EnderecoControlador } from './controladores/EnderecoControlador';
import { EmpresarioControlador } from './controladores/EmpresarioControlador';
import { UsuarioControlador } from './controladores/UsuarioControlador';


const routes = Router();

const enderecoControlador = new EnderecoControlador();
const empresarioControlador = new EmpresarioControlador();
const usuarioControlador = new UsuarioControlador()


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

// Usuário
routes.get("/usuario", usuarioControlador.visualizarTodos.bind(usuarioControlador));
routes.get("/usuario/:id", usuarioControlador.visualizar.bind(usuarioControlador));
routes.post("/usuario", usuarioControlador.criar.bind(usuarioControlador));
routes.put("/usuario/:id", usuarioControlador.editar.bind(usuarioControlador))

export { routes };
