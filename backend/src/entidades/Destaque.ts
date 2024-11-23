import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity('destaque')
export class Destaque {
    
    @PrimaryColumn()
    eventoId : number;

    constructor( eventoId : number) {
        this.eventoId = eventoId;
    }
}