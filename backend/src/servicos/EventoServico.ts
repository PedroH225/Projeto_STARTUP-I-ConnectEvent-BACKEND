import { In, Like, MoreThanOrEqual } from "typeorm";
import { AppDataSource } from "../bd";
import { Endereco } from "../entidades/Endereco";
import { Evento } from "../entidades/Evento";
import { Foto } from "../entidades/Foto";
import { Formatador } from '../utils/FormatadorDeData';
import { ValidarFormulario } from "../utils/ValidarFormulario";
import { Usuario } from "../entidades/Usuario"; // Importando a nova entidade
import { FotoServico } from "./FotoServico";
import { UsuarioServico } from "./UsuarioServico";
import { AmizadeServico } from "./AmizadeServico";

type EventoRequest = {
    titulo: string, descricao: string, data: Date, horario: string, tipo: string, telefone: string,
    livre: boolean, link: string, fotos: Express.Multer.File[], local: string,
    estado: string, cidade: string, bairro: string, numero: number, organizador: Usuario
}

type EditarEventoRequest = {
    id: number, titulo: string, descricao: string, data: Date, horario: string, tipo: string, telefone: string, livre: boolean,
    link: string, fotosNovas: Express.Multer.File[], local: string, estado: string, cidade: string, bairro: string, numero: number
}

export class EventoServico {
    private repositorio;
    private fotoServico;
    private endRepositorio;
    private usuarioServico;
    private amizadeServico;

    constructor() {
        this.repositorio = AppDataSource.getRepository(Evento);
        this.fotoServico = new FotoServico();
        this.endRepositorio = AppDataSource.getRepository(Endereco);
        this.usuarioServico = new UsuarioServico;
        this.amizadeServico = new AmizadeServico;
    }

    async visualizarTodos() {
        const eventos = await this.repositorio.find({ relations: ["endereco", "fotos"] });

        const eventosFormatados = eventos.map(evento => ({
            ...evento,
            data: Formatador.formatDate(evento.data),
            horario: Formatador.formatarHorario(evento.horario)
        }));

        return eventosFormatados;
    }

    async visualizarPorId(id: number) {
        const evento = await this.repositorio.findOne({ where: { id: id }, relations: ["participantes"] })

        return evento;
    }

    async visualizarAnunciados(id: number) {
        const whereConditions: any = {}; // Objeto para armazenar as condições de filtro
        whereConditions.isAnunciado = true;
        whereConditions.data = MoreThanOrEqual(new Date());
        let usuario;
        let amigos;

        if (id) {
            usuario = await this.usuarioServico.visualizar(id);
            if (usuario) {
                if (usuario.idade < 18) {
                    whereConditions.livre = true;
                }

                amigos = await this.amizadeServico.listarAceitos(id)

            }
        }

        const eventos = await this.repositorio.find({ where: whereConditions, relations: ["endereco", "fotos", "participantes"] });

        if (amigos && amigos.length > 0) {
            const amigoIds = amigos.map(amigo => amigo.id);

            // Filtrar os participantes de cada evento
            eventos.forEach(evento => {
                evento.participantes = evento.participantes.filter(participante =>
                    amigoIds.includes(participante.id)
                );
            });
        } else {
            eventos.forEach(evento => {
                evento.participantes = []
            })
        }

        const eventosFormatados = eventos.map(evento => ({
            ...evento,
            data: Formatador.formatDate(evento.data),
            horario: Formatador.formatarHorario(evento.horario)
        }));

        return eventosFormatados;
    }

    async visualizar(id: number, usuarioId: number) {
        const evento = await this.repositorio.findOne({ where: { id: id }, relations: ["endereco", "fotos", "organizador", "participantes"] });

        let amigos;

        if (usuarioId) {
            amigos = await this.amizadeServico.listarAceitos(usuarioId)

        }

        if (!evento) {
            throw new Error("Evento não encontrado!")
        }

        if (amigos && amigos.length > 0) {
            const amigoIds = amigos.map(amigo => amigo.id);

            // Filtrar os participantes de cada evento

            evento.participantes = evento.participantes.filter(participante =>
                amigoIds.includes(participante.id)
            );
        } else {
            evento.participantes = []
        }


        const eventoFormatado = {
            ...evento,
            data: Formatador.formatDate(evento.data), // Formata a data
            horario: Formatador.formatarHorario(evento.horario)
        };

        return eventoFormatado; // Retorna o evento formatado
    }

    async verificarParticipacao(usuarioId: number, eventoId: number): Promise<boolean> {
        const evento = await this.repositorio.findOne({
            where: { id: eventoId },
            relations: ["participantes"] // Certifique-se de que a relação com participantes está carregada
        });

        if (!evento) {
            throw new Error("Evento não encontrado.");
        }

        // Verifica se o usuário está na lista de participantes
        const estaParticipando = evento.participantes.some(participante => participante.id === usuarioId);
        return estaParticipando;
    }

    async filtrar(id: number, titulo?: string, tipo?: string, data?: Date, cidade?: string) {
        const whereConditions: any = {}; // Objeto para armazenar as condições de filtro
        let amigos;

        if (id) {
            const usuario = await this.usuarioServico.visualizar(id);
            if (usuario) {
                if (usuario.idade < 18) {
                    whereConditions.livre = true;
                }

                amigos = await this.amizadeServico.listarAceitos(id)

            }
        }

        if (titulo) {
            whereConditions.titulo = Like(`%${titulo}%`);
        }
        if (tipo) {
            whereConditions.tipo = tipo; // Adiciona a condição de tipo se estiver presente
        }

        if (data) {
            whereConditions.data = MoreThanOrEqual(data); // Adiciona a condição de data se estiver presente
        } else {
            whereConditions.data = MoreThanOrEqual(new Date());
        }

        if (cidade) {
            whereConditions.endereco = { cidade: cidade }; // Adiciona a condição de cidade se estiver presente
        }

        whereConditions.isAnunciado = true;

        const eventos = await this.repositorio.find({
            where: whereConditions,
            relations: ["endereco", "fotos", "participantes"]
        });

        if (amigos && amigos.length > 0) {
            const amigoIds = amigos.map(amigo => amigo.id);

            // Filtrar os participantes de cada evento
            eventos.forEach(evento => {
                evento.participantes = evento.participantes.filter(participante =>
                    amigoIds.includes(participante.id)
                );
            });
        } else {
            eventos.forEach(evento => {
                evento.participantes = []
            })
        }

        return eventos;
    }

    async criar({ titulo, descricao, data, horario, tipo, telefone, livre, link, fotos, local, estado, cidade, bairro, numero, organizador }: EventoRequest) { // Alterado para Usuario
        let evento = new Evento(titulo, descricao, data, horario, tipo, telefone, livre, link, false);
        const endereco = new Endereco(local, estado, cidade, bairro, numero);

        evento.endereco = endereco;
        evento.organizador = organizador; // Alterado para Usuario

        try {
            await ValidarFormulario.evento(evento);

            let eventoDb = await this.repositorio.save(evento);


            if (fotos && fotos.length > 0) {

                await this.fotoServico.salvarFotos(fotos, eventoDb.id)
            }

            return await this.repositorio.findOne({ where: { id: eventoDb.id }, relations: ["fotos", "endereco"] });

        } catch (error) {
            throw error;
        }
    }

    async anunciar(id: number) {
        const evento = await this.repositorio.findOne({ where: { id: id } })

        if (!evento) {
            throw new Error("Evento não encontrado.")
        }

        evento.isAnunciado = true;

        await this.repositorio.save(evento);

        return "Evento anunciado com sucesso!";
    }

    async editar({ id, titulo, descricao, data, horario, tipo, telefone, livre, link, fotosNovas, local, estado, cidade, bairro, numero }: EditarEventoRequest) {
        let evento = await this.repositorio.findOne({ where: { id: id }, relations: ["fotos", "endereco"] });

        if (!evento) {
            return new Error("O evento não existe.")
        }

        evento.id = id;
        evento.titulo = titulo ? titulo : evento.titulo;
        evento.descricao = descricao ? descricao : evento.descricao;
        evento.data = data ? data : evento.data;
        evento.horario = horario ? horario : evento.horario;
        evento.tipo = tipo ? tipo : evento.tipo;
        evento.telefone = telefone ? telefone : evento.telefone;
        evento.livre = livre ? livre : evento.livre;
        evento.link = link ? link : evento.link;

        evento.endereco.local = local ? local : evento.endereco.local;
        evento.endereco.estado = estado ? estado : evento.endereco.estado;
        evento.endereco.cidade = cidade ? cidade : evento.endereco.cidade;
        evento.endereco.bairro = bairro ? bairro : evento.endereco.bairro;
        evento.endereco.numero = numero ? numero : evento.endereco.numero;
        evento.organizador = evento.organizador;


        try {
            await ValidarFormulario.evento(evento);

            let eventoDb = await this.repositorio.save(evento);

            if (fotosNovas && fotosNovas.length > 0) {
                await this.fotoServico.salvarFotos(fotosNovas, id); // Aqui você chama o método para salvar fotos
            }


            return await this.repositorio.findOne({ where: { id: eventoDb.id }, relations: ["fotos", "endereco"] });

        } catch (error) {
            console.log(error);

            throw error;
        }
    }

    async apagar(id: number) {
        let evento = await this.repositorio.findOne({ where: { id: id } })
        if (!evento) {
            return new Error("Evento não encontrado.");
        }

        await this.repositorio.delete(id);
        await this.endRepositorio.delete(evento.endereco.id);

        return "Evento deletado com sucesso.";
    }

    async randomEventos(id: number) {
        const eventos = await this.visualizarAnunciados(id);

        //  Randomiza a ordem dos eventos
        const eventosRandomizados = eventos.sort(() => Math.random() - 0.5);

        return eventos;
    }
}

