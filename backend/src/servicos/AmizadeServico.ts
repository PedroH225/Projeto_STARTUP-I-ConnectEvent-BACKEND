import { AppDataSource } from "../bd";
import { PedidoAmizade } from "../entidades/PedidoAmizade";
import { Usuario } from "../entidades/Usuario";

export class AmizadeServico {

    private repository;

    constructor() {
        this.repository = AppDataSource.getRepository(PedidoAmizade)
    }

    async enviar(remetenteId: number, destinatarioId: number) {

        const pedido = new PedidoAmizade(remetenteId, destinatarioId);

        await this.repository.save(pedido)
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
        return await this.repository.find({
            where: [
                { userIdSender: usuarioId, status: 'pendente' },
                { userIdReceiver: usuarioId, status: 'pendente' }
            ],
        });
    }

    // Lista de amizades já aceitas de um usuário
    async listarAceitos(usuarioId: number) {
        return await this.repository.find({
            where: [
                { userIdSender: usuarioId, status: 'aceito' },
                { userIdReceiver: usuarioId, status: 'aceito' }
            ],
        });
    }
}