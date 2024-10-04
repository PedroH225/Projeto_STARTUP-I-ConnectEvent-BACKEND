import { AppDataSource } from "../bd";
import { Empresario } from "../entidades/Empresario";

export class EmpresarioServico {

    private repository;

    constructor() {
        this.repository = AppDataSource.getRepository(Empresario);
    }

    async visualizarTodos() {
        const empresarios = this.repository.find();
        return empresarios;
    }
}