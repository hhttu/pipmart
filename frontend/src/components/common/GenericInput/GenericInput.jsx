import { styles } from "@components/common/GenericInput/styles.js";

export const GenericInput = ({ icon: Icon, name, type, placeholder, value, onChange, required = true, disabled = false }) => {
    return (
        <div style={styles.inputContainer}>
            {Icon && <Icon style={styles.icon} />}
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                style={ { ...styles.input, color: disabled ? '#999' : '#000' }}
                required={required}
                disabled={disabled}
            />
        </div>
    );
};