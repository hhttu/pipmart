import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styles } from "./styles.js";
import { GenericInput } from "@components/common/GenericInput/GenericInput.jsx";
import { FaLock, FaUser } from "react-icons/fa6";
import { useUser } from "@context/UserContext.jsx";
import { Page } from "@components/styledComponents.js";

export const LoginPage = () => {
    const { handleLogin } = useUser();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const message = await handleLogin(username, password);

        if (message === '') {
            navigate('/home');
        } else {
            // Show error if credentials are incorrect
            setErrorMessage(message);
        }
    };

    return (
        <Page>
            <div style={styles.formContainer}>
                <h2>Login</h2>
                <form style={styles.form} onSubmit={handleSubmit}>
                    <GenericInput
                        icon={FaUser}
                        name="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <GenericInput
                        icon={FaLock}
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
                    <button type="submit" style={styles.button}>Login</button>
                </form>
                <p>Don&#39;t have an account? <a style={styles.link} href="/signup">Register here</a></p>
            </div>
        </Page>
    )
}