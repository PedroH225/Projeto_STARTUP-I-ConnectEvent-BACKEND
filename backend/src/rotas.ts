import { Router } from 'express';
import { EnderecoControlador } from './controladores/EnderecoControlador';
import { UsuarioControlador } from './controladores/UsuarioControlador';
import { EventoControlador } from './controladores/EventoControlador';
import { TipoControlador } from './controladores/TipoControlador';
import { verificarToken } from './utils/VerificarToken';

const routes = Router();

const enderecoControlador = new EnderecoControlador();
const usuarioControlador = new UsuarioControlador();
const eventoControlador = new EventoControlador();
const tipoControlador = new TipoControlador();

// Endereço
routes.post("/endereco", enderecoControlador.criar.bind(enderecoControlador));
routes.get("/endereco", enderecoControlador.visualizarTodos.bind(enderecoControlador));
routes.delete("/endereco/:id", enderecoControlador.deletar.bind(enderecoControlador));
routes.put("/endereco/:id", enderecoControlador.editar.bind(enderecoControlador));
routes.get("/cidades", enderecoControlador.visualizarCidades.bind(enderecoControlador));

// Usuário
routes.get("/usuario/evento/:id", usuarioControlador.visualizarEventosParticipando.bind(usuarioControlador));
routes.get("/usuario/:id", usuarioControlador.visualizar.bind(usuarioControlador));
routes.get("/usuario", usuarioControlador.visualizarTodos.bind(usuarioControlador));
routes.get("/organizador/ocorridos/:id", usuarioControlador.visualizarEventosOcorridos.bind(usuarioControlador))
routes.post("/usuario/login", usuarioControlador.realizarAcesso.bind(usuarioControlador));
routes.post("/usuario", usuarioControlador.criar.bind(usuarioControlador));
routes.put("/usuario/:usuarioId/participar/:eventoId", usuarioControlador.participar.bind(usuarioControlador));
routes.put("/usuario/:id", usuarioControlador.editar.bind(usuarioControlador));
routes.delete("/usuario/:id", usuarioControlador.apagar.bind(usuarioControlador));

// Evento
routes.get("/evento/filtrar", eventoControlador.filtrar.bind(eventoControlador));
routes.get("/evento/anunciados", eventoControlador.visualizarAnunciados.bind(eventoControlador));
routes.get("/evento/organizador/:id", eventoControlador.visualizarEventosUsuario.bind(eventoControlador)); // Atualizar a rota para buscar eventos de um usuário
routes.get("/evento/:id", eventoControlador.visualizar.bind(eventoControlador));
routes.get("/evento", eventoControlador.visualizarTodos.bind(eventoControlador));
routes.post("/evento", eventoControlador.criar.bind(eventoControlador));
routes.put("/evento/:id/anunciar", eventoControlador.anunciar.bind(eventoControlador));
routes.put("/evento/:id", eventoControlador.editar.bind(eventoControlador));
routes.delete("/evento/:id", eventoControlador.apagar.bind(eventoControlador));

// Tipos
routes.get("/tipo", tipoControlador.visualizarTodos.bind(tipoControlador));

// Validação
routes.get("/validar", usuarioControlador.validar.bind(usuarioControlador)); // Supondo que tenha uma validação para Usuário
routes.get("/testartoken", verificarToken, usuarioControlador.testarToken.bind(usuarioControlador)); // Supondo que tenha uma função para testar token no controlador de Usuário

export { routes };
