import Image from 'next/image';
import { useContext, useRef, useEffect } from 'react';

import Slider from 'rc-slider';
// CSS do rc-slider
import 'rc-slider/assets/index.css';//Ficará restrito a esta página

import { PlayerContext } from '../../contexts/PlayerContext';

import styles from './styles.module.scss';

export function  Player(){
    // Criando uma refs [referência] para manipular um elemento nativo do HTML <audio> usando
    // o JS de uma forma imperativa
    const audioRef = useRef<HTMLAudioElement>(null);

    const { 
        episodeList, 
        currentEpisodeIndex, 
        isPlaying, 
        togglePlay 
    } = useContext(PlayerContext)

    // Função de efeitos colaterais
    // Quando alguma coisa muda, algo acontece
    useEffect(() => {
        if(!audioRef.current){ //propriedade current traz o valor da refs
            return; //Retorna nada
        }

        if(isPlaying){
            audioRef.current.play();
        }
        else{
            audioRef.current.pause();
        }
    }, [isPlaying])


    const episode = episodeList[currentEpisodeIndex]

    return(
        <div className={styles.playerContainer}>
            <header>
                <img src="/playing.svg" alt="Tocando agora" title="Tocando agora" />
                <strong>Tocando agora</strong>
            </header>
            
            { episode ? (

                <div className={styles.currentEpisode}>
                    <Image 
                        width={592} 
                        height={592} 
                        src={episode.thumbnail} 
                        objectFit="cover" 
                    />
                    <strong>{episode.title}</strong>
                    <span>{episode.members}</span>
                </div>

            ) : (
                <div className={styles.emptyPlayer}>
                    <strong>Selecione um podcast para ouvir</strong>
                </div>
            ) }


            <footer className={!episode ? styles.empty: ''}>
                <div className={styles.progress}>
                    <span>00:00</span>
                    <div className={styles.slider}>
                        {  episode ? (
                            <Slider
                            trackStyle={{ backgroundColor: '#04d361' }}
                            railStyle={{ backgroundColor: '#9f75ff' }}
                            handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
                             />
                        ) : (
                            <div className={styles.emptySlider} /> 
                        )} 
                    </div>
                    <span>00:00</span>
                </div>
                {/* No REACT não pode existir um IF sem um ELSE */}
                { episode && (
                    <audio
                        src={episode.url}
                        ref={audioRef}
                        autoPlay
                    />
                ) }

                <div className={styles.buttons}>
                    <button type="button" title="Embaralhar" disabled={!episode}>
                        <img src="/shuffle.svg" alt="Embaralhar"/>
                    </button>
                    <button type="button" title="Tocar anterior" disabled={!episode}>
                        <img src="/play-previous.svg" alt="Tocar anterior"/>
                    </button>
                    <button type="button" 
                        className={styles.playButton} 
                        title="Tocar" 
                        disabled={!episode}
                        onClick={togglePlay}
                    >
                        {
                            isPlaying ?
                            <img src="/pause.svg" alt="Pausar"/>
                            : <img src="/play.svg" alt="Tocar"/>
                        }
                    </button>
                    <button type="button" title="Tocar próxima" disabled={!episode}>
                        <img src="/play-next.svg" alt="Tocar próxima"/>
                    </button>
                    <button type="button" title="Repetir" disabled={!episode}>
                        <img src="/repeat.svg" alt="Repetir"/>
                    </button>
                    
                </div>
            </footer>
        </div>
    );
}