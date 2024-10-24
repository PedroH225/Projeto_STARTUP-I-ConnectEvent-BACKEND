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

        try {
            const result = await this.service.criar({ email, senha, nome });

            res.status(201).json(result);

        } catch (erros) {
            res.json(erros)
        }
    }

    async editar(req: Request, res: Response) {
        const { id } = req.params;
        const idInt = parseInt(id);

        const { email, senha, nome } = req.body;

        try {
            const result = await this.service.editar({ id: idInt, email, senha, nome })

            res.status(200).json(result);

        } catch (erros) {
            res.json(erros)
        }
    }

    async apagar(req: Request, res: Response) {
        const { id } = req.params;
        const idInt = parseInt(id);

        const result = await this.service.apagar(idInt);

        res.status(200).json({ mensagem: result })
    }

    async realizarAcesso(req: Request, res: Response) {
        const { email, senha } = req.body;

        try {
            const token = await this.service.validar({ email, senha });

            res.json({ token })
        } catch (erro: Error | any) {
            res.json(erro.message)
        }
    }

    async validar(req: Request, res: Response) {
        const eventos: Evento[] = [];
        try {

            await ValidarFormulario.empresario(new Empresario(10, "email@email.com", "Senha3@a", "pedro", eventos));

            res.json("De boa!");
        } catch (erros) {
            res.json(erros)
        }
    }

    async testarToken(req: Request, res: Response) {
        res.json({
            message: 'Token válido.',
            user: req.user 
        });
    }
}