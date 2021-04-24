export function convertDurationToTimeString(duration: number){

    // Converte aqui a duração que está em segundos para horas
    const hours = Math.floor(duration / 3600);
    
    // Pegamos os segundos que sobraram na conta acima (resto da divisão) dividindo-os por 60 -> minutos
    const minutes = Math.floor((duration % 3600) / 60);

    const seconds = duration % 60;

    // Aqui, juntará o resultado da const acima, acrescentando um zero à esquerda se for preciso
    // Juntando cada valor com o separador ":"
    const TimeString = [hours, minutes, seconds]
    .map(unit => String(unit)
    .padStart(2, '0')).join(':')

    return TimeString;
}