import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { Evento } from "./Evento";
import { Notificacao } from "./Notificacao";
import { Pessoa } from "./Pessoa";
import { Feedback } from "./Feedback";

@Entity("usuario")
export class Usuario extends Pessoa {

    @Column()
    idade: number;

    @Column()
    genero: string;

    @Column()
    estado: string;

    @Column()
    cidade: string;

    @Column()
    wallpaper : string;

    @ManyToMany(() => Evento, evento => evento.participantes)
    @JoinTable({
        name: "usuario_evento",
        joinColumn: {
            name: "usuario_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "evento_id",
            referencedColumnName: "id"
        }
    })
    eventos: Evento[];

    @OneToMany(() => Evento, evento => evento.organizador)
    eventosCriados: Evento[];

    @ManyToMany(() => Notificacao, notificacao => notificacao.usuarios)
    @JoinTable({
        name: "notificacao_usuario",
        joinColumn: {
            name: "usuario_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "notificacao_id",
            referencedColumnName: "id"
        }
    })
    notificacoes: Notificacao[];

    @OneToMany(() => Feedback, feedback => feedback.usuario)
    feedbacks!: Feedback[];

    constructor(
        id: number, email: string, senha: string, nome: string, 
        idade: number, genero: string, estado: string, cidade: string, wallpaper : string,
        eventos: Evento[], eventosCriados: Evento[], notificacoes: Notificacao[]
    ) { 
        super();
        this.id = id;
        this.email = email;
        this.senha = senha;
        this.nome = nome;
        this.idade = idade;
        this.genero = genero;
        this.estado = estado;
        this.cidade = cidade;
        this.wallpaper = wallpaper;
        this.eventos = eventos;
        this.eventosCriados = eventosCriados;
        this.notificacoes = notificacoes;
    }

    toJSON() {
        return {
            id: this.id,
            email: this.email,
            senha: this.senha,
            nome: this.nome,
            idade: this.idade,
            genero: this.genero,
            estado: this.estado,
            cidade: this.cidade,
            wallpaper: this.wallpaper
        };
    }
}
