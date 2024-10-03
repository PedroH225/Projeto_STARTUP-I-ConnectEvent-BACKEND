import { Endereco } from "./Endereco";
import { Foto } from "./Foto";

export class Evento {

    id: number;

    titulo: string;

    descricao: string;

    data: Date;

    horario: string;

    tipo: string;

    telefone: string;

    livre: boolean;

    link: string;

    fotos: Foto[];
    
    endereco: Endereco;


    constructor(
        id: number,
        titulo: string,
        descricao: string,
        data: Date,
        horario: string,
        tipo: string,
        fotos: Foto[],
        telefone: string,
        livre: boolean,
        link: string,
        endereco: Endereco
    ) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.data = data;
        this.horario = horario;
        this.tipo = tipo;
        this.fotos = fotos;
        this.telefone = telefone;
        this.livre = livre;
        this.link = link;
        this.endereco = endereco;
    }
}