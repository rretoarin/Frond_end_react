import { useCallback } from 'react';

function CounterWithUseCallback({count, onIncrement}) {
    const handleIncrement = useCallback(() => {
        onIncrement(count)
    }, [count, onIncrement])

    return (
        <div>
            <p>El valor de Count: {count}</p>
            <button onClick={handleIncrement}>Incrementar</button>
        </div>
    );
}

export default CounterWithUseCallback;