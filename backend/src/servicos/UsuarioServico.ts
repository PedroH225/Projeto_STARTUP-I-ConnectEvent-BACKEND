import { AppDataSource } from "../bd";
import { Usuario } from "../entidades/Usuario";
import { Evento } from "../entidades/Evento";
import { ValidarFormulario } from "../utils/ValidarFormulario";
import jwt from 'jsonwebtoken';
import { LessThan, MoreThanOrEqual } from "typeorm";

type UsuarioRequest = {
    email: string;
    senha: string;
    nome: string;
    idade: number;
    genero: string;
    estado: string;
    cidade: string;
}

type UpdateUsuarioRequest = {
    id: number;
    email: string;
    senha: string;
    nome: string;
    idade: number;
    genero: string;
    estado: string;
    cidade: string;
}

type LoginRequest = {
    email: string;
    senha: string;
}

export class UsuarioServico {
    private repositorio;
    private eventoRepositorio;

    constructor() {
        this.repositorio = AppDataSource.getRepository(Usuario);
        this.eventoRepositorio = AppDataSource.getRepository(Evento);
    }

    async visualizarTodos() {
        const usuarios = await this.repositorio.find();
        return usuarios;
    }

    async visualizar(id: number) {
        const usuario = await this.repositorio.findOne({ where: { id: id } });
        return usuario;
    }

    async visualizarEventosUsuario(id: number) { // Alterado para Usuario
        const eventos = await this.eventoRepositorio.find({where: {organizador: {id : id}}}); // Alterado para Usuario

        return eventos;
    }

    async visualizarEventosUsuarioAnunciado(id: number) { // Alterado para Usuario
        const eventos = await this.eventoRepositorio.find({where: { organizador: {id : id}, isAnunciado: true, data : MoreThanOrEqual(new Date()) } }); // Alterado para Usuario

        return eventos;
    }

    async visualizarPorEmail(email: string) {
        try {
            const usuario = await this.repositorio.findOne({ where: { email: email } });
            return usuario;
        } catch {
            return "Usuário não encontrado.";
        }
    }

    async visualizarEventosParticipando(usuarioId: number) {
            const eventos = await this.eventoRepositorio.find({ where: { participantes: { id: usuarioId } } });
            if (eventos.length === 0) {
                throw new Error("Nenhum evento encontrado para este usuário.");
            }
            return eventos;
        
    }

    async criar({ email, senha, nome, idade, genero, estado, cidade }: UsuarioRequest) {
        
        const usuario = await this.repositorio.create({ email, senha, nome, idade, genero, estado, cidade });

        await ValidarFormulario.usuario(usuario);
        await this.repositorio.save(usuario);

        return usuario;
    }

    async participar(usuarioId: number, eventoId: number) {
        const usuario = await this.repositorio.findOne({ where: { id: usuarioId }, relations: ["eventos"] });
        const evento = await this.eventoRepositorio.findOne({ where: { id: eventoId } });

        if (!usuario || !evento) {
            throw new Error("Usuário ou evento não encontrado.");
        }

        if (!usuario.eventos.find(e => e.id === eventoId)) {
            usuario.eventos.push(evento);
            await this.repositorio.save(usuario);
        } else {
            throw new Error("Usuário já está participando deste evento.");
        }
    }

    async editar({ id, email, senha, nome, idade, genero, estado, cidade }: UpdateUsuarioRequest) {
        const usuario = await this.repositorio.findOne({ where: { id: id } });

        if (!usuario) {
            return new Error("O usuário não existe!");
        }

        usuario.email = email ? email : usuario.email;
        usuario.senha = senha ? senha : usuario.senha;
        usuario.nome = nome ? nome : usuario.nome;
        usuario.idade = idade ? idade : usuario.idade;
        usuario.genero = genero ? genero : usuario.genero;
        usuario.estado = estado ? estado : usuario.estado;
        usuario.cidade = cidade ? cidade : usuario.cidade;

        await ValidarFormulario.usuario(usuario);
        await this.repositorio.save(usuario);
        return usuario;
    }

    async apagar(id: number) {
        await this.repositorio.delete(id);
        return "Usuário deletado com sucesso.";
    }

    async validar({ email, senha }: LoginRequest) {
        const usuario = await this.repositorio.findOne({ where: { email: email, senha: senha } });

        if (usuario) {
            const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET as string, {
                expiresIn: '1h' // Token expira em 1 hora
            });
            return token;
        } else {
            throw new Error("Usuário ou senha incorretos");
        }
    }

    async visualizarEventosOcorridos(usuarioId: number) {
        const eventos = await this.eventoRepositorio.find({
            where: { participantes: { id: usuarioId }, data: LessThan(new Date()) }
        });
        return eventos;
    }

    
}
