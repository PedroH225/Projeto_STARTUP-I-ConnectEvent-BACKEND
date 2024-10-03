import { Pessoa } from "./Pessoa";

export class Usuario extends Pessoa {

    idade: number;

    genero: string;

    estado: string;
    
    cidade: string;

    constructor(id: number, email: string, senha: string, nome: string, idade: number, genero: string, estado: string, cidade: string) { 
        super();
        this.id = id;
        this.email = email;
        this.senha = senha;
        this.nome = nome;
        this.idade = idade;
        this.genero = genero;
        this.estado = estado;
        this.cidade = cidade;
    }
}