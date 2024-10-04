import { AppDataSource } from "../bd";
import { Empresario } from "../entidades/Empresario";

type EmpresarioRequest = {
    email: string, senha: string, nome: string;
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
}