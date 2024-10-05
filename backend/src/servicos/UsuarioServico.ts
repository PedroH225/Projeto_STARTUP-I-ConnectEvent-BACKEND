import { AppDataSource } from "../bd";
import { Usuario } from "../entidades/Usuario";

type UsuarioRequest = {
    email: string, senha: string, nome: string, idade: number, genero: string, estado: string, cidade: string;
}

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

    async criar({ email, senha, nome, idade, genero, estado, cidade }: UsuarioRequest){

        const usuario = this.repositorio.create({ email, senha, nome, idade, genero, estado, cidade });

        await this.repositorio.save(usuario);

        return usuario;
    }
}