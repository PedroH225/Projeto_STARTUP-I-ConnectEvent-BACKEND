import { AppDataSource } from "../bd";
import { Evento } from "../entidades/Evento";
import { Feedback } from "../entidades/Feedback";
import { Usuario } from "../entidades/Usuario";

type AdicionarFeedbackRequest = {
    usuarioId : number,
    eventoId : number,
    comentario : string,
    nota : number
}

export class FeedbackServico {
    private repositorio;
    private usuarioRepositorio;
    private eventoRepositorio;

    constructor() {
        this.repositorio = AppDataSource.getRepository(Feedback)
        this.usuarioRepositorio = AppDataSource.getRepository(Usuario)
        this.eventoRepositorio = AppDataSource.getRepository(Evento)
    }

    async visualizarTodos() {
        const feedbacks = await this.repositorio.find();

        return feedbacks.map(feedback => feedback.toJson());    }

    async adicionarFeedback({ usuarioId, eventoId, comentario, nota} : AdicionarFeedbackRequest) {
        const usuario = await this.usuarioRepositorio.findOne({ where : { id : usuarioId }})

        if (!usuario) {
            throw new Error("Usuário não encontrado")
        }

        const evento = await this.eventoRepositorio.findOne({ where : { id : eventoId }})

        if (!evento) {
            throw new Error("Evento não encontrado")
        }

        const feedback = new Feedback(usuario, evento, comentario, nota);
        try {
            await this.repositorio.save(feedback)
            
            return "Feedback publicado com sucesso!"

        } catch (error) {
            throw error;
        }

    }
}