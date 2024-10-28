import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Empresario } from "./Empresario";
import { Endereco } from "./Endereco";
import { Foto } from "./Foto";
import { Usuario } from "./Usuario";

@Entity("evento")
export class Evento {

    @PrimaryGeneratedColumn()
    id!: number;

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

    @Column({name: "is_anunciado"})
    isAnunciado : boolean

    @OneToMany(() => Foto, (foto) => foto.evento, { cascade: true })
    fotos!: Foto[];

    @OneToOne(() => Endereco, { cascade: true })
    @JoinColumn({ name: "endereco_id" })
    endereco!: Endereco;

    @ManyToOne(() => Empresario, (empresario) => empresario.eventos)
    @JoinColumn({ name: "empresario_id" })
    empresario!: Empresario;

    @ManyToMany(() => Usuario, usuario => usuario.eventos)
    @JoinTable({
        name: "usuario_evento",
        joinColumn: {
            name: "evento_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "usuario_id",
            referencedColumnName: "id"
        }
    })
    participantes!: Usuario[]

    constructor(
        titulo: string, descricao: string, data: Date,
        horario: string, tipo: string, telefone: string, livre: boolean,
        link: string, isAnunciado: boolean
    ) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.data = data;
        this.horario = horario;
        this.tipo = tipo;
        this.telefone = telefone;
        this.livre = livre;
        this.link = link;
        this.isAnunciado = isAnunciado
    }

    toJSON() {
        return {
            id: this.id,
            titulo: this.titulo,
            descricao: this.descricao,
            data: this.data,
            horario: this.horario,
            tipo: this.tipo,
            telefone: this.telefone,
            livre: this.livre,
            link: this.link,
            fotos: this.fotos || [],
            endereco: this.endereco ? this.endereco.toJSON() : null,
            empresario: this.empresario ? this.empresario.toJSON() : null,
            participantes: this.participantes ? this.participantes.map(participante => participante.toJSON()) : [] // Verificação adicionada
        };
    }
}