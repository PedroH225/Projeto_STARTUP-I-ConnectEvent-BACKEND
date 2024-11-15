import { In } from "typeorm";
import { AppDataSource } from "../bd";
import { Evento } from "../entidades/Evento";
import { Feedback } from "../entidades/Feedback";
import { Usuario } from "../entidades/Usuario";
import { UsuarioServico } from "./UsuarioServico";
import { format } from 'date-fns';

type AdicionarFeedbackRequest = {
    usuarioId: number,
    eventoId: number,
    comentario: string,
    nota: number
}

type EditarFeedbackRequest = {
    feedbackId: number,
    comentario: string,
    nota: number
}

export class FeedbackServico {
    private repositorio;
    private usuarioRepositorio;
    private usuarioServico;
    private eventoRepositorio;

    constructor() {
        this.repositorio = AppDataSource.getRepository(Feedback)
        this.usuarioRepositorio = AppDataSource.getRepository(Usuario)
        this.eventoRepositorio = AppDataSource.getRepository(Evento)
        this.usuarioServico = new UsuarioServico();
    }

    async visualizarTodos() {
        const feedbacks = await this.repositorio.find();

        return feedbacks.map(feedback => feedback.toJson());
    }

    async visualizarPorId(feedbackId: number) {
        try {
        const feedback = await this.repositorio.findOne({ where: { id: feedbackId } })

        return feedback?.toJson();
        } catch (error) {
            return error;
        }
    }

    async adicionarFeedback({ usuarioId, eventoId, comentario, nota }: AdicionarFeedbackRequest) {
        const usuario = await this.usuarioRepositorio.findOne({ where: { id: usuarioId } })

        if (!usuario) {
            throw new Error("Usuário não encontrado")
        }

        const evento = await this.eventoRepositorio.findOne({ where: { id: eventoId } })

        if (!evento) {
            throw new Error("Evento não encontrado")
        }

        const feedback = new Feedback(usuario, evento, comentario, nota);
        try {
            await this.repositorio.save(feedback)

            return "Feedback publicado com sucesso!"

        } catch (error) {
            throw error;
        }

    }

    async eventosSemFeedback(usuarioId: number) {
        const ocorridos = await this.usuarioServico.visualizarEventosParticipandoOcorridosSemFormat(usuarioId);
        const ids: number[] = [];

        ocorridos.forEach(evento => {
            ids.push(evento.id);
        });

        const feedbacks = await this.repositorio.find({ where: { usuario: { id: usuarioId }, evento: { id: In(ids) } } })


        const feedbackedEventIds = feedbacks.map(feedback => feedback.evento.id);

        const eventosSemFeedback = ocorridos.filter(evento => !feedbackedEventIds.includes(evento.id));

        return eventosSemFeedback.map(evento => evento.id);
    }

    async visualizarFeedbacksEvento(eventoId: number) {

        try {
            const feedbacks = await this.repositorio.find({ where: { evento: { id: eventoId } } })

            feedbacks.forEach((feedback: any) => {
                feedback.data = format(new Date(feedback.data), 'dd/MM/yyyy, HH:mm');
            });

            return feedbacks;
        } catch (error) {
            throw error;
        }
    }

    async visualizarFeedbacksUsuario(usuarioId: number) {

        try {
            const feedbacks = await this.repositorio.find({ where: { usuario: { id: usuarioId } } })

            feedbacks.forEach((feedback: any) => {
                feedback.data = format(new Date(feedback.data), 'dd/MM/yyyy, HH:mm');
            });

            return feedbacks;
        } catch (error) {
            throw error;
        }
    }

    async editarFeedback({ feedbackId, comentario, nota }: EditarFeedbackRequest) {
        const feedback = await this.repositorio.findOne({ where: { id: feedbackId } });

        if (!feedback) {
            throw new Error("Feedback não encontrado.")
        }

        feedback.comentario = comentario;
        feedback.nota = nota;

        try {
            await this.repositorio.save(feedback);

            return "Feedback editado com sucesso."
        } catch (error) {
            throw "Erro ao editar o feedback."
        }

    }

    async excluir(feedbackId : number) {
        try {
            await this.repositorio.delete(feedbackId);

            return "Feedback Excluído com sucesso."
        } catch (error) {
            throw error;
        }
    }
}