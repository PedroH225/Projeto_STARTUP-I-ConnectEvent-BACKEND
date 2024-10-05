import { Repository } from "typeorm";
import { AppDataSource } from "../bd";
import { Endereco } from "../entidades/Endereco";

type EnderecoRequest = {
    local: string, estado: string, cidade: string, bairro: string, numero: number;
}

type UpdateEnderecoRequest = {
    id: number, local: string, estado: string, cidade: string, bairro: string, numero: number;
}

export class EnderecoServico {

    private repositorio;

    constructor() {
        this.repositorio = AppDataSource.getRepository(Endereco);
    }

    async visualizarTodos() {
        const enderecos = await this.repositorio.find();
        return enderecos;
    }

    async criar({ local, estado, cidade, bairro, numero }: EnderecoRequest): Promise<Endereco> {
        const endereco = this.repositorio.create({ local, estado, cidade, bairro, numero })

        await this.repositorio.save(endereco);

        return endereco;
    }

    async editar({ id, local, estado, cidade, bairro, numero }: UpdateEnderecoRequest) {
        const endereco = await this.repositorio.findOne({ where: { id } });

        if (!endereco) {
            return new Error("O endereço não existe!");
        }

        endereco.local = local ? local : endereco.local;
        endereco.estado = estado ? estado : endereco.estado;
        endereco.cidade = cidade ? cidade : endereco.cidade;
        endereco.bairro = bairro ? bairro : endereco.bairro;
        endereco.numero = numero ? numero : endereco.numero;

        await this.repositorio.save(endereco);

        return endereco;
    }

    async deletar(id: number) {

        await this.repositorio.delete(id)
    }


}