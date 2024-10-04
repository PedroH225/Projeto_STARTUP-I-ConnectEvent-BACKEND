import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Empresario } from "./Empresario";
import { Endereco } from "./Endereco";
import { Foto } from "./Foto";
import { Usuario } from "./Usuario";

@Entity("evento")
export class Evento {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titulo: string;

    @Column()
    descricao: string;

    @CreateDateColumn()
    data: Date;

    @Column()
    horario: string;

    @Column()
    tipo: string;

    @Column()
    telefone: string;

    @Column()
    livre: boolean;

    @Column()
    link: string;

    @OneToMany(() => Foto, (foto) => foto.evento)
    fotos: Foto[];

    @OneToOne(() => Endereco)
    @JoinColumn({name: "endereco_id"})
    endereco: Endereco;

    @ManyToOne(() => Empresario, (empresario) => empresario.eventos)
    empresario: Empresario;

    @ManyToMany(() => Usuario, usuario => usuario.eventos)
    @JoinTable({
        name:"usuario_evento",
        joinColumn: {
            name:"evento_id",
            referencedColumnName:"id"
        },
        inverseJoinColumn: {
            name:"usuario_id",
            referencedColumnName:"id"
        }
    })
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