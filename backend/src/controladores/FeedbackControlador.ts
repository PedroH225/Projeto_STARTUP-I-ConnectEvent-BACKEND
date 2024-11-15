import { Request, Response } from "express";
import { FeedbackServico } from "../servicos/FeedbackServico";

export class FeedbackControlador {

    private servico;

    constructor() {
        this.servico = new FeedbackServico()
    }

    async visualizarTodos(req: Request, res: Response) {
        const feedbacks = await this.servico.visualizarTodos()

        res.status(200).json(feedbacks)
    }

    async visualizarPorId(req: Request, res: Response) {
        const feedbackId = parseInt(req.params.feedbackId)

        try {
        const feedback = await this.servico.visualizarPorId(feedbackId);

        res.status(200).json(feedback)
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async adicionarFeedback(req: Request, res: Response) {
        const usuarioId = parseInt(req.user.id)
        const eventoId = parseInt(req.params.eventoId)

        const { comentario, nota } = req.body
        const notaInt = parseInt(nota);

        try {
            const result = await this.servico.adicionarFeedback({ usuarioId, eventoId, comentario, nota: notaInt })

            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error)
        }

    }

    async eventosSemFeedback(req: Request, res: Response) {
        const usuarioId = parseInt(req.user.id)

        const semFeedback: number[] = await this.servico.eventosSemFeedback(usuarioId);

        res.status(200).json(semFeedback)
    }

    async visualizarFeedbacksEvento(req: Request, res: Response) {
        const eventoId = parseInt(req.params.eventoId)

        try {
            const feedbacks = await this.servico.visualizarFeedbacksEvento(eventoId)

            res.status(200).json(feedbacks)

        } catch (error) {
            res.status(400).json(error)
        }
    }

    async visualizarFeedbacksUsuario(req: Request, res: Response) {
        const usuarioId = parseInt(req.user.id)

        try {
            const feedbacks = await this.servico.visualizarFeedbacksUsuario(usuarioId)

            res.status(200).json(feedbacks)

        } catch (error) {
            res.status(400).json(error)
        }
    }

    async editarFeedback(req: Request, res: Response) {
        const feedbackId = parseInt(req.params.feedbackId)

        const { comentario, nota } = req.body

        try {
            const feedbacks = await this.servico.editarFeedback({ feedbackId, comentario, nota })

            res.status(200).json(feedbacks)

        } catch (error) {
            res.status(400).json(error)
        }
    }

    async excluir(req: Request, res: Response) {
        const feedbackId = parseInt(req.params.feedbackId);

        try {
            const response = await this.servico.excluir(feedbackId);

            res.status(200).json(response)
            
        } catch (error) {
            res.status(400).json(error)
        }
    }
}