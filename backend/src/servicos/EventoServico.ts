import { AppDataSource } from "../bd";
import { Evento } from "../entidades/Evento";

export class EventoServico {
    private repositorio;

    constructor() {
        this.repositorio = AppDataSource.getRepository(Evento);
    }

    async visualizarTodos() {
        const eventos = await this.repositorio.find({ relations: ["endereco", "fotos"] });
        return eventos;
    }

    async visualizar(id: number) {
        const evento = await this.repositorio.findOne({ where: { id: id }, relations: ["endereco", "fotos", "empresario"] });

        return evento;
    }
}