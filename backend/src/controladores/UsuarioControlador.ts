import { UsuarioServico } from "../servicos/UsuarioServico";
import { Request, Response } from "express";

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
}