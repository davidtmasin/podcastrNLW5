import { useState } from 'react';

export default function Button(props){

    // Criando um estado
    // [estado, função alteraEstado]
    const [counter, setCounter] = useState(1);

    function increment() {
        setCounter(counter + 1);
    } 

    return(
        <>
            <span>{counter}</span>

            {/* <button>{props.title}</button> */}
            <button onClick={increment}>{props.children}</button>

            <br />
        </>
    );
}
