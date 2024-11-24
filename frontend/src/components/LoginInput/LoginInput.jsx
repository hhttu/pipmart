import { styles } from "@components/LoginInput/styles.js";

export const LoginInput = ({ icon: Icon, name, type, placeholder, value, onChange }) => {
    return (
        <div style={styles.inputContainer}>
            {Icon && <Icon style={styles.icon} />}
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                style={styles.input}
            />
        </div>
    );
};