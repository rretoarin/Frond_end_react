import { useMemo, useState } from 'react';

function CounterWithUseMemo({count}) {
    const [nuevoContador, setnuevoContador] = useState(count);
    const double = useMemo(() => nuevoContador * 2, [nuevoContador])

    return (
        <div>
            <p>El valor de Count: {nuevoContador}</p>
            <p>El valor de Double: {double}</p>
            <button onClick={() => setnuevoContador(nuevoContador + 1)}>Aumentar</button>
        </div>
    );
}

export default CounterWithUseMemo;