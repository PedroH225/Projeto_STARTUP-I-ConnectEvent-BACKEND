
import { AppDataSource } from '../bd';
import { Evento } from '../entidades/Evento';
import { Foto } from '../entidades/Foto';
import path from 'path';

export class FotoServico {

    private fotoRepository;
    private eventoRepository;
    
    constructor () {
        this.fotoRepository = AppDataSource.getRepository(Foto)
        this.eventoRepository = AppDataSource.getRepository(Evento)
    }

    async salvarFotos(fotos: Express.Multer.File[], eventoId: number) {
    // Verifique se o evento existe
    const evento = await this.eventoRepository.findOne({where:{id : eventoId}});
    if (!evento) {
      throw new Error('Evento não encontrado.');
    }

    // Salvar cada foto no banco de dados
    const fotosSalvas = fotos.map(foto => {
      const novaFoto = new Foto(path.basename(foto.path), evento); // Salva apenas o nome do arquivo
      return this.fotoRepository.save(novaFoto);
  });

    return Promise.all(fotosSalvas);
  }

  async obterFotosPorEvento(eventoId: number) {
    return await this.fotoRepository.find({ where: { evento: { id: eventoId } } });
  }
}
