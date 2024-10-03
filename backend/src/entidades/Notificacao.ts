export class Notificacao {
    
    id: number;

    titulo: string;

    descricao: string;

    link: string;

    data: Date;

    constructor(id: number, titulo: string, descricao: string, link: string, data: Date) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.link = link;
        this.data = data;
    }
}