// Importando GetStaticProps para poder fazer a tipagem da função getStaticProps
import { GetStaticProps } from 'next';

// Importação do next para poder otimizar as imagens
import Image from 'next/image';

// Importando pacotes para poder converter uma string em data no JS (parseISO)
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

// Importação para o uso do Axios
import { api } from '../services/api';

import { convertDurationToTimeString } from '../utils/convertDurationToTimeString';

import styles from './home.module.scss';


// Criando a tipagem das props do componente Home
type Episode = {
    id: string;
    title: string;
    thumbnail: string;
    description: string;
    members: string;
    duration: number;
    durationAsString: string;
    url: string;
    publishedAt: string;
}

type HomeProps = {
    // episodes: Array<Episode> Essa é uma forma de declarar um Array
    latestEpisodes: Episode[];
    allEpisodes: Episode[];
}

export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {
    
    return (
        <div className={styles.homepage}>
            
            <section className={styles.latestEpisodes}>
                <h2>últimos Lançamentos</h2>

                <ul>
                   {latestEpisodes.map(episode =>{
                       return(
                           <li key={episode.id}>
                               <Image 
                                width={192} 
                                height={192} 
                                src={episode.thumbnail} 
                                alt={episode.title}
                                objectFit="cover"
                               />

                               <div className={styles.episodeDetails}>
                                   <a href="">{episode.title}</a>
                                   <p>{episode.members}</p>
                                   <span>{episode.publishedAt}</span>
                                   <span>{episode.durationAsString}</span>
                               </div>
                               <button type="button"><img src="/play-green.svg" alt="Tocar episódio"/></button>
                           </li>
                       )
                   })} 
                </ul>
            </section>

            <section className={styles.allEpisodes}>
                   <h2></h2>
            </section>

        </div>
  )
}


export const getStaticProps: GetStaticProps = async () => {

    // Estamos limitando a quantidade de 12 registros a serem "puxadas"
    // Ordenados pela data de publicação e na ordem decrescente
    const { data } = await api.get('episodes', {
        params: {
            _limit: 12,
            _sort: 'published_at',
            _order: 'desc'
        }
    })

    // Aqui vamos realizar toda a formatação de dados
    // Antes de levá-los ao return da Home
    const episodes = data.map(episode => {
        return{
            id: episode.id,
            title: episode.title,
            thumbnail: episode.thumbnail,
            members: episode.members,
            publishedAt: format(parseISO(episode.published_at), 'd MMM yy', { locale: ptBR }),
            duration: Number(episode.file.duration),
            durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
            description: episode.description,
            url: episode.file.url,
        };
    })

    // Essa parte aqui deixa de existe e através de uma desestruturação, o "data", está na linha acima que tem "const"
    // const data = await response.json()


    // Declarando aqui as listas de episódios: Últimos Lançamentos e Todos os lançamentos
    const latestEpisodes = episodes.slice(0, 2);
    const allEpisodes = episodes.slice(2, episodes.length);

    return{
        props: {
            latestEpisodes,
            allEpisodes,
        },
        // Recebe um num em segundos de quanto em quanto tempo desejo gerar uma nova versão desta página
        revalidate: 60 * 60 * 8,
    }
    
}