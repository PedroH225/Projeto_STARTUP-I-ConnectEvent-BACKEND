import { AppDataSource } from "../bd";
import { Empresario } from "../entidades/Empresario";
import jwt from 'jsonwebtoken';
import { ValidarFormulario } from "../utils/ValidarFormulario";
import { Evento } from "../entidades/Evento";
import { LessThan } from "typeorm";

type EmpresarioRequest = {
    email: string, senha: string, nome: string;
}

type UpdateEmpresarioRequest = {
    id: number; email: string, senha: string, nome: string;
}

type LoginRequest = {
    email: string; senha: string;
}

export class EmpresarioServico {

    private repository;
    private eventoRepository;

    constructor() {
        this.repository = AppDataSource.getRepository(Empresario);
        this.eventoRepository = AppDataSource.getRepository(Evento);
    }

    async visualizarTodos() {
        const empresarios = await this.repository.find();
        return empresarios;
    }

    async visualizar(id: number) {
        const empresario = await this.repository.findOne({ where: { id: id } });

        return empresario;
    }

    async visualizarEventosOcorridos(id: number) {
        const eventos = await this.eventoRepository.find({where: {empresario: {id : id}, data: LessThan(new Date()) }})

        return eventos;
    }

    async criar({ email, senha, nome }: EmpresarioRequest) {

        const empresario = await this.repository.create({ email, senha, nome });

        await ValidarFormulario.empresario(empresario)

        await this.repository.save(empresario);

        return empresario;
    }

    async editar({ id, email, senha, nome }: UpdateEmpresarioRequest) {
        const empresario = await this.repository.findOne({ where: { id: id } });

        if (!empresario) {
            return new Error("O empresário não existe!")
        }


        empresario.email = email ? email : empresario.email;
        empresario.senha = senha ? senha : empresario.senha;
        empresario.nome = nome ? nome : empresario.nome;

        await ValidarFormulario.empresario(empresario)

        await this.repository.save(empresario);

        return empresario;
    }

    async apagar(id: number) {

        await this.repository.delete(id);

        return "Empresário apagado com sucesso.";
    }

    async validar({ email, senha }: LoginRequest) {
        const empresario = await this.repository.findOne({ where: { email : email, senha : senha } })

        if (empresario) {

            const token = jwt.sign({ id: empresario.id }, process.env.JWT_SECRET as string, {
                expiresIn: '1h' // Token expira em 1 hora
            });

            return token;
        } else {
            throw new Error("Usuário ou senha incorretos")
        }
    }
}