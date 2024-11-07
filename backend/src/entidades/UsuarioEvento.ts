import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('usuario_evento')
export class UsuarioEvento {

    @PrimaryColumn( { name: "usuario_id"})
    usuarioId: number;

    @PrimaryColumn({ name : "evento_id"})
    eventoId: number;

    @Column('date')
    data: Date;

    constructor(usuarioId: number, eventoId: number, data: Date) {
        this.usuarioId = usuarioId;
        this.eventoId = eventoId;
        this.data = data;
    }
}
