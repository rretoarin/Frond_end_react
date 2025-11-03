import { useId } from 'react';

function PasswordField() {
    const passwordHintId = useId();

    return (
        <>
            <label>
                Password:
                <input
                    type="password"
                    aria-describedby={passwordHintId}
                />
            </label>
            <p id={passwordHintId}>
                El password debe ser mayor a 8 caracteres
            </p>
        </>
     );
}

export default PasswordField;