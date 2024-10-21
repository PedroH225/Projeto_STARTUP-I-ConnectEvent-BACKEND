import { AppDataSource } from "../bd";
import { EmpresarioServico } from "../servicos/EmpresarioServico";
import { Request, Response } from "express";
import { ValidarFormulario } from "../utils/ValidarFormulario";
import { Empresario } from "../entidades/Empresario";
import { Evento } from "../entidades/Evento";

export class EmpresarioControlador {
    private service;

    constructor() {
        this.service = new EmpresarioServico();
    }

    async visualizarTodos(req: Request, res: Response) {
        const empresarios = await this.service.visualizarTodos();

        res.json(empresarios);
    }

    async visualizar(req: Request, res: Response) {
        const { id } = req.params;
        const idInt = parseInt(id);

        const empresario = await this.service.visualizar(idInt);

        res.json(empresario);
    }

    async criar(req: Request, res: Response) {
        const { email, senha, nome } = req.body;

        const result = await this.service.criar({ email, senha, nome });

        res.status(201).json(result);
    }

    async editar(req: Request, res: Response) {
        const { id } = req.params;
        const idInt = parseInt(id);

        const { email, senha, nome } = req.body;

        const result = await this.service.editar({ id: idInt, email, senha, nome })

        res.status(200).json(result);
    }

    async apagar(req: Request, res: Response) {
        const { id } = req.params;
        const idInt = parseInt(id);

        const result = await this.service.apagar(idInt);
        
        res.status(200).json({mensagem: result})
    }

    async validar(req: Request, res: Response) {
        const eventos: Evento[] = [];
        try {

        ValidarFormulario.empresario(new Empresario(10, "emailgmail.com", "senha3", "Pedro", eventos));

        res.json("De boa!");
        } catch (erros) {
            res.json(erros)
        }
}
}