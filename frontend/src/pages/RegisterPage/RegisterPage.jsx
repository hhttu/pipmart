import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { users } from "../../constants.js";
import { styles } from "./styles.js";
import { GenericInput } from "@components/common/GenericInput/GenericInput.jsx";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa6";
import { Page } from "@components/styledComponents.js";

export const RegisterPage = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if username or email already exists
        const userExists = users.find(
            (user) => user.username === username || user.email === email
        );

        if (userExists) {
            setErrorMessage('Username or email already exists');
        } else {
            // Add the new user to the array (change to API call after)
            const newUser = {
                id: users.length + 1,
                name,
                username,
                password,
                email,
            };
            users.push(newUser);

            alert("User registered successfully.");
            navigate('/login');
        }
    };

    return (
        <Page>
            <div style={styles.formContainer}>
                <h2>Register</h2>
                <form style={styles.form} onSubmit={handleSubmit}>
                    <GenericInput
                        icon={FaUser}
                        name="name"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
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