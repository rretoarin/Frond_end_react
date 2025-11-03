import { useCounter } from "../hooks/useCounter";

function Counter() {
    const { count, incrementar, decrementar } = useCounter();

    return (
        <>
            <button onClick={incrementar}>+</button>
            <p>{count} </p>
            <button onClick={decrementar}>-</button>
        </>
     );
}

export default Counter;