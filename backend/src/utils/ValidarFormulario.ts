import { Not } from "typeorm";
import { AppDataSource } from "../bd";
import { FormErro } from "../entidades/FormErro";
import { Usuario } from "../entidades/Usuario";
import { Evento } from "../entidades/Evento";

export class ValidarFormulario {
    static async usuario(usuario: Usuario) {
        const repository = AppDataSource.getRepository(Usuario);
        const erros: FormErro[] = [];

        // Verificação se o usuário já existe
        const whereCondition = usuario.id ? 
            { email: usuario.email, id: Not(usuario.id) } : 
            { email: usuario.email };
        
        const emailExistente = await repository.findOne({ where: whereCondition });

        if (usuario.nome.trim() === "") {
            erros.push(new FormErro("nomeErro", "Campo obrigatório."));
        }

        if (usuario.email.trim() === "") {
            erros.push(new FormErro("emailErro", "Campo obrigatório."));
        }
        
        if (usuario.senha.trim() === "") {
            erros.push(new FormErro("senhaErro", "Campo obrigatório."));
        }

        if (usuario.idade == null) {
            erros.push(new FormErro("idadeErro", "Campo obrigatório."));
        }

        if (erros.length > 0) {
            throw erros;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(usuario.email)) {
            erros.push(new FormErro("emailErro", "Endereço de email inválido. Utilize o formato: 'exemplo@gmail.com'.")); 
        }

        if (emailExistente) {
            erros.push(new FormErro("emailErro", "Endereço de email já cadastrado."));
        }

            const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!senhaRegex.test(usuario.senha)) {
            erros.push(new FormErro("senhaErro", "A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, um número e um caractere especial."));

        }

        if (usuario.idade <= 0) {
            erros.push(new FormErro("idadeErro", "A idade deve ser maior que zero!"));

        }

        if (erros.length > 0) {
            throw erros;
        }
    }

    static async usuarioEdit(usuario: Usuario) {
        const repository = AppDataSource.getRepository(Usuario);
        const erros: FormErro[] = [];

        // Verificação se o usuário já existe
        const whereCondition = usuario.id ? 
            { email: usuario.email, id: Not(usuario.id) } : 
            { email: usuario.email };
        
        const emailExistente = await repository.findOne({ where: whereCondition });

        if (usuario.nome.trim() === "") {
            erros.push(new FormErro("nomeErro", "Campo obrigatório."));
        }

        if (usuario.email.trim() === "") {
            erros.push(new FormErro("emailErro", "Campo obrigatório."));
        }

        if (usuario.idade == null) {
            erros.push(new FormErro("idadeErro", "Campo obrigatório."));
        }

        if (erros.length > 0) {
            throw erros;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(usuario.email)) {
            erros.push(new FormErro("emailErro", "Endereço de email inválido. Utilize o formato: 'exemplo@gmail.com'.")); 
        }

        if (emailExistente) {
            erros.push(new FormErro("emailErro", "Endereço de email já cadastrado."));
        }

        if (usuario.idade <= 0) {
            erros.push(new FormErro("idadeErro", "A idade deve ser maior que zero!"));

        }

        if (erros.length > 0) {
            throw erros;
        }
    }
    
    static async evento(evento: Evento) {
        const erros: FormErro[] = [];

        if (evento.titulo.trim() === "") {
            erros.push(new FormErro("tituloErro", "Campo obrigatório."));
        }

        if (evento.descricao.trim() === "") {
            erros.push(new FormErro("descricaoErro", "Campo obrigatório."));
        }

        if (evento.link.trim() === "") {
            erros.push(new FormErro("linkErro", "Campo obrigatório."));
        }

        if (evento.telefone.trim() === "") {
            erros.push(new FormErro("telefoneErro", "Campo obrigatório."));
        }

        if (evento.endereco.local.trim() === "") {
            erros.push(new FormErro("localErro", "Campo obrigatório."));
        }

        if (evento.endereco.bairro.trim() === "") {
            erros.push(new FormErro("bairroErro", "Campo obrigatório."));
        }

        if (evento.endereco.cidade.trim() === "") {
            erros.push(new FormErro("cidadeErro", "Campo obrigatório."));
        }

        if (erros.length > 0) {
            throw erros;
        }

        const regexTelefoneFixo = /^\(\d{2}\) \d{4}-\d{4}$/;
        const regexCelular = /^\(\d{2}\) 9\d{4}-\d{4}$/;
        const regexLink = /^(https?:\/\/)?(www\.)?([\w-]+(\.[\w-]+)+(\.(com|org|net|br|info|edu|co\.br|gov|com\.br)))?(\/[\w-.,@?^=%&:\/~+#]*)?$/;

        if (!regexTelefoneFixo.test(evento.telefone) && !regexCelular.test(evento.telefone)) {
            erros.push(new FormErro("telefoneErro", "Número de telefone inválido. Use um formato de telefone fixo ou celular válido."));
        }

        if (!regexLink.test(evento.link)) {
            erros.push(new FormErro("linkErro", "Link inválido. Exemplo: 'www.exemplo.com'"));
        }

        if (erros.length > 0) {
            throw erros;
        }
    }

    static async senha(usuario: Usuario, senhaAtual: string, senhaNova: string, confirmarSenha: string) {
        const erros: FormErro[] = [];
    
        if (senhaAtual.trim() === "") {
            erros.push(new FormErro("atualErro", "Campo obrigatório."));
        } else if (senhaAtual !== usuario.senha) {
            erros.push(new FormErro("atualErro", "Senha inválida."));
        }
    
        const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (senhaNova.trim() === "") {
            erros.push(new FormErro("novaErro", "Campo obrigatório."));
        } else if(!senhaRegex.test(senhaNova)) {
            erros.push(new FormErro("novaErro", "A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, um número e um caractere especial."));
        }
    
        if (confirmarSenha.trim() === "") {
            erros.push(new FormErro("confirmarErro", "Campo obrigatório."));
        } else if (senhaNova !== confirmarSenha) {
            erros.push(new FormErro("confirmarErro", "Senhas não coincidem."));
        }
    
        if (erros.length > 0) {
            throw erros;
        }
    }
    
}
