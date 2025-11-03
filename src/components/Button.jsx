const Button = ({id, text, isPrimary, handleClick}) =>
    (
        <button
            onClick={() => handleClick(id)}
            className={isPrimary ? 'button-primary' : 'button'}
        >
            {text}
        </button>
    );

export default Button;