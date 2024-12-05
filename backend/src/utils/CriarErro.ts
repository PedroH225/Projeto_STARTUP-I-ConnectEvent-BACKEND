enum CodigoErro {
    EMAIL_EM_USO = 'EMAIL_EM_USO',
    USUARIO_NAO_ENCONTRADO = 'USUARIO_NAO_ENCONTRADO',
    SENHA_INVALIDA = 'SENHA_INVALIDA'
}

interface ErroPersonalizado {
    mensagem: string;
    status: number;
    codigo: CodigoErro;
    campo: string | null;
}

export function criarErro(mensagem : string, status : number, codigo : CodigoErro, campo ?: string) : ErroPersonalizado {

    return {
        mensagem : mensagem,
        status : status,
        codigo : codigo,
        campo : campo || null
    }
}