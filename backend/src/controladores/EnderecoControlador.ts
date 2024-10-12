import { Request, Response } from "express";
import { EnderecoServico } from "../servicos/EnderecoServico";
import { Endereco } from "../entidades/Endereco";
import axios from "axios";

export class EnderecoControlador {

    private servico: EnderecoServico;

    constructor() {
        this.servico = new EnderecoServico();
    }

    async visualizarTodos(req: Request, res: Response) {

        const enderecos = await this.servico.visualizarTodos();

        res.json(enderecos);
    }

    async criar(req: Request, res: Response) {

        const { local, estado, cidade, bairro, numero } = req.body;

        const result = await this.servico.criar({ local, estado, cidade, bairro, numero });
        res.json(result);
    }

    async visualizarCidades(req: Request, res: Response) {
        const response = await axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/microrregioes/35032%7C35046%7C35061/municipios")
        const nomesCidades = response.data.map((cidade: { nome: string }) => cidade.nome);
        
        res.json(nomesCidades);
    }

    async editar(req: Request, res: Response) {
        const { id } = req.params;
        const idInt = parseInt(id);
        const { local, estado, cidade, bairro, numero } = req.body;

        const result = await this.servico.editar({ id: idInt, local, estado, cidade, bairro, numero });

        res.json(result);
    }

    async deletar(req: Request, res: Response) {
        const { id } = req.params

        await this.servico.deletar(parseInt(id));

        res.json();
    }

}