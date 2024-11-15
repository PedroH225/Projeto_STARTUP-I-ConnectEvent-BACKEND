import { Router } from 'express';
import { EnderecoControlador } from './controladores/EnderecoControlador';
import { UsuarioControlador } from './controladores/UsuarioControlador';
import { EventoControlador } from './controladores/EventoControlador';
import { TipoControlador } from './controladores/TipoControlador';
import { verificarToken, verificarTokenBoolean } from './utils/VerificarToken';
import uploadLocal from './utils/uploadLocal';
import { FotoControlador } from './controladores/FotoControlador';
import { AmizadeControlodor } from './controladores/AmizadeControlador';
import { GraficoControlador } from './controladores/GraficoControlador';
import { FeedbackControlador } from './controladores/FeedbackControlador';

const routes = Router();

const enderecoControlador = new EnderecoControlador();
const usuarioControlador = new UsuarioControlador();
const eventoControlador = new EventoControlador();
const tipoControlador = new TipoControlador();
const fotoControlador = new FotoControlador();
const amizadeControlador = new AmizadeControlodor();
const graficoControlador = new GraficoControlador();
const feedbackControlador = new FeedbackControlador();


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
routes.get("/usuario/eventosAmigo/:id", verificarToken, usuarioControlador.visualizarEventosParticipandoAmigo.bind(usuarioControlador));
routes.get("/usuario/eventoOcorridos", verificarToken, usuarioControlador.visualizarEventosParticipandoOcorridos.bind(usuarioControlador));
routes.get("/usuario", verificarToken, usuarioControlador.visualizar.bind(usuarioControlador));
routes.get("/usuarios", usuarioControlador.visualizarTodos.bind(usuarioControlador));
routes.put("/usuario/alterarSenha", verificarToken, usuarioControlador.alterarSenha.bind(usuarioControlador));
routes.put("/usuario", verificarToken, usuarioControlador.editar.bind(usuarioControlador));
routes.delete("/usuario/:id", usuarioControlador.apagar.bind(usuarioControlador));

routes.get("/organizador/ocorridos", verificarToken, usuarioControlador.visualizarEventosOcorridos.bind(usuarioControlador));
routes.get("/organizador/evento", verificarToken, usuarioControlador.visualizarEventosUsuario.bind(usuarioControlador));

routes.get("/organizador/eventoAnunciado", verificarToken, usuarioControlador.visualizarEventosUsuarioAnunciado.bind(usuarioControlador));
routes.get("/organizador/eventoNaoAnunciado", verificarToken, usuarioControlador.visualizarEventosUsuarioNaoAnunciado.bind(usuarioControlador));

routes.put("/usuario/participar/:eventoId", verificarToken, usuarioControlador.participar.bind(usuarioControlador));
routes.put("/usuario/removerParticipar/:eventoId", verificarToken, usuarioControlador.removerParticipacao.bind(usuarioControlador));


// Evento
routes.get("/evento/filtrar", verificarTokenBoolean, eventoControlador.filtrar.bind(eventoControlador));
routes.get("/evento/anunciados", verificarTokenBoolean, eventoControlador.visualizarAnunciados.bind(eventoControlador));
routes.get("/evento/:eventoId/verificar-participacao", verificarToken, eventoControlador.verificarParticipacao.bind(eventoControlador));
routes.get("/evento/:id", verificarTokenBoolean, eventoControlador.visualizar.bind(eventoControlador));
routes.get("/evento", eventoControlador.visualizarTodos.bind(eventoControlador));

routes.post("/evento", uploadLocal.array('fotos'), verificarToken, eventoControlador.criar.bind(eventoControlador));

routes.put("/evento/:id/anunciar", verificarToken, eventoControlador.anunciar.bind(eventoControlador));
routes.put("/evento/:id", uploadLocal.array('fotos'), verificarToken, eventoControlador.editar.bind(eventoControlador));

routes.delete("/evento/:id", verificarToken, eventoControlador.apagar.bind(eventoControlador));


// Tipos
routes.get("/tipo", tipoControlador.visualizarTodos.bind(tipoControlador));

// Validação
routes.get("/validar", usuarioControlador.validar.bind(usuarioControlador)); // Supondo que tenha uma validação para Usuário
routes.get("/testartoken", verificarToken, usuarioControlador.testarToken.bind(usuarioControlador)); // Supondo que tenha uma função para testar token no controlador de Usuário

routes.post('/foto/:id/upload-fotos', uploadLocal.array('fotos', 10),fotoControlador.uploadFotos.bind(fotoControlador)); // Limite de 10 fotos
routes.get('/foto/:id/fotos', fotoControlador.getFotosPorEvento.bind(fotoControlador));
routes.get('/foto/evento/:id', fotoControlador.visualizarFotosEvento.bind(fotoControlador))

routes.delete('/foto/:id', fotoControlador.apagar.bind(fotoControlador))


// Amizade
routes.get('/amigo/pendentes', verificarToken, amizadeControlador.listarPendentes.bind(amizadeControlador))
routes.get('/amigo/aceitos', verificarToken, amizadeControlador.listarAceitos.bind(amizadeControlador))
routes.get('/pedidos-recebidos', verificarToken, amizadeControlador.listarRecebidos.bind(amizadeControlador));

routes.post('/pedidos-amizade/enviar', verificarToken, amizadeControlador.enviar.bind(amizadeControlador));
routes.post('/pedidos-amizade/aceitar/:remetenteId', verificarToken, amizadeControlador.aceitar.bind(amizadeControlador));

routes.delete('/pedidos-amizade/excluir/:remetenteId', verificarToken, amizadeControlador.excluir.bind(amizadeControlador));

// Grafico
routes.get('/grafico/pizza-genero/:id', verificarToken, graficoControlador.graficoPizzaGenero.bind(graficoControlador));
routes.get('/grafico/histograma-idade/:id', verificarToken, graficoControlador.graficoHistogramaIdade.bind(graficoControlador));
routes.get('/grafico/linha-participados/:id', verificarToken, graficoControlador.graficoLinha.bind(graficoControlador));

// Feedback
routes.get("/feedback/evento/:eventoId", verificarToken, feedbackControlador.visualizarFeedbacksEvento.bind(feedbackControlador))
routes.get("/feedback/usuario", verificarToken, feedbackControlador.visualizarFeedbacksUsuario.bind(feedbackControlador))
routes.get("/feedback/:feedbackId", verificarToken, feedbackControlador.visualizarPorId.bind(feedbackControlador))
routes.get("/semFeedback", verificarToken, feedbackControlador.eventosSemFeedback.bind(feedbackControlador))
routes.get("/feedbacks", feedbackControlador.visualizarTodos.bind(feedbackControlador))
routes.post("/feedback/:eventoId", verificarToken, feedbackControlador.adicionarFeedback.bind(feedbackControlador))
routes.put("/feedback/:feedbackId", verificarToken, feedbackControlador.editarFeedback.bind(feedbackControlador))
routes.delete("/feedback/:feedbackId", verificarToken, feedbackControlador.excluir.bind(feedbackControlador))
export { routes };
