import { Column, PrimaryGeneratedColumn } from "typeorm";

export abstract class Acesso {

    @PrimaryGeneratedColumn({ name: "id" })
    id !: number;

    @Column({ name: "email" })
    email !: string;

    @Column({ name: "senha" })
    senha !: string;

}