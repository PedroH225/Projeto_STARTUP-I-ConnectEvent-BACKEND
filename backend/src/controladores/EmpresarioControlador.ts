import { AppDataSource } from "../bd";
import { EmpresarioServico } from "../servicos/EmpresarioServico";
import { Request, Response } from "express";

export class EmpresarioControlador {
    private service;

    constructor() {
        this.service = new EmpresarioServico();
    }

    async visualizarTodos(req: Request, res: Response) {
        const empresarios = await this.service.visualizarTodos();

        res.json(empresarios);
    }
}