import '../styles/global.scss';

import { Header } from '../components/Header';
import { Player } from '../components/Player';
import { PlayerContext } from '../contexts/PlayerContext';

import styles from '../styles/app.module.scss';
import { useState } from 'react';

function MyApp({ Component, pageProps }) {

    // Variáveis de estado para serem utilizadas dentro do valor do PlayerContext.Provider
    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);

    const [isPlaying, setIsPlaying] = useState(false);

    // Criando uma função para manipular o valor das variáveis de estado
    function play(episode) {
        setEpisodeList([episode]);
        setCurrentEpisodeIndex(0);
        setIsPlaying(true);
    }

    // Criando uma função para controlar o Play/Pause
    function togglePlay(){
        setIsPlaying(!isPlaying);
    }

  return (
    <PlayerContext.Provider value={{ episodeList, currentEpisodeIndex, play, isPlaying, togglePlay }}>
        {/* Todos os componentes nas linhas abaixo
        tem acesso ao valor do context */}
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContext.Provider>
  );
}

export default MyApp;
