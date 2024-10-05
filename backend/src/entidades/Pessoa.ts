import { Column } from "typeorm";
import { Acesso } from "./Acesso";

export abstract class Pessoa extends Acesso {

    @Column({ name: "nome" })
    nome !: string;

}