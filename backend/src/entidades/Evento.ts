import { Empresario } from "./Empresario";
import { Endereco } from "./Endereco";
import { Foto } from "./Foto";
import { Usuario } from "./Usuario";

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

    empresario: Empresario;

    participantes: Usuario[]

    constructor(
        id: number, titulo: string, descricao: string, data: Date,
        horario: string, tipo: string, telefone: string, livre: boolean, 
        link: string, fotos: Foto[], endereco: Endereco, empresario: Empresario,
        participantes: Usuario[]
    ) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.data = data;
        this.horario = horario;
        this.tipo = tipo;
        this.telefone = telefone;
        this.livre = livre;
        this.link = link;
        this.fotos = fotos;
        this.endereco = endereco;
        this.empresario = empresario;
        this.participantes = participantes;
    }
}