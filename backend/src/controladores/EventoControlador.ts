import { EventoServico } from "../servicos/EventoServico";
import { Request, Response } from "express";

export class EventoControlador {
    private service;

    constructor() {
        this.service = new EventoServico();
    }

    async visualizarTodos(req: Request, res: Response) {
        const eventos = await this.service.visualizarTodos();

        res.json(eventos);
    }

    async visualizar(req: Request, res: Response) {
        const { id } = req.params;
        const idInt = parseInt(id);

        const evento = await this.service.visualizar(idInt);

        res.json(evento);
    }
}