import { UsuarioServico } from "../servicos/UsuarioServico";
import { AmizadeServico } from "../servicos/AmizadeServico";

import { Request, Response } from "express";
import { Usuario } from "../entidades/Usuario";
import { ErroPersonalizado } from "../utils/CriarErro";


export class AmizadeControlodor {
    private servico;
    private amizadeServico;

    constructor() {
        this.servico = new UsuarioServico();
        this.amizadeServico = new AmizadeServico();

    }

    async enviar(req: Request, res: Response): Promise<any> {
        console.log();
        
        const remetenteId = req.user.id;
        const remetenteIdInt = parseInt(remetenteId);
        const { destEmail } = req.body;
    
        try {
            const destinatario = await this.servico.visualizarPorEmail(destEmail);
            
            if (destinatario) {
                const response = await this.amizadeServico.enviar(remetenteIdInt, destinatario.id);
                res.status(200).json(response);
            } 
        } catch (erro : any) {
            if (erro.mensagem) {
                res.status(erro.status).json(erro);
            } else {

                console.log(erro);
                res.status(500).json("Erro desconhecido")
            }
        }
    }
    
    async aceitar(req: Request, res: Response): Promise<any> {
        const remetenteIdInt = parseInt(req.params.remetenteId);
        const destinatarioIdInt = req.user.id;


        try {
            // Verifica se o pedido de amizade existe e está pendente
            const pedidoExistente = await this.amizadeServico.verificarPedido(remetenteIdInt, destinatarioIdInt);

            if (!pedidoExistente) {
                return res.status(404).json("Pedido de amizade não encontrado.");
            }

            // Aceita o pedido de amizade
            await this.amizadeServico.aceitar(remetenteIdInt, destinatarioIdInt);

            return res.json("Pedido de amizade aceito.");
        } catch (erro) {
            res.status(500).json({ message: "Erro ao aceitar o pedido de amizade.", erro });
        }
    }

    async excluir(req: Request, res: Response): Promise<any> {
        const remetenteIdInt = parseInt(req.params.remetenteId);
        const destinatarioIdInt = req.user.id

        try {
            // Verifica se o pedido de amizade existe
            const pedidoExistente = await this.amizadeServico.verificarPedido(remetenteIdInt, destinatarioIdInt);

            if (!pedidoExistente) {
                return res.status(404).json("Pedido de amizade não encontrado.");
            }

            // Exclui o pedido de amizade
            await this.amizadeServico.excluir(remetenteIdInt, destinatarioIdInt);

            return res.json("Pedido de amizade excluído.");
        } catch (erro) {
            res.status(500).json({ message: "Erro ao excluir o pedido de amizade.", erro });
        }
    }

    async listarPendentes(req: Request, res: Response): Promise<any> {
        const usuarioIdInt = req.user.id;

        try {
            const pedidosPendentes = await this.amizadeServico.listarPendentes(usuarioIdInt);
            return res.json(pedidosPendentes);
        } catch (erro) {
            res.status(500).json({ message: "Erro ao listar pedidos pendentes.", erro });
        }
    }

    // Método para listar amizades aceitas
    async listarAceitos(req: Request, res: Response): Promise<any> {
        const usuarioIdInt = req.user.id;

        try {
            const pedidosAceitos = await this.amizadeServico.listarAceitos(usuarioIdInt);
            return res.json(pedidosAceitos);
        } catch (erro) {
            res.status(500).json({ message: "Erro ao listar amizades aceitas.", erro });
        }
    }

    // Método para listar pedidos de amizade recebidos
    async listarRecebidos(req: Request, res: Response): Promise<any> {
        const usuarioIdInt = req.user.id; // Obtém o ID do usuário do token

        try {
            const pedidosRecebidos = await this.amizadeServico.listarRecebidos(usuarioIdInt);
            return res.json(pedidosRecebidos);
        } catch (erro) {
            res.status(500).json({ message: "Erro ao listar pedidos de amizade recebidos.", erro });
        }
    }


}