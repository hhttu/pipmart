import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styles } from "./styles.js";
import { GenericInput } from "@components/common/GenericInput/GenericInput.jsx";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa6";
import { Page } from "@components/styledComponents.js";
import { useUser } from "@context/UserContext.jsx";

export const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const { handleRegister } = useUser();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const message = await handleRegister(username, email, password);

        if (message === '') {
            alert("User registered successfully.");
            navigate('/');
        } else {
            setErrorMessage(message);
        }
    };

    return (
        <Page>
            <div style={styles.formContainer}>
                <h2>Register</h2>
                <form style={styles.form} onSubmit={handleSubmit}>
                    <GenericInput
                        icon={FaUser}
                        name="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <GenericInput
                        icon={FaEnvelope}
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                    <button type="submit" style={styles.button}>Register</button>
                </form>
                <p>Already have an account? <a style={styles.link} href="/login">Login here</a></p>
            </div>
        </Page>
    )
}