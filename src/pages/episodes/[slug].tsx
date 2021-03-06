// Esta é a parte da tela que traz os episódios, aquele que é clicado na página HOME

import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import Image from 'next/image';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
// import { useRouter } from 'next/router';
import { api } from '../../services/api';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';

import styles from './episode.module.scss';
import { usePlayer } from '../../contexts/PlayerContext';

// Tipando minha props -> episode
type Episode = {
    id: string;
    title: string;
    thumbnail: string;
    members: string;
    duration: number;
    durationAsString: string;
    url: string;
    publishedAt: string;
    description: string;
}

type EpisodeProps ={
    episode: Episode;
}


// Este método irá implementar a ideia de "SSG dinâmico", diferentemente da HOME que é única
// a página dos episódios trazem diversos episódios diferentes
export const getStaticPaths: GetStaticPaths = async () => {

    const { data } = await api.get('episodes', {
        params: {
            _limit: 2,
            _sort: 'published_at',
            _order: 'desc'
        }
    })

    const paths = data.map(episode => {
        return{
            params: {
                slug: episode.id
            }
        }
    })


    return{
        //O que estiver dentro de paths -> serão as páginas estáticas já preparadas
        paths,

        // client (browser)      -   next.js (node.js)     -    server (back-end)
        // Quando ocorre o true  -   Quando o ocorre o blocking

        // A ideia do fallback: 'blocking' é que as páginas sejam geradas de forma incremental, conforme for acessando
        // incremental static regeneration
        fallback: 'blocking' //Melhor opção para SEO
    }
}


export default function Episode({ episode }: EpisodeProps){

    const { play } = usePlayer();

    //Todo método que inicia com "use" é um reactHook e só pode ser utilizado dentro de componentes
    // Não funcionará dentro do getStaticProps

    // const router = useRouter(); 

    // Como estaremos utilizando o fallback: 'blocking', não será usado

    // if(router.isFallback){
    //     return <p>Carregando...</p>
    // }

    return(
        <div className={styles.episode}>
            <div className={styles.thumbnailContainer}>
                <Link href="/">
                    <button type="button" title="Voltar">
                        <img src="/arrow-left.svg" alt="Voltar" />
                    </button>
                </Link>
                <Image 
                    width={700} 
                    height={160} 
                    src={episode.thumbnail}
                    title={episode.title}
                    objectFit="cover"
                 />

                 <button type="button" title="Tocar episódio" onClick={() => play(episode)}>
                     <img src="/play.svg" alt="Tocar episódio" />
                 </button>
            </div>

            <header>
                <h1>{episode.title}</h1>
                <span>{episode.members}</span>
                <span>{episode.publishedAt}</span>
                <span>{episode.durationAsString}</span>
            </header>

            {/* O React não converte o texto em HTML, por segurança, pois pode haver algo que não queremos que seja exibido em tela */}
            {/* <div className={styles.description}>
                {episode.description}
            </div> */}

            {/*     Para forçar a escrita do HTML em tela, a div será escrita da seguinte forma.
            Lembrando que é algo perigoso, principalmente, se você não souber de onde teus dados estão vindo. */}
                <div className={styles.description} dangerouslySetInnerHTML={{ __html: episode.description }} />
        </div>
    )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    const { slug } = ctx.params ;
    
    const { data } = await api.get(`/episodes/${slug}`)
    
    const episode = {
        
        id: data.id,
        title: data.title,
        thumbnail: data.thumbnail,
        members: data.members,
        publishedAt: format(parseISO(data.published_at), 'd MMM yy', { locale: ptBR }),
        duration: Number(data.file.duration),
        durationAsString: convertDurationToTimeString(Number(data.file.duration)),
        description: data.description,
        url: data.file.url,
        
    };

    return {
        props: {
            episode,
        },        
        revalidate: 60 * 60 * 24,  //Revalida a cada 24h
    }
}
