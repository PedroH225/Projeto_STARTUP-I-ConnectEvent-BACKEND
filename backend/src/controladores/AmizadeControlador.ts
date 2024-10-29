import { UsuarioServico } from "../servicos/UsuarioServico";
import { AmizadeServico } from "../servicos/AmizadeServico";

import { Request, Response } from "express";
import { Usuario } from "../entidades/Usuario";


export class AmizadeControlodor {
    private servico;
    private amizadeServico;

    constructor() {
        this.servico = new UsuarioServico();
        this.amizadeServico = new AmizadeServico();

    }

    async enviar(req: Request, res: Response) {
        const { remetenteId } = req.params;
        const remetenteIdInt = parseInt(remetenteId);
        
        const { destEmail } = req.body;

        try {

        const destinatario : Usuario | any = await this.servico.visualizarPorEmail(destEmail);

        if (destinatario) {
            await this.amizadeServico.enviar(remetenteIdInt, destinatario.id); 
            
            res.json("Pedido de amizade enviado.")
        }

        } catch (erro){
            res.json(erro)
        }
    }
    
    async aceitar(req: Request, res: Response) {
        const { remetenteId, destinatarioId } = req.params;
        const remetenteIdInt = parseInt(remetenteId);
        const destinatarioIdInt = parseInt(destinatarioId);
    
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

    async excluir(req: Request, res: Response) {
        const { remetenteId, destinatarioId } = req.params;
        const remetenteIdInt = parseInt(remetenteId);
        const destinatarioIdInt = parseInt(destinatarioId);
    
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

    async listarPendentes(req: Request, res: Response) {
        const { usuarioId } = req.params;
        const usuarioIdInt = parseInt(usuarioId);

        try {
            const pedidosPendentes = await this.amizadeServico.listarPendentes(usuarioIdInt);
            return res.json(pedidosPendentes);
        } catch (erro) {
            res.status(500).json({ message: "Erro ao listar pedidos pendentes.", erro });
        }
    }

    // Método para listar amizades aceitas
    async listarAceitos(req: Request, res: Response) {
        const { usuarioId } = req.params;
        const usuarioIdInt = parseInt(usuarioId);

        try {
            const pedidosAceitos = await this.amizadeServico.listarAceitos(usuarioIdInt);
            return res.json(pedidosAceitos);
        } catch (erro) {
            res.status(500).json({ message: "Erro ao listar amizades aceitas.", erro });
        }
    }
}