import { Usuario } from "./Usuario";

export class Notificacao {
    
    id: number;

    titulo: string;

    descricao: string;

    link: string;

    data: Date;

    usuarios: Usuario[]

    constructor(id: number, titulo: string, descricao: string, link: string, data: Date, usuarios: Usuario[]) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.link = link;
        this.data = data;
        this.usuarios = usuarios;
    }
}