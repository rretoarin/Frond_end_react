import { useState } from 'react';

export function useCounter() {
    const [count, setCount] = useState(0);

    const incrementar = () => setCount(count + 1);
    const decrementar = () => setCount(count - 1);

    return { count, incrementar, decrementar};
}