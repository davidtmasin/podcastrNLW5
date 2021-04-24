// importar as funções para formatação de data
import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

import Link from 'next/link';

import styles from './styles.module.scss';

export function  Header(){

    // Fazer com que sempre pegue a data atual
    // EEEEEE -> Mostra as primeiras letras do dia da semana, exemplo, Seg
    // d -> Mostra o número do dia
    // MMMM -> Mostra o nome inteiro do mês
    const currentDate = format(new Date(), 'EEEEEE, d MMMM',{
        locale:ptBR,
    });


    return(
        <header className={styles.headerContainer}>
            <Link href={`/`}>
                <a><img src="/logo.svg" alt="Podcastr"/></a>
            </Link>

            <p>O melhor para você ouvir sempre</p>

            <span>{currentDate}</span>
        </header>
    );
}