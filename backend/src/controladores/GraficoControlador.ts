import axios from "axios";
import { EventoServico } from "../servicos/EventoServico";
import { Request, Response } from "express";


export class GraficoControlador {
    private eventoServico: EventoServico;

    constructor() {
        this.eventoServico = new EventoServico();

    }

    async graficoPizzaGenero(req: Request, res: Response) {
        const idInt = parseInt(req.params.id);
    
        const evento = await this.eventoServico.visualizarPorId(idInt);
    
        if (evento) {
            // Verificar se há participantes
            if (evento.participantes && evento.participantes.length > 0) {
                try {
                    // Enviar a requisição para o backend Python para gerar o gráfico
                    const grafico = await axios.post(
                        "http://127.0.0.1:8000/generate-pie-chart",
                        evento.participantes,
                        { responseType: 'arraybuffer' }
                    );

                    res.set('Content-Type', 'image/png');
                    res.status(200).send(grafico.data);

                } catch (error) {

                    console.error("Erro ao gerar gráfico:", error);
                    res.status(500).send('Erro ao gerar gráfico');

                }
            } else {

                res.status(400).send('Evento não possui participantes');
            }
        } else {

            res.status(400).send('Evento não encontrado');
        }
    }
    
}