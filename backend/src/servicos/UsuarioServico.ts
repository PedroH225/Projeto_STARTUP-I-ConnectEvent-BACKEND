import { AppDataSource } from "../bd";
import { Usuario } from "../entidades/Usuario";
import { Evento } from "../entidades/Evento";
import { ValidarFormulario } from "../utils/ValidarFormulario";
import jwt from 'jsonwebtoken';
import { LessThan, LessThanOrEqual, MoreThanOrEqual } from "typeorm";
import { Formatador } from "../utils/FormatadorDeData";
import { CodigoErro, criarErro } from "../utils/CriarErro";

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

type AlterarSenhaRequest = {
    id : number
    senhaAtual: string;
    senhaNova: string;
    confirmarSenha: string;
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

        const eventosFormatados = eventos.map(evento => ({
            ...evento,
            data: Formatador.formatDate(evento.data), 
            horario: Formatador.formatarHorario(evento.horario)
        }));
        
        return eventosFormatados;
    }

    async visualizarEventosUsuarioAnunciado(id: number) { // Alterado para Usuario
        const eventos = await this.eventoRepositorio.find({where: { organizador: {id : id}, isAnunciado: true, data : MoreThanOrEqual(new Date()) } }); // Alterado para Usuario
 
        const eventosFormatados = eventos.map(evento => ({
            ...evento,
            data: Formatador.formatDate(evento.data), 
            horario: Formatador.formatarHorario(evento.horario)
        }));
        
        return eventosFormatados;
    }

    async visualizarEventosUsuarioNaoAnunciado(id: number) { // Alterado para Usuario
        const eventos = await this.eventoRepositorio.find({where: { organizador: {id : id}, isAnunciado: false, data : MoreThanOrEqual(new Date()) } }); // Alterado para Usuario
 
        const eventosFormatados = eventos.map(evento => ({
            ...evento,
            data: Formatador.formatDate(evento.data), 
            horario: Formatador.formatarHorario(evento.horario)
        }));
        
        return eventosFormatados;
    }

    async visualizarEventosOcorridos(usuarioId: number) {
        const eventos = await this.eventoRepositorio.find({
            where: { organizador: { id: usuarioId }, data: LessThanOrEqual(new Date()) }
        });
        
        const eventosFormatados = eventos.map(evento => ({
            ...evento,
            data: Formatador.formatDate(evento.data), 
            horario: Formatador.formatarHorario(evento.horario)
        }));
        
        return eventosFormatados;
    }

    async visualizarPorEmail(email: string) {
        try {
            const usuario = await this.repositorio.findOne({ where: { email: email } });

            if (!usuario) {
                throw criarErro("Usuário não encontrado.", 400, CodigoErro.USUARIO_NAO_ENCONTRADO, "amizadeErro")
            }

            return usuario;
        } catch (erro) {
            throw erro;
        }
    }

    async visualizarEventosParticipando(usuarioId: number) {
            const eventos = await this.eventoRepositorio.find({ where: { participantes: { id: usuarioId }, data: MoreThanOrEqual(new Date()) } });
            if (eventos.length === 0) {
                return [];
            }

            const eventosFormatados = eventos.map(evento => ({
                ...evento,
                data: Formatador.formatDate(evento.data), 
                horario: Formatador.formatarHorario(evento.horario)
            }));
            return eventosFormatados;
        
    }

    async visualizarEventosParticipandoOcorridos(usuarioId: number) {
        const eventos = await this.eventoRepositorio.find({ where: { data: LessThanOrEqual(new Date()), participantes: { id: usuarioId }}});
        if (eventos.length === 0) {
            return [];
        }

        const eventosFormatados = eventos.map(evento => ({
            ...evento,
            data: Formatador.formatDate(evento.data), 
            horario: Formatador.formatarHorario(evento.horario)
        }));
        return eventosFormatados;
    }

    async visualizarEventosParticipandoOcorridosSemFormat(usuarioId: number) {
        const eventos = await this.eventoRepositorio.find({ where: { data: LessThanOrEqual(new Date()), participantes: { id: usuarioId }}});
        if (eventos.length === 0) {
            return [];
        }

        return eventos;
    }

    async criar({ email, senha, nome, idade, genero, estado, cidade }: UsuarioRequest) {
        
        const usuario = await this.repositorio.create({ email, senha, nome, idade, genero, estado, cidade });

        try {
        await ValidarFormulario.usuario(usuario);
        await this.repositorio.save(usuario);

        return usuario;
        } catch (error) {
            throw error;
        }
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

    async removerParticipacao(usuarioId: number, eventoId: number) {
        const usuario = await this.repositorio.findOne({ where: { id: usuarioId }, relations: ["eventos"] });
        const evento = await this.eventoRepositorio.findOne({ where: { id: eventoId } });
    
        if (!usuario || !evento) {
            throw new Error("Usuário ou evento não encontrado.");
        }
    
        const eventoIndex = usuario.eventos.findIndex(e => e.id === eventoId);
    
        if (eventoIndex !== -1) {
            usuario.eventos.splice(eventoIndex, 1); // Remove o evento da lista de eventos do usuário
            await this.repositorio.save(usuario);
        } else {
            throw new Error("Usuário não está participando deste evento.");
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

        try {
        await ValidarFormulario.usuario(usuario);

        await this.repositorio.save(usuario);
        return usuario;
        } catch (error) {
            throw error;
        }
    }

    async alterarSenha({ id,  senhaAtual, senhaNova, confirmarSenha } : AlterarSenhaRequest ) {
        const usuario = await this.repositorio.findOne({ where: { id: id } });
        
        if (!usuario) {
            return new Error("O usuário não existe!");
        }

        try {
            await ValidarFormulario.senha(usuario, senhaAtual, senhaNova, confirmarSenha);

            usuario.senha = senhaNova;

            await this.repositorio.save(usuario);
            
            return "Senha alterada com sucesso"
        } catch (erro) {
            throw erro;
        }

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

}
