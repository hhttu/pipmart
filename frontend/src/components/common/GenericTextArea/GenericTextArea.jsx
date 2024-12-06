import { styles } from "@components/common/GenericTextArea/styles.js";

export const GenericTextArea = ({ name, type, placeholder, value, onChange, required }) => {
    return (
        <div style={styles.inputContainer}>
            <textarea
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                style={styles.input}
                required={required}

            />
        </div>
    );
};