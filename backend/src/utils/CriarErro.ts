export enum CodigoErro {
    EMAIL_EM_USO = 'EMAIL_EM_USO',
    USUARIO_NAO_ENCONTRADO = 'USUARIO_NAO_ENCONTRADO',
    SENHA_INVALIDA = 'SENHA_INVALIDA',
    AUTO_ADICAO = 'AUTO_ADICAO',
    USUARIO_JA_ADD = "USUARIO_JA_ADD"
}

export class ErroPersonalizado {
    constructor(
        public mensagem: string,
        public status: number,
        public codigo: CodigoErro,
        public campo: string | null = null
    ) {}
}

export function criarErro(mensagem : string = 'Erro desconhecido.', status : number, codigo : CodigoErro, campo ?: string) : ErroPersonalizado {

    return {
        mensagem : mensagem,
        status : status,
        codigo : codigo,
        campo : campo || null
    }
}