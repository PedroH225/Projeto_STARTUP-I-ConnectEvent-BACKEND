import { UsuarioServico } from "../servicos/UsuarioServico";
import { json, Request, Response } from "express";

export class UsuarioControlador {
    private service;

    constructor() {
        this.service = new UsuarioServico();
    }

    async visualizarTodos(req: Request, res: Response) {
        const usuarios = await this.service.visualizarTodos();

        res.json(usuarios);
    }

    async visualizar(req: Request, res: Response) {
        const { id } = req.params;
        const idInt = parseInt(id);

        const usuario = await this.service.visualizar(idInt);

        res.json(usuario);
    }

    async visualizarEventosParticipando(req: Request, res: Response) {
        const { id } = req.params;
        const idInt = parseInt(id);

        const  eventos = await this.service.visualizarEventosParticipando(idInt);

        res.json(eventos);
    }

    async criar(req: Request, res: Response) {
        const { email, senha, nome, idade, genero, estado, cidade } = req.body;
        const idadeInt = parseInt(idade)

        try {
        const result = await this.service.criar({ email, senha, nome, idade: idadeInt, genero, estado, cidade });

        res.status(201).json(result);
        } catch (erros) {
            res.json(erros);
        }
    }

    async editar(req: Request, res: Response) {
        const { id } = req.params
        const { email, senha, nome, idade, genero, estado, cidade } = req.body;
        const idadeInt = parseInt(idade)
        const idInt = parseInt(id);

        try {
        const result = await this.service.editar({ id: idInt, email, senha, nome, idade: idadeInt, genero, estado, cidade });

        res.status(200).json(result);
        } catch (erros) {
            res.json(erros)
        }
    }

    async apagar(req: Request, res: Response) {
        const {id} = req.params;
        const idInt = parseInt(id);

        const result = await this.service.apagar(idInt);

        res.status(200).json(result);
    }

}