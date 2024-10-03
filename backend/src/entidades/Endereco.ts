export class Endereco {

    id: number;

    local: string;
    
    estado: string;

    cidade: string;

    bairro: string;

    numero: number;

    constructor(id: number, local: string, estado: string, cidade: string, bairro: string, numero: number) {
        this.id = id;
        this.local = local
        this.estado = estado;
        this.cidade = cidade;
        this.bairro = bairro;
        this.numero = numero;
    }
}