import { Page } from "@components/Page/Page.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styles } from "./styles.js";
import { LoginInput } from "@components/LoginInput/LoginInput.jsx";
import { FaLock, FaUser } from "react-icons/fa6";
import { users } from "../../constants.js";
import { useUser } from "@context/UserContext.jsx";

export const LoginPage = () => {
    const { setUserId, setIsLogin } = useUser();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login clicked");
        console.log(username);
        console.log(password);
        const user = users.find((user) => user.username === username && user.password === password);

        if (user) {
            // If user is found, navigate to the home page
            setIsLogin(true);
            setUserId(user.id);
            navigate('/home');
        } else {
            // Show error if credentials are incorrect
            setErrorMessage('Invalid username or password');
        }
    };

    return (
        <Page>
            <div style={styles.formContainer}>
                <h2>Login</h2>
                <form style={styles.form} onSubmit={handleSubmit}>
                    <LoginInput
                        icon={FaUser}
                        name="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <LoginInput
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
                <p>Don&#39;t have an account? <a style={styles.link} href="/register">Register here</a></p>
            </div>
        </Page>
    )
}