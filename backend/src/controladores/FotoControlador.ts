import { Request, Response } from 'express';
import { FotoServico } from '../servicos/FotoServico';
import upload from '../utils/uploadLocal';


export class FotoControlador {
private fotoServico : FotoServico;

constructor (){
    this.fotoServico = new FotoServico()
}

// Controlador para upload de fotos
async uploadFotos (req: Request, res: Response) : Promise<any> {
  // Se não houver fotos, retorne um erro
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'Nenhuma foto enviada.' });
  }

  const fotos = req.files as Express.Multer.File[];
  const eventoId = parseInt(req.params.id); // Supondo que você passe o ID do evento pela URL

  this.fotoServico.salvarFotos(fotos, eventoId)
    .then(fotosSalvas => {
      res.status(201).json({
        message: 'Fotos enviadas com sucesso!',
        fotos: fotosSalvas
      });
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
}

async getFotosPorEvento(req: Request, res: Response): Promise<any> {
    const eventoId = parseInt(req.params.id);

    if (isNaN(eventoId)) {
        return res.status(400).json({ message: 'ID do evento inválido.' });
    }

    try {
        const fotos = await this.fotoServico.obterFotosPorEvento(eventoId);
        if (!fotos || fotos.length === 0) {
            return res.status(404).json({ message: 'Nenhuma foto encontrada para este evento.' });
        }
        // Retorne apenas os nomes das fotos
        res.status(200).json(fotos.map(foto => ({ foto: foto.caminho }))); // Ajuste se necessário
    } catch (err: Error | any) {
        res.status(500).json({ message: err.message });
    }
}
}