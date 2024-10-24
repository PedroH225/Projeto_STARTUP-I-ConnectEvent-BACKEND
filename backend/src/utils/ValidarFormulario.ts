import { Not } from "typeorm";
import { AppDataSource } from "../bd";
import { Empresario } from "../entidades/Empresario";
import { FormErro } from "../entidades/FormErro";
import { Usuario } from "../entidades/Usuario";
import { Evento } from "../entidades/Evento";

export class ValidarFormulario {
    static async empresario (empresario : Empresario) {
        const repository = AppDataSource.getRepository(Empresario)
        const erros : FormErro[] = []

        // Verificação se o empresário já existe
        const whereCondition = empresario.id ? 
            { email: empresario.email, id: Not(empresario.id) } : 
            { email: empresario.email };
        
        const emailExistente = await repository.findOne({ where: whereCondition });
        

        if (empresario.nome.trim() === "") {
            erros.push(new FormErro("nome", "Campo obrigatório."));
        }

        if (empresario.email.trim() === "") {
            erros.push(new FormErro("email", "Campo obrigatório"))
        }
        
        if (empresario.senha.trim() === "") {
            erros.push(new FormErro("senha", "Campo obrigatório"))
        }
        
        if (erros.length > 0) {
            throw erros;
        }
            
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(empresario.email)) {
            erros.push(new FormErro("email", "Endereço de email inválido. Utilize o formato: 'exemplo@gmail.com'."));
        }

        if (emailExistente) {
            erros.push(new FormErro("email", "Endereço de email já cadastrado."))
        }

        const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!senhaRegex.test(empresario.senha)) {
            erros.push(new FormErro("senha", "A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, um número e um caractere especial."));
        }

        if(erros.length != 0) {
        throw erros;
        }
}

    static async usuario(usuario: Usuario) {
    const repository = AppDataSource.getRepository(Usuario); // Certifique-se de que a classe está correta
    const erros: FormErro[] = [];

    // Verificação se o usuário já existe
    const whereCondition = usuario.id ?
        { email: usuario.email, id: Not(usuario.id) } :
        { email: usuario.email };
    
    const emailExistente = await repository.findOne({ where: whereCondition });

    if (usuario.nome.trim() === "") {
        erros.push(new FormErro("nome", "Campo obrigatório."));
    }

    if (usuario.email.trim() === "") {
        erros.push(new FormErro("email", "Campo obrigatório"));
    }
    
    if (usuario.senha.trim() === "") {
        erros.push(new FormErro("senha", "Campo obrigatório"));
    }
    
    if (erros.length > 0) {
        throw erros;
    }
        
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(usuario.email)) {
        erros.push(new FormErro("email", "Endereço de email inválido. Utilize o formato: 'exemplo@gmail.com'."));
    }

    if (emailExistente) {
        erros.push(new FormErro("email", "Endereço de email já cadastrado."));
    }

    const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!senhaRegex.test(usuario.senha)) {
        erros.push(new FormErro("senha", "A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, um número e um caractere especial."));
    }

    if (erros.length != 0) {
        throw erros;
    }
}

    static async evento(evento : Evento) {
        const erros : FormErro[] = [];


        if(evento.titulo.trim() === "") {
            erros.push(new FormErro("titulo", "Campo obrigatório."))
        }

        if(evento.descricao.trim() === "") {
            erros.push(new FormErro("descricao", "Campo obrigatório."))
        }

        if(evento.link.trim() === "") {
            erros.push(new FormErro("link", "Campo obrigatório."))
        }

        if(evento.telefone.trim() === "") {
            erros.push(new FormErro("telefone", "Campo obrigatório."))
        }

        if (erros.length > 0) {
            throw erros;
        }

        const regexTelefoneFixo = /^\(\d{2}\) \d{4}-\d{4}$/;
        const regexCelular = /^\(\d{2}\) 9\d{4}-\d{4}$/;
        const regexLink = /^(https?:\/\/)?(www\.)?([\w-]+(\.[\w-]+)+(\.(com|org|net|br|info|edu|co\.br|gov|com\.br)))?(\/[\w-.,@?^=%&:\/~+#]*)?$/;


        if (!regexTelefoneFixo.test(evento.telefone) && !regexCelular.test(evento.telefone)) {
            erros.push(new FormErro("telefone", "Número de telefone inválido. Use um formato de telefone fixo ou celular válido."));
        }

        if (!regexLink.test(evento.link)) {
            erros.push(new FormErro("link", "Link inválido. Exemplo: 'www.exemplo.com'"));
        }

        if (erros.length > 0) {
            throw erros;
        }

    }
}