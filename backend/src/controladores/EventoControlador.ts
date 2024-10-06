import { Empresario } from "../entidades/Empresario";
import { EmpresarioServico } from "../servicos/EmpresarioServico";
import { EventoServico } from "../servicos/EventoServico";
import { Request, Response } from "express";

type EventoRequest = {
    titulo: string, descricao: string, data: Date, horario: string, tipo: string, telefone: string, livre: boolean,
    link: string, fotos: string[], local: string, estado: string, cidade: string, bairro: string, numero: number, empresarioId: number
}

export class EventoControlador {
    private service: EventoServico;
    private empresarioServico: EmpresarioServico;

    constructor() {
        this.service = new EventoServico();
        this.empresarioServico = new EmpresarioServico();
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

    async criar(req: Request, res: Response): Promise<any> {
        const { titulo, descricao, data, horario, tipo, telefone, livre, link, fotos, local, estado, cidade, bairro, numero, empresarioId }: EventoRequest = req.body;

        const empresario = await this.empresarioServico.visualizar(empresarioId);

        if (!empresario) {
            return res.status(404).json({ message: "Empresário não encontrado." });
        }

        const result = await this.service.criar({ titulo, descricao, data, horario, tipo, telefone, livre, link, fotos, local, estado, cidade, bairro, numero, empresario });

        res.status(201).json(result);
    }
}