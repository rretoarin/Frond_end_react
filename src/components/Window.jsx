import {useEffect} from 'react';

function Window() {
    useEffect(() => {
        const handleResize = () => {
            console.log('La ventana cambio su tamaño');
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    return (
        <p>Abrimos la consola del Navegador y modificamos el tamaño de la pagina</p>
     );
}


export default Window;