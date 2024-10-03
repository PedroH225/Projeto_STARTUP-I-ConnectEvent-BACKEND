import { Evento } from "./Evento";
import { Notificacao } from "./Notificacao";
import { Pessoa } from "./Pessoa";

export class Usuario extends Pessoa {

    idade: number;

    genero: string;

    estado: string;

    cidade: string;

    eventos: Evento[];

    notificacoes: Notificacao[];

    constructor(
        id: number, email: string, senha: string, nome: string, 
        idade: number, genero: string, estado: string, cidade: string,
        eventos: Evento[], notificacoes: Notificacao[]
    ) { 
        super();
        this.id = id;
        this.email = email;
        this.senha = senha;
        this.nome = nome;
        this.idade = idade;
        this.genero = genero;
        this.estado = estado;
        this.cidade = cidade
        this.eventos = eventos;
        this.notificacoes = notificacoes;
    }
}