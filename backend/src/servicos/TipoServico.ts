import { AppDataSource } from "../bd";
import { Tipo } from "../entidades/Tipo";

export class TipoServico {
    private repository;

    constructor() {
        this.repository = AppDataSource.getRepository(Tipo)
    }

    async visualizarTodos() {
        const tipos = await this.repository.find();

        return tipos;
    }
}