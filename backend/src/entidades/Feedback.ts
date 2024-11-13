import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, Unique } from 'typeorm';
import { Usuario } from './Usuario';  // Supondo que você tenha a classe Usuario
import { Evento } from './Evento';    // Supondo que você tenha a classe Evento

@Entity()
@Unique(['usuario', 'evento'])  // Garante que um usuário só possa dar um feedback por evento
export class Feedback {

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Usuario, usuario => usuario.feedbacks, { eager: true })
    @JoinColumn({ name: 'usuario_id' })
    usuario!: Usuario;

    @ManyToOne(() => Evento, evento => evento.feedbacks, { eager: true })
    @JoinColumn({ name: 'evento_id' })
    evento!: Evento;

    @Column()
    comentario!: string;

    @Column()
    nota!: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    data!: Date;
}
