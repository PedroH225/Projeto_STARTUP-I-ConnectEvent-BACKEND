import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity("amigos")
export class PedidoAmizade {
  @Column({name : "id" })
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({name : "user_id_1" })
  userIdSender: number;

  @Column({name : "user_id_2" })
  userIdReceiver: number;

  @Column({name : "status" })
  status: string;

  constructor(userIdSender: number, userIdReceiver: number, status: string = 'pendente') {
    this.userIdSender = userIdSender;
    this.userIdReceiver = userIdReceiver;
    this.status = status;
  }
}
