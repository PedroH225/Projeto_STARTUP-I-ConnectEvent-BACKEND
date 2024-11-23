import { EventoServico } from "../servicos/EventoServico";
import { Request, Response } from "express";
import { UsuarioServico } from "../servicos/UsuarioServico";

type EventoRequest = {
    titulo: string, descricao: string, data: Date, horario: string, tipo: string, telefone: string, livre: boolean,
    link: string, local: string, estado: string, cidade: string, bairro: string, numero: number 
}

type EditarEventoRequest = {
    titulo: string, descricao: string, data: Date, horario: string, tipo: string, telefone: string, livre: boolean,
    link: string, local: string, estado: string, cidade: string, bairro: string, numero: number
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
        const idInt = parseInt(req.user?.id)
        
        const eventos = await this.service.visualizarAnunciados(idInt);

        res.json(eventos);
    }

    async visualizar(req: Request, res: Response) {
        const { id } = req.params;
        const usuarioId = req.user?.id
        const evento = await this.service.visualizar(parseInt(id), usuarioId);
        res.json(evento);
    }

    async verificarParticipacao(req: Request, res: Response) {
        const usuarioId = req.user.id; // Obtendo o ID do usuário a partir do token
        const eventoId = parseInt(req.params.eventoId); // O ID do evento é passado como parâmetro

        try {
            const estaParticipando = await this.service.verificarParticipacao(usuarioId, eventoId);
            res.json({ estaParticipando });
        } catch (erro: Error | any) {
            res.status(400).json({ mensagem: erro.message });
        }
    }

    async filtrar(req: Request, res: Response) {
        const idInt = parseInt(req.user?.id)
        const titulo = req.query.titulo as string;
        const tipo = req.query.tipo as string;
        const data = req.query.data ? new Date(req.query.data as string) : undefined;
        const cidade = req.query.cidade as string;

        const eventos = await this.service.filtrar(idInt, titulo, tipo, data, cidade);

        res.json(eventos);
    }

    async criar(req: Request, res: Response): Promise<any> {
        const { titulo, descricao, data, horario, tipo, telefone, livre, link, local, estado, cidade, bairro, numero }: EventoRequest = req.body;
        const fotos = req.files as Express.Multer.File[];
        const id = parseInt(req.user.id)

        const organizador = await this.usuarioServico.visualizar(id);

        if (!organizador) {
            return res.status(404).json({ message: "Empresário não encontrado." });
        }

        try {
        const result = await this.service.criar({ titulo, descricao, data, horario, tipo, telefone, livre, link, fotos, local, estado, cidade, bairro, numero, organizador });

        res.status(201).json(result);
        } catch (erros) {
            res.status(400).json(erros);
        }
    }

    async anunciar(req: Request, res: Response) {
        const { id } = req.params;
        const resultado = await this.service.anunciar(parseInt(id));
        res.json(resultado);
    }

    async editar(req: Request, res: Response) {
        const idInt = parseInt(req.params.id);
        const { titulo, descricao, data, horario, tipo, telefone, livre, link, local, estado, cidade, bairro, numero } : EditarEventoRequest = req.body;
        const fotosNovas = req.files as Express.Multer.File[];
        
        try {
        const evento = await this.service.editar({ id: idInt, titulo, descricao, data, horario, tipo, telefone, livre, link, fotosNovas, local, estado, cidade, bairro, numero });

        res.status(200).json(evento);
        } catch (erros) {
            res.status(400).json(erros)
        }
    }

    async apagar(req: Request, res: Response) {
        const { id } = req.params;
        const resultado = await this.service.apagar(parseInt(id));
        res.json(resultado);
    }

    async randomEventos(req: Request, res: Response) {
        const idInt = parseInt(req.user?.id)
        
        const eventosRandomizados = await this.service.randomEventos(idInt);

        res.status(200).json(eventosRandomizados);
    }

    async destaqueEventos(req: Request, res: Response) {
        
        const eventosDestaque = await this.service.eventoDestaque();

        res.status(200).json(eventosDestaque);
    }
}
