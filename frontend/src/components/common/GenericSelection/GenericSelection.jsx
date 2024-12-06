import { styles } from "@components/common/GenericSelection/styles.js";
import { StyledSelect } from "@components/styledComponents.js";

export const GenericSelection = ({ icon: Icon, name, value, onChange, options=[] }) => {
    return (
        <div style={styles.inputContainer}>
            {Icon && <Icon style={styles.icon} />}
            <select
                name={name}
                value={ value }
                onChange={ onChange }
                style={styles.input}
                required
            >
                {options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}