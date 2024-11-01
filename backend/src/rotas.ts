import { Router } from 'express';
import { EnderecoControlador } from './controladores/EnderecoControlador';
import { UsuarioControlador } from './controladores/UsuarioControlador';
import { EventoControlador } from './controladores/EventoControlador';
import { TipoControlador } from './controladores/TipoControlador';
import { verificarToken } from './utils/VerificarToken';
import uploadLocal from './utils/uploadLocal';
import { FotoControlador } from './controladores/FotoControlador';

const routes = Router();

const enderecoControlador = new EnderecoControlador();
const usuarioControlador = new UsuarioControlador();
const eventoControlador = new EventoControlador();
const tipoControlador = new TipoControlador();
const fotoControlador = new FotoControlador();


// Endereço
routes.post("/endereco", enderecoControlador.criar.bind(enderecoControlador));
routes.get("/endereco", enderecoControlador.visualizarTodos.bind(enderecoControlador));
routes.delete("/endereco/:id", enderecoControlador.deletar.bind(enderecoControlador));
routes.put("/endereco/:id", enderecoControlador.editar.bind(enderecoControlador));
routes.get("/cidades", enderecoControlador.visualizarCidades.bind(enderecoControlador));

// Usuário
routes.post("/usuario/login", usuarioControlador.realizarAcesso.bind(usuarioControlador));
routes.post("/usuario", usuarioControlador.criar.bind(usuarioControlador));
routes.get("/usuario/evento", verificarToken, usuarioControlador.visualizarEventosParticipando.bind(usuarioControlador));
routes.get("/usuario/:id", usuarioControlador.visualizar.bind(usuarioControlador));
routes.get("/usuario", usuarioControlador.visualizarTodos.bind(usuarioControlador));
routes.put("/usuario/:id", usuarioControlador.editar.bind(usuarioControlador));
routes.delete("/usuario/:id", usuarioControlador.apagar.bind(usuarioControlador));

routes.get("/organizador/ocorridos", verificarToken, usuarioControlador.visualizarEventosOcorridos.bind(usuarioControlador));
routes.get("/organizador/evento", verificarToken, usuarioControlador.visualizarEventosUsuario.bind(usuarioControlador));

routes.get("/organizador/eventoAnunciado", verificarToken, usuarioControlador.visualizarEventosUsuarioAnunciado.bind(usuarioControlador));
routes.get("/organizador/eventoNaoAnunciado", verificarToken, usuarioControlador.visualizarEventosUsuarioNaoAnunciado.bind(usuarioControlador));

routes.put("/usuario/participar/:eventoId", verificarToken, usuarioControlador.participar.bind(usuarioControlador));
routes.put("/usuario/removerParticipar/:eventoId", verificarToken, usuarioControlador.removerParticipacao.bind(usuarioControlador));


// Evento
routes.get("/evento/filtrar", eventoControlador.filtrar.bind(eventoControlador));
routes.get("/evento/anunciados", eventoControlador.visualizarAnunciados.bind(eventoControlador));
routes.get("/evento/:eventoId/verificar-participacao", verificarToken, eventoControlador.verificarParticipacao.bind(eventoControlador));
routes.get("/evento/:id", eventoControlador.visualizar.bind(eventoControlador));
routes.get("/evento", eventoControlador.visualizarTodos.bind(eventoControlador));

routes.post("/evento", verificarToken, eventoControlador.criar.bind(eventoControlador));

routes.put("/evento/:id/anunciar", verificarToken, eventoControlador.anunciar.bind(eventoControlador));
routes.put("/evento/:id", verificarToken, eventoControlador.editar.bind(eventoControlador));

routes.delete("/evento/:id", verificarToken, eventoControlador.apagar.bind(eventoControlador));


// Tipos
routes.get("/tipo", tipoControlador.visualizarTodos.bind(tipoControlador));

// Validação
routes.get("/validar", usuarioControlador.validar.bind(usuarioControlador)); // Supondo que tenha uma validação para Usuário
routes.get("/testartoken", verificarToken, usuarioControlador.testarToken.bind(usuarioControlador)); // Supondo que tenha uma função para testar token no controlador de Usuário

routes.post('/foto/:id/upload-fotos', uploadLocal.array('fotos', 10),fotoControlador.uploadFotos.bind(fotoControlador)); // Limite de 10 fotos
routes.get('/foto/:id/fotos', fotoControlador.getFotosPorEvento.bind(fotoControlador));


export { routes };
