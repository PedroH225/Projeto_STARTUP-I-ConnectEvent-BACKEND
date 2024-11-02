
import { AppDataSource } from '../bd';
import { Evento } from '../entidades/Evento';
import { Foto } from '../entidades/Foto';
import path from 'path';
import fs from 'fs';
import { In } from 'typeorm';

export class FotoServico {

    private fotoRepository;
    private eventoRepository;
    
    constructor () {
        this.fotoRepository = AppDataSource.getRepository(Foto)
        this.eventoRepository = AppDataSource.getRepository(Evento)
    }

    async visualizarFotoEvento(eventoId : number) {
      const fotos = await this.fotoRepository.find({ where : { evento: { id : eventoId }}})

      if (!fotos) {
        throw new Error("Nenhuma foto encontrada para o evento.")
      }

      return fotos;
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

  async removerFotos(fotosIds : number[]) {
    const fotos = await this.fotoRepository.find({ where: { id : In(fotosIds)}, relations:['evento']})
    
    
    for (const foto of fotos) {
      await this.fotoRepository.delete( { id : foto.id});
        // Remove o arquivo do sistema de arquivos
        const caminhoArquivo = path.join(__dirname, '..', 'uploads', foto.caminho); // Ajustado para o diretório correto
        
        try {
            

            

        } catch (err) {
            console.error(`Erro ao remover o arquivo: ${caminhoArquivo}`, err);
        }
    } 

}

  async deletarFoto(id : number) {
    const foto = await this.fotoRepository.findOne({ where : { id : id}})
    

    if (foto) {
      await this.fotoRepository.delete(id)

      const caminhoArquivo = path.join(__dirname, '..', 'uploads', foto.caminho); // Ajustado para o diretório correto

      await fs.promises.unlink(caminhoArquivo);
    }
    return "Foto removida";
  }

  async obterFotosPorEvento(eventoId: number) {
    return await this.fotoRepository.find({ where: { evento: { id: eventoId } } });
  }
}
