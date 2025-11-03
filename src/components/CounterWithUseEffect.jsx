import { useEffect, useState } from 'react';

function CounterWithUseEffect() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log('La variable count se actualizo.')
    }, [count])

    return (
        <>
            <p>El valor de Count es: {count} </p>
            <button onClick={() => setCount(count + 1)}>Aumentar</button>
        </>
     );
}

export default CounterWithUseEffect;