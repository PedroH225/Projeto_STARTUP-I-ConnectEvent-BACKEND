import { AppDataSource } from "../bd";
import { Empresario } from "../entidades/Empresario";
import { Endereco } from "../entidades/Endereco";
import { Evento } from "../entidades/Evento";
import { Foto } from "../entidades/Foto";

    type EventoRequest = {
        titulo: string, descricao: string, data: Date, horario: string, tipo: string, telefone: string, livre: boolean, 
        link: string, fotos : any[], local: string, estado: string, cidade: string, bairro: string, numero: number, empresario: Empresario 
    }
    
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

    async criar ({ titulo, descricao, data, horario, tipo, telefone, livre, link, fotos, local, estado, cidade, bairro, numero, empresario}: EventoRequest) {
        let arrayFotos: Foto[] = [];

        let evento = new Evento(titulo, descricao, data, horario, tipo, telefone, livre, link)
        evento.fotos = []
        const endereco = new Endereco(local, estado, cidade, bairro, numero);

        fotos.forEach(tempFoto => {
            let foto = new Foto(tempFoto.foto, evento);

            evento.fotos.push(foto)
        });

        evento.endereco = endereco;
        evento.empresario = empresario;

        
        await this.repositorio.save(evento);

        return evento.toJSON();
    }
}