export class Formatador {
    static formatDate(date: Date): string {
        const day = String(date.getDate()).padStart(2, '0'); 
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

        static formatarHorario(horario: string): string {

            const [horas, minutos] = horario.split(":");
            
            return `${horas}:${minutos}`;
        }
    }
    
