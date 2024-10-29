import { EventoServico } from "../servicos/EventoServico";
import { Request, Response } from "express";
import { UsuarioServico } from "../servicos/UsuarioServico";

type EventoRequest = {
    titulo: string, descricao: string, data: Date, horario: string, tipo: string, telefone: string, livre: boolean,
    link: string, fotos: string[], local: string, estado: string, cidade: string, bairro: string, numero: number, usuarioId: number // Alterado para usuarioId
}

type EditarEventoRequest = {
    titulo: string, descricao: string, data: Date, horario: string, tipo: string, telefone: string, livre: boolean,
    link: string, fotos: any[], local: string, estado: string, cidade: string, bairro: string, numero: number
}

export class EventoControlador {
    private service: EventoServico;
    private usuarioServico: UsuarioServico

    constructor() {
        this.service = new EventoServico();
        this.usuarioServico = new UsuarioServico();
    }

    async visualizarTodos(req: Request, res: Response) {
        const eventos = await this.service.visualizarTodos();
        res.json(eventos);
    }

    async visualizarAnunciados(req: Request, res: Response) {
        const eventos = await this.service.visualizarAnunciados();
        res.json(eventos);
    }

    async visualizar(req: Request, res: Response) {
        const { id } = req.params;
        const evento = await this.service.visualizar(parseInt(id));
        res.json(evento);
    }

    async visualizarEventosUsuario(req: Request, res: Response) { // Alterado para Usuario
        const { id } = req.params;
        const eventos = await this.service.visualizarEventosUsuario(parseInt(id)); // Alterado para Usuario
        res.json(eventos);
    }

    async filtrar(req: Request, res: Response) {
        const titulo = req.query.titulo as string;
        const tipo = req.query.tipo as string;
        const data = req.query.data ? new Date(req.query.data as string) : undefined;
        const cidade = req.query.cidade as string;

        const eventos = await this.service.filtrar(titulo, tipo, data, cidade);

        res.json(eventos);
    }

    async criar(req: Request, res: Response): Promise<any> {
        const { titulo, descricao, data, horario, tipo, telefone, livre, link, fotos, local, estado, cidade, bairro, numero, usuarioId }: EventoRequest = req.body;

        const organizador = await this.usuarioServico.visualizar(usuarioId);

        if (!organizador) {
            return res.status(404).json({ message: "Empresário não encontrado." });
        }

        try {
        const result = await this.service.criar({ titulo, descricao, data, horario, tipo, telefone, livre, link, fotos, local, estado, cidade, bairro, numero, organizador });

        res.status(201).json(result);
        } catch (erros) {
            res.json(erros);
        }
    }

    async anunciar(req: Request, res: Response) {
        const { id } = req.params;
        const resultado = await this.service.anunciar(parseInt(id));
        res.json(resultado);
    }

    async editar(req: Request, res: Response) {
        const { id } = req.params;
        const { titulo, descricao, data, horario, tipo, telefone, livre, link, fotos, local, estado, cidade, bairro, numero } : EditarEventoRequest = req.body;

        try {
        const evento = await this.service.editar({ id: parseInt(id), titulo, descricao, data, horario, tipo, telefone, livre, link, fotos, local, estado, cidade, bairro, numero });

        res.json(evento);
        } catch (erros) {
            res.json(erros)
        }
    }

    async apagar(req: Request, res: Response) {
        const { id } = req.params;
        const resultado = await this.service.apagar(parseInt(id));
        res.json(resultado);
    }
}
