import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./Usuario";

@Entity("notificacao")
export class Notificacao {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titulo: string;

    @Column()
    descricao: string;

    @Column()
    link: string;

    @CreateDateColumn()
    data: Date;

    @ManyToMany(() => Usuario, usuario => usuario.notificacoes)
    @JoinTable({
        name:"notificacao_usuario",
        joinColumn: {
            name:"notificacao_id",
            referencedColumnName:"id"
        },
        inverseJoinColumn: {
            name:"usuario_id",
            referencedColumnName:"id"
        },  
    })
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