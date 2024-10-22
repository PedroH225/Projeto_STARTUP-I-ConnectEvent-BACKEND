import { AppDataSource } from "../bd";
import { Usuario } from "../entidades/Usuario";
import { ValidarFormulario } from "../utils/ValidarFormulario";

type UsuarioRequest = {
    email: string, senha: string, nome: string, idade: number, genero: string, estado: string, cidade: string;
}

type UpdateUsuarioRequest = {
    id: number, email: string, senha: string, nome: string, idade: number, genero: string, estado: string, cidade: string;
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

    async criar({ email, senha, nome, idade, genero, estado, cidade }: UsuarioRequest) {

        const usuario = await this.repositorio.create({ email, senha, nome, idade, genero, estado, cidade });

        await ValidarFormulario.usuario(usuario)

        await this.repositorio.save(usuario);

        return usuario;
    }

    async editar({ id, email, senha, nome, idade, genero, estado, cidade }: UpdateUsuarioRequest) {
        const usuario = await this.repositorio.findOne({ where: { id: id } });

        if (!usuario) {
            return new Error("O empresário não existe!")
        }

        usuario.email = email ? email : usuario.email;
        usuario.senha = senha ? senha : usuario.senha;
        usuario.nome = nome ? nome : usuario.nome;
        usuario.idade = idade ? idade : usuario.idade;
        usuario.genero = genero ? genero : usuario.genero;
        usuario.estado = estado ? estado : usuario.estado;
        usuario.cidade = cidade ? cidade : usuario.cidade;

        await ValidarFormulario.usuario(usuario)

        await this.repositorio.save(usuario);

        return usuario;
    }

    async apagar(id: number) {
        
        await this.repositorio.delete(id);

        return "Usuário deletado com sucesso.";
    }
}