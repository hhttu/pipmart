import { styles } from "@components/common/WarningBox/styles.js";
import { IoWarningOutline } from "react-icons/io5";

export const WarningBox = ({ errorMessage }) => {
    return (
        <div style={styles.warningBox}>
            <IoWarningOutline style={styles.warningIcon}/>
            {errorMessage}
        </div>
    )
}