import { Like, MoreThanOrEqual } from "typeorm";
import { AppDataSource } from "../bd";
import { Empresario } from "../entidades/Empresario";
import { Endereco } from "../entidades/Endereco";
import { Evento } from "../entidades/Evento";
import { Foto } from "../entidades/Foto";
import { Formatador } from '../utils/FormatadorDeData';
import { ValidarFormulario } from "../utils/ValidarFormulario";

type EventoRequest = {
    titulo: string, descricao: string, data: Date, horario: string, tipo: string, telefone: string, livre: boolean,
    link: string, fotos: any[], local: string, estado: string, cidade: string, bairro: string, numero: number, empresario: Empresario
}

type EditarEventoRequest = {
    id: number, titulo: string, descricao: string, data: Date, horario: string, tipo: string, telefone: string, livre: boolean,
    link: string, fotos: any[], local: string, estado: string, cidade: string, bairro: string, numero: number
}

export class EventoServico {
    private repositorio;
    private fotoRepositorio;
    private endRepositorio;

    constructor() {
        this.repositorio = AppDataSource.getRepository(Evento);
        this.fotoRepositorio = AppDataSource.getRepository(Foto)
        this.endRepositorio = AppDataSource.getRepository(Endereco)
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

    async visualizarAnunciados() {
        const eventos = await this.repositorio.find({where: { isAnunciado : true }, relations: ["endereco", "fotos"] });
        
        const eventosFormatados = eventos.map(evento => ({
            ...evento,
            data: Formatador.formatDate(evento.data), 
            horario: Formatador.formatarHorario(evento.horario)
        }));
        
        return eventosFormatados;
    }

    async visualizar(id: number) {
        const evento = await this.repositorio.findOne({ where: { id: id }, relations: ["endereco", "fotos", "empresario"] });

        if (!evento) {
            throw new Error("Evento não encontrado!")
        }

        const eventoFormatado = {
            ...evento,
            data: Formatador.formatDate(evento.data), // Formata a data
            horario: Formatador.formatarHorario(evento.horario)
        };
        
        return eventoFormatado; // Retorna o evento formatado
    }

    async filtrar(titulo ?: string, tipo?: string, data?: Date, cidade?: string) {
        const whereConditions: any = {}; // Objeto para armazenar as condições de filtro

    if (titulo) {
        whereConditions.titulo = Like(`%${titulo}%`)
    }
    if (tipo) {
        whereConditions.tipo = tipo; // Adiciona a condição de tipo se estiver presente
    }

    if (data) {
        whereConditions.data = MoreThanOrEqual(data); // Adiciona a condição de data se estiver presente
    }

    if (cidade) {
        whereConditions.endereco = { cidade: cidade }; // Adiciona a condição de cidade se estiver presente
    }

    const resultArray = await this.repositorio.find({
        where: whereConditions,
        relations: ["endereco"]
    });

    return resultArray;

    }

    async criar({ titulo, descricao, data, horario, tipo, telefone, livre, link, fotos, local, estado, cidade, bairro, numero, empresario }: EventoRequest) {
        let evento = new Evento(titulo, descricao, data, horario, tipo, telefone, livre, link, false)
        evento.fotos = []
        const endereco = new Endereco(local, estado, cidade, bairro, numero);

        evento.endereco = endereco;
        evento.empresario = empresario;

        let eventoDb = await this.repositorio.save(evento);

        for (const tempFoto of fotos) {
            let foto = new Foto(tempFoto.foto, evento);
            await this.fotoRepositorio.save(foto);
        }

        await ValidarFormulario.evento(evento);

        return await this.repositorio.findOne({ where: { id: eventoDb.id }, relations: ["fotos", "endereco"] })
    }

    async anunciar (id: number) {
        const evento = await this.repositorio.findOne({where : {id : id}})

        if (!evento) {
            throw new Error("Evento não encontrado.")
        }

        evento.isAnunciado = true;

        await this.repositorio.save(evento)
        
        return "Evento anunciado com sucesso!";
    }

    async editar({ id, titulo, descricao, data, horario, tipo, telefone, livre, link, fotos, local, estado, cidade, bairro, numero }: EditarEventoRequest) {
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

        evento.endereco.local = local ? local : evento.endereco.local
        evento.endereco.estado = estado ? estado : evento.endereco.estado
        evento.endereco.cidade = cidade ? cidade : evento.endereco.cidade
        evento.endereco.bairro = bairro ? bairro : evento.endereco.bairro
        evento.endereco.numero = numero ? numero : evento.endereco.numero
        evento.empresario = evento.empresario;

        let eventodps = await this.repositorio.save(evento);

        for (const foto of evento.fotos) {
            await this.fotoRepositorio.remove(foto);
        }

        for (const tempFoto of fotos) {
            let foto = new Foto(tempFoto.foto, evento);
            await this.fotoRepositorio.save(foto);
        }

        await ValidarFormulario.evento(evento);

        return await this.repositorio.findOne({ where: { id: eventodps.id }, relations: ["fotos", "endereco"] });
    }

    async apagar(id: number) {

        let evento = await this.visualizar(id);
        if(!evento) {
            return new Error("Evento não encontrado.");
        }

        await this.repositorio.delete(id);

        await this.endRepositorio.delete(evento.endereco.id)

        return "Evento deletado com sucesso."
    }
}