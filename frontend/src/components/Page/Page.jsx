import { styles } from "@components/Page/styles.js";

export const Page = ({ children }) => {
    return (
        <div style={styles.container}>
            { children }
        </div>
    )
}