import { UsuarioServico } from "../servicos/UsuarioServico";
import { json, Request, Response } from "express";
import { ValidarFormulario } from "../utils/ValidarFormulario";
import { Usuario } from "../entidades/Usuario";
import { Evento } from "../entidades/Evento";

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
        const id = req.user.id;
        const idInt = parseInt(id);

        const usuario = await this.service.visualizar(idInt);
        res.status(200).json(usuario);
    }

    async visualizarEventosParticipando(req: Request, res: Response) {
        const id = req.user.id;
        const idInt = parseInt(id);
        try {
        const eventos = await this.service.visualizarEventosParticipando(idInt);
        res.json(eventos);
        } catch (erro : Error | any) {
            res.status(400).json( { mensagem : erro.message })
        }
    }

    async visualizarEventosParticipandoAmigo(req: Request, res: Response) {
        const id = req.params.id;
        const idInt = parseInt(id);
        try {
        const eventos = await this.service.visualizarEventosParticipando(idInt);
        res.json(eventos);
        } catch (erro : Error | any) {
            res.status(400).json( { mensagem : erro.message })
        }
    }

    async visualizarEventosParticipandoOcorridos(req: Request, res: Response) {
        const id = req.user.id;
        const idInt = parseInt(id);

        try {
        const eventos = await this.service.visualizarEventosParticipandoOcorridos(idInt);
        res.json(eventos);
        } catch (erro : Error | any) {
            res.status(400).json( { mensagem : erro.message })
        }
    }

    async visualizarEventosUsuario(req: Request, res: Response) { // Alterado para Usuario
        const id = req.user.id;
        const eventos = await this.service.visualizarEventosUsuario(parseInt(id)); // Alterado para Usuario
        res.json(eventos);
    }

    async visualizarEventosUsuarioAnunciado(req: Request, res: Response) { // Alterado para Usuario
        const id = req.user.id;
        const eventos = await this.service.visualizarEventosUsuarioAnunciado(parseInt(id)); // Alterado para Usuario
        res.json(eventos);
    }

    async visualizarEventosUsuarioNaoAnunciado(req: Request, res: Response) { // Alterado para Usuario
        const id = req.user.id;
        const eventos = await this.service.visualizarEventosUsuarioNaoAnunciado(parseInt(id)); // Alterado para Usuario
        res.json(eventos);
    }

    async visualizarEventosOcorridos(req: Request, res: Response) {
        const id = req.user.id;
        const idInt = parseInt(id);

        const usuario = await this.service.visualizarEventosOcorridos(idInt);

        res.json(usuario);
    }

    async criar(req: Request, res: Response) {
        const { email, senha, nome, idade, genero, estado, cidade } = req.body;
        const idadeInt = idade === undefined || idade === null || isNaN(idade) ? undefined : idade;

        try {
            const result = await this.service.criar({ email, senha, nome, idade: idadeInt, genero, estado, cidade });
            res.status(201).json(result);
        } catch (erros) {
            res.status(400).json(erros);
        }
    }

    async participar(req: Request, res: Response) {
        const usuarioId = parseInt(req.user.id);
        const eventoId = parseInt(req.params.eventoId);

        try {
            await this.service.participar(usuarioId, eventoId);
            res.status(200).json({ message: "Presença confirmada com sucesso!" });
        } catch (error: Error | any) {
            console.log(error);
            res.status(400).json({ error: error.message });
        }
    }

    async removerParticipacao(req: Request, res: Response) {
        const usuarioId = parseInt(req.user.id);
        const eventoId = parseInt(req.params.eventoId);

        try {
            await this.service.removerParticipacao(usuarioId, eventoId);
            res.status(200).json({ message: "Presença retirada com sucesso!" });
        } catch (error: Error | any) {
            console.log(error);
            res.status(400).json({ error: error.message });
        }
    }

    async editar(req: Request, res: Response) {
        const idInt = parseInt(req.user.id);

        const { email, senha, nome, idade, genero, estado, cidade } = req.body;
        const idadeInt = parseInt(idade);

        try {
            const result = await this.service.editar({ id: idInt, email, senha, nome, idade: idadeInt, genero, estado, cidade });
            res.status(200).json(result);
        } catch (erros) {
            res.status(400).json(erros);
        }
    }

    async apagar(req: Request, res: Response) {
        const { id } = req.params;
        const idInt = parseInt(id);
        const result = await this.service.apagar(idInt);
        res.status(200).json(result);
    }

    async realizarAcesso(req: Request, res: Response) {
        const { email, senha } = req.body;

        try {
            const token = await this.service.validar({ email, senha });
            res.json({ token });
        } catch (erro: Error | any) {
            res.status(400).json(erro.message);
        }
    }

    async alterarSenha(req: Request, res: Response) {
        const id = req.params.id;
        const idInt = parseInt(id);

        const { senhaAtual, senhaNova, confirmarSenha } = req.body

        try {
        const result = await this.service.alterarSenha({ id: idInt, senhaAtual, senhaNova, confirmarSenha })
            
        res.status(200).json(result);
        } catch (erro) {
            res.status(400).json(erro);
        }
    }

    async validar(req: Request, res: Response) {
        const eventos: Evento[] = [];
        try {
            await ValidarFormulario.usuario(new Usuario(10, "email@email.com", "Senha3@a", "pedro", 25, "masculino", "estado", "cidade", eventos, [], []));
            res.json("De boa!");
        } catch (erros) {
            res.json(erros);
        }
    }

    async testarToken(req: Request, res: Response) {
        res.json({
            message: 'Token válido.',
            user: req.user
        });
    }
}
