import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Evento } from "./Evento";

@Entity("foto")
export class Foto {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    foto: string;

    @ManyToOne(() => Evento, (evento) => evento.fotos)
    @JoinColumn({ name: "evento_id" })
    evento: Evento;

    constructor(foto: string, evento: Evento) {
        this.foto = foto;
        this.evento = evento

    }

    toJSON() {
        return {
            id: this.id,
            foto: this.foto
        };
    }

}