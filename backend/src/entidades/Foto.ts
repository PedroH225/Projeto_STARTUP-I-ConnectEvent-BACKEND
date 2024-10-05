import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Evento } from "./Evento";

@Entity("foto")
export class Foto {
    
    @PrimaryColumn()
    id: number;

    @Column()
    foto: string;

    @ManyToOne(() => Evento, (evento) => evento.fotos)
    @JoinColumn({name: "evento_id"})
    evento: Evento;

    constructor(id: number, foto: string, evento: Evento) {
        this.id = id;
        this.foto = foto;
        this.evento = evento;
    }
}