import { Entity, OneToMany } from "typeorm";
import { Evento } from "./Evento";
import { Pessoa } from "./Pessoa";

@Entity("empresario")
export class Empresario extends Pessoa {

    @OneToMany(() => Evento, (evento) => evento.empresario)
    eventos: Evento[];

    constructor(id: number, email: string, senha: string, nome: string, eventos: Evento[]) {
        super();
        this.id = id;
        this.email = email;
        this.senha = senha;
        this.nome = nome;
        this.eventos = eventos;
    }
}