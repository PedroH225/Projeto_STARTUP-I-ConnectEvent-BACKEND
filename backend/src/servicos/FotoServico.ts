
import { AppDataSource } from '../bd';
import { Evento } from '../entidades/Evento';
import { Foto } from '../entidades/Foto';
import path from 'path';
import fs from 'fs';

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

  async removerFotos(fotos: Foto[]) {
    for (const foto of fotos) {
        // Remove a foto do banco de dados
        await this.fotoRepository.remove(foto);
        
        // Remove o arquivo do sistema de arquivos
        const caminhoArquivo = path.join(__dirname, '..', '..', 'upload', foto.caminho); // Ajustado para o diretório correto
        try {
            await fs.promises.unlink(caminhoArquivo);
            console.log(`Arquivo removido: ${caminhoArquivo}`);
        } catch (err) {
            console.error(`Erro ao remover o arquivo: ${caminhoArquivo}`, err);
        }
    }
}

  async obterFotosPorEvento(eventoId: number) {
    return await this.fotoRepository.find({ where: { evento: { id: eventoId } } });
  }
}
