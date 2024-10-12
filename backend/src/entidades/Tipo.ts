import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tipo")
export class Tipo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tipo: string;


    constructor(id: number, tipo: string) {
        this.id = id;
        this.tipo = tipo;
    }
}