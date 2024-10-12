import { Tipo } from "../entidades/Tipo";
import { TipoServico } from "../servicos/TipoServico";
import { Request, Response } from "express";

export class TipoControlador {

    private service;

    constructor() {
        this.service = new TipoServico();
    }

    async visualizarTodos(req: Request, res: Response) {
        const tipos = await this.service.visualizarTodos();

        res.json(tipos);
    }
}