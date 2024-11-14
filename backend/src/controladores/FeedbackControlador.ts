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

    async adicionarFeedback(req: Request, res: Response) {
        const  usuarioId  =  parseInt(req.params.usuarioId)
        const  eventoId  =  parseInt(req.params.eventoId)

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
        const usuarioId = parseInt(req.params.id)

        const semFeedback : number[] = await this.servico.eventosSemFeedback(usuarioId);

        res.status(200).json(semFeedback)
    }
}