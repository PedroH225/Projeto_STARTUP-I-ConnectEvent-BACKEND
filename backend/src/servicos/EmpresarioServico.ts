import { AppDataSource } from "../bd";
import { Empresario } from "../entidades/Empresario";

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
        const empresario = await this.repository.findOne({where: {id: id}})

        return empresario;
    }
}