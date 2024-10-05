import { AppDataSource } from "../bd";
import { Empresario } from "../entidades/Empresario";
import { Evento } from "../entidades/Evento";

type EmpresarioRequest = {
    email: string, senha: string, nome: string;
}

type UpdateEmpresarioRequest = {
    id: number; email: string, senha: string, nome: string;
}

export class EmpresarioServico {

    private repository;

    constructor() {
        this.repository = AppDataSource.getRepository(Empresario);
    }

    async visualizarTodos() {
        const empresarios = await this.repository.find();
        return empresarios;
    }

    async visualizar(id: number) {
        const empresario = await this.repository.findOne({ where: { id: id } })

        return empresario;
    }

    async criar({ email, senha, nome }: EmpresarioRequest): Promise<Error | Empresario> {

        const empresario = this.repository.create({ email, senha, nome });

        await this.repository.save(empresario);

        return empresario;
    }

    async editar({ id, email, senha, nome } : UpdateEmpresarioRequest): Promise<Error | Empresario> {
        const empresario = await this.repository.findOne({ where: { id : id }})

        if (!empresario) {
            return new Error("O empresário não existe!")
        }

        empresario.email = email ? email : empresario.email;
        empresario.senha = senha ? senha : empresario.senha;
        empresario.nome = nome ? nome : empresario.nome;

        await this.repository.save(empresario);

        return empresario;
    }
}