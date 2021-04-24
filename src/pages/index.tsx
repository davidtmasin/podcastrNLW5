export default function Home(props) {
    // console.log(props.episodes)
    return (
        <div>
            <h1>Index</h1>
            <p>{JSON.stringify(props.episodes)}</p>
        </div>
  )
}


export async function getStaticProps() {
    const response = await fetch('http://localhost:3333/episodes')
    const data = await response.json()

    return{
        props: {
            episodes: data,
        },
        // Recebe um num em segundos de quanto em quanto tempo desejo gerar uma nova versão desta página
        revalidate: 60 * 60 * 8,
    }
    
}