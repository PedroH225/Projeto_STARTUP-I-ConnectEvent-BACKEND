import { UsuarioServico } from "../servicos/UsuarioServico";
import { AmizadeServico } from "../servicos/AmizadeServico";

import { Request, Response } from "express";
import { Usuario } from "../entidades/Usuario";


export class AmizadeControlodor {
    private servico;
    private amizadeServico;

    constructor() {
        this.servico = new UsuarioServico();
        this.amizadeServico = new AmizadeServico();

    }

    async enviar(req: Request, res: Response) {
        const { remetenteId } = req.params;
        const remetenteIdInt = parseInt(remetenteId);
        
        const { destEmail } = req.body;

        try {

        const destinatario : Usuario | any = await this.servico.visualizarPorEmail(destEmail);

        if (destinatario) {
            await this.amizadeServico.enviar(remetenteIdInt, destinatario.id); 
            
            res.json("Pedido de amizade enviado.")
        }

        } catch (erro){
            res.json(erro)
        }
    }
    
    async aceitar() {

    }

    async excluir() {

    }
}