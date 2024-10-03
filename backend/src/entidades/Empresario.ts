import { Pessoa } from "./Pessoa";

export class Empresario extends Pessoa {

    constructor(id: number, email: string, senha: string, nome: string) {
        super();
        this.id = id;
        this.email = email;
        this.senha = senha;
        this.nome = nome;
    }
}