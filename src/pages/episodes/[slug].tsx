import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { api } from '../../services/api';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';


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
    return{
        paths: [],
        fallback: 'blocking'
    }
}


export default function Episode({ episode }: EpisodeProps){
    //Todo método que inicia com "use" é um reactHook e só pode ser utilizado dentro de componentes
    // Não funcionará dentro do getStaticProps
    const router = useRouter(); 

    return(
        <h1>{episode.title}</h1>
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
