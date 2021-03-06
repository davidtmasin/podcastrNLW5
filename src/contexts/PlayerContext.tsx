import { createContext, useState, ReactNode, useContext } from 'react';


type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
};

type PlayerContextData ={
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    play: (episode: Episode) => void;
    playList: (list: Episode[], index: number) => void;
    setPlayingState: (state: boolean) => void;
    playNext: () => void;
    playPrevious: () => void;
    togglePlay: () => void;
    hasNext:boolean;
    hasPrevious:boolean;

};

export const PlayerContext = createContext({} as PlayerContextData);

// Criando uma tipagem para children
type PlayerContextProviderProps = {
    children: ReactNode;
}



// Trazendo todo o contexto do Player para dentro do PlayerContext
export function PlayContextProvider({ children }: PlayerContextProviderProps){// Pegando a propriedade interna

    // Variáveis de estado para serem utilizadas dentro do valor do PlayerContext.Provider
    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);

    const [isPlaying, setIsPlaying] = useState(false);

    // Criando uma função para manipular o valor das variáveis de estado
    function play(episode: Episode) {
        setEpisodeList([episode]);
        setCurrentEpisodeIndex(0);
        setIsPlaying(true);
    }

    // Função que carregará a listagem de episódios
    function playList(list: Episode[], index: number){
        setEpisodeList(list);
        setCurrentEpisodeIndex(index);
        setIsPlaying(true);
    }


    // Criando uma função para controlar o Play/Pause
    function togglePlay(){
        setIsPlaying(!isPlaying);
    }

    // Uma função para alterar o valor de isPlaying
    // Situação para ser usada quando usar o teclado para o Play/Pause
    function setPlayingState(state: boolean){
        setIsPlaying(state);
    }

    // Implementar uma variável para verificar se tem episódio antes ou depois
    const hasPrevious = currentEpisodeIndex > 0
    const hasNext = (currentEpisodeIndex + 1) < episodeList.length


    // Criando a função para realizar o botão Next
    function playNext(){
        const nextEpisodeIndex = currentEpisodeIndex + 1

        if(hasNext){
            setCurrentEpisodeIndex(currentEpisodeIndex + 1);
        }       
    }

    // Criando a função para realizar o botão Previous
    function playPrevious(){
        if(hasPrevious){
            setCurrentEpisodeIndex(currentEpisodeIndex - 1);
        }
    }

    return(
        <PlayerContext.Provider value={{ 
                episodeList, 
                currentEpisodeIndex, 
                play, playList, 
                isPlaying, 
                togglePlay,
                playNext,
                playPrevious, 
                setPlayingState,
                hasNext,
                hasPrevious
            }}
        >   
        
            { children }

        </PlayerContext.Provider>

    )

}

// Uma constante que será útil para ser exportada a outros componentes
// pois, irá permitir trazer o uso do CONTEXT, que já existe declarado
export const usePlayer = () => {
    return useContext(PlayerContext)
}