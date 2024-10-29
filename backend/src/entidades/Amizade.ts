import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class PedidoAmizade {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userIdSender: number;

  @Column()
  userIdReceiver: number;

  @Column()
  status: string;

  constructor(userIdSender: number, userIdReceiver: number, status: string = 'pendente') {
    this.userIdSender = userIdSender;
    this.userIdReceiver = userIdReceiver;
    this.status = status;
  }
}
