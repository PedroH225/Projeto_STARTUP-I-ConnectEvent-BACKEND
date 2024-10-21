import { DataSource, Repository } from "typeorm";
import { Empresario } from "../entidades/Empresario";
import { AppDataSource } from "../bd";
import { FormErro } from "../entidades/FormErro";

export class ValidarFormulario {
    static empresario (empresario : Empresario) {
        const repository = AppDataSource.getRepository(Empresario)
        const erros : FormErro[] = []
        
        const splitArroba = empresario.email.split("@");
        const splitPonto = empresario.email.split(".")
        if (splitArroba.length != 2 || splitPonto.length != 2) {
            erros.push(new FormErro("email", "Endereço de email inválido. Utilize o formato: 'exemplo@gmail.com'."))
        }

        if (empresario.senha.length < 12) {
            erros.push(new FormErro("senha", "A senha deve conter no mínimo 12 dígitos."))
        }
        
        

        if(erros.length != 0) {
        throw erros;
        }
    }
}