import { AppDataSource } from "../bd";
import { Usuario } from "../entidades/Usuario";

export class UsuarioServico {
    private repositorio;

    constructor() {
        this.repositorio = AppDataSource.getRepository(Usuario);
    }

    async visualizarTodos() {
        const usuarios = await this.repositorio.find();
        return usuarios;
    }

    async visualizar(id: number) {
        const usuario = await this.repositorio.findOne({ where: { id: id } });

        return usuario;
    }
}