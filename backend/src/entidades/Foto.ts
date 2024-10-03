import { Evento } from "./Evento";

export class Foto {
    
    id: number;

    foto: string;

    evento: Evento;

    constructor(id: number, foto: string, evento: Evento) {
        this.id = id;
        this.foto = foto;
        this.evento = evento;
    }
}