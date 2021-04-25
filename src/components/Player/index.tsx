import styles from './styles.module.scss';

export function  Player(){
    return(
        <div className={styles.playerContainer}>
            <header>
                <img src="/playing.svg" alt="Tocando agora" title="Tocando agora" />
                <strong>Tocando agora</strong>
            </header>
            <div className={styles.emptyPlayer}>
                <strong>Selecione um podcast para ouvir</strong>
            </div>

            <footer className={styles.empty}>
                <div className={styles.progress}>
                    <span>00:00</span>
                    <div className={styles.slider}>
                        <div className={styles.emptySlider} />  
                    </div>
                    <span>00:00</span>
                </div>

                <div className={styles.buttons}>
                    <button type="button" title="Embaralhar">
                        <img src="/shuffle.svg" alt="Embaralhar"/>
                    </button>
                    <button type="button" title="Tocar anterior">
                        <img src="/play-previous.svg" alt="Tocar anterior"/>
                    </button>
                    <button type="button" className={styles.playButton} title="Tocar">
                        <img src="/play.svg" alt="Tocar"/>
                    </button>
                    <button type="button" title="Tocar próxima">
                        <img src="/play-next.svg" alt="Tocar próxima"/>
                    </button>
                    <button type="button" title="Repetir">
                        <img src="/repeat.svg" alt="Repetir"/>
                    </button>
                    
                </div>
            </footer>
        </div>
    );
}