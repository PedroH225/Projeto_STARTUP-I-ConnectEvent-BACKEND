import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("endereco")
export class Endereco {

    @PrimaryGeneratedColumn()
    id !: number;

    @Column()
    local: string;
    
    @Column()
    estado: string;

    @Column()
    cidade: string;

    @Column()
    bairro: string;

    @Column()
    numero: number;

    constructor(local: string, estado: string, cidade: string, bairro: string, numero: number) {
        this.local = local
        this.estado = estado;
        this.cidade = cidade;
        this.bairro = bairro;
        this.numero = numero;
    }

    toJSON() {
        return {
            id: this.id,
            local: this.local,
            estado: this.estado,
            cidade: this.cidade,
            bairro: this.bairro,
            numero: this.numero
        };
    }
}