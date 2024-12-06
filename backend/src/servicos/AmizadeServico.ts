import { In } from "typeorm";
import { AppDataSource } from "../bd";
import { PedidoAmizade } from "../entidades/PedidoAmizade";
import { Usuario } from "../entidades/Usuario";
import { CodigoErro, criarErro } from "../utils/CriarErro";

export class AmizadeServico {

    private repository;
    private usuarioRepository;

    constructor() {
        this.repository = AppDataSource.getRepository(PedidoAmizade)
        this.usuarioRepository = AppDataSource.getRepository(Usuario)
    }

    async enviar(remetenteId: number, destinatarioId: number) {
        // Verifica se já existe um pedido de amizade entre os usuários
        const pedidoExistente = await this.repository.findOne({
            where: [
                { userIdSender: remetenteId, userIdReceiver: destinatarioId },
                { userIdSender: destinatarioId, userIdReceiver: remetenteId } // Caso a amizade seja bidirecional
            ]
        });
    
        if (pedidoExistente) {
            throw criarErro("Usuário já adicionado.", 400, CodigoErro.USUARIO_JA_ADD, "amizadeErro")
        }

        if (destinatarioId === remetenteId) {
            throw criarErro("Você não pode se adicionar.", 400, CodigoErro.AUTO_ADICAO, "amizadeErro");
        }

        const pedido = new PedidoAmizade(remetenteId, destinatarioId);
        await this.repository.save(pedido);
    
        return "Pedido de amizade enviado.";
    }

    async verificarPedido(remetenteId: number, destinatarioId: number) {
        return await this.repository.findOne({
            where: { userIdSender: remetenteId, userIdReceiver: destinatarioId, status: 'pendente' },
        });
    }

    async aceitar(remetenteId: number, destinatarioId: number) {
        const pedido = await this.verificarPedido(remetenteId, destinatarioId);
        if (pedido) {
            pedido.status = 'aceito';
            await this.repository.save(pedido)
        }
    }

    async excluir(remetenteId: number, destinatarioId: number) {
        await this.repository.delete({ userIdSender: remetenteId, userIdReceiver: destinatarioId });
    }

    async listarPendentes(usuarioId: number) {
        const pedidos = await this.repository.find({
            where: [
                { userIdSender: usuarioId, status: 'pendente' }
            ],
        });

        let amigos : number[] = []

        pedidos.forEach(pedido => {
            if (pedido.userIdSender !== usuarioId) {
                amigos.push(pedido.userIdSender);
            }
            if (pedido.userIdReceiver !== usuarioId) {
                amigos.push(pedido.userIdReceiver);
            }
        });

        const amigosSet = [...new Set(amigos)];
        
        return await this.usuarioRepository.find({ where: { id: In(amigosSet) } });
    }

    // Lista de amizades já aceitas de um usuário
    async listarAceitos(usuarioId: number) {
        const pedidos = await this.repository.find({
            where: [
                { userIdSender: usuarioId, status: 'aceito' },
                { userIdReceiver: usuarioId, status: 'aceito' }
            ],
        });

        let amigos : number[] = []

        pedidos.forEach(pedido => {
            if (pedido.userIdSender !== usuarioId) {
                amigos.push(pedido.userIdSender);
            }
            if (pedido.userIdReceiver !== usuarioId) {
                amigos.push(pedido.userIdReceiver);
            }
        });

        const amigosSet = [...new Set(amigos)];
        
        return await this.usuarioRepository.find({ where: { id: In(amigosSet) } });
    }

    async listarRecebidos(usuarioId: number) {
        const pedidos = await this.repository.find({
            where: { userIdReceiver: usuarioId, status: 'pendente' }  // Inclui informações do remetente, se necessário
        });

        let amigos : number[] = []

        pedidos.forEach(pedido => {
            if (pedido.userIdSender !== usuarioId) {
                amigos.push(pedido.userIdSender);
            }
            if (pedido.userIdReceiver !== usuarioId) {
                amigos.push(pedido.userIdReceiver);
            }
        });

        const amigosSet = [...new Set(amigos)];
        
        return await this.usuarioRepository.find({ where: { id: In(amigosSet) } });
    }
}