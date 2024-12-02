import { styles } from "@components/common/GenericTable/styles.js";

export const GenericTable = ({ headers, data, onRowClick }) => {
    return (
        <div style={styles.tableContainer}>
            <table style={styles.table}>
                <thead>
                    <tr>
                        {headers.map(({label, width}, index) => (
                            <th
                                key={index}
                                style={{...styles.header, width: width || "auto"}}
                            >
                                {label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            onClick={() => onRowClick && onRowClick(row)}
                            style={{
                                cursor: onRowClick ? "pointer" : "default",
                                borderBottom: "1px solid #e0e0e0",
                            }}
                        >
                            {Object.values(row).map((value, index) => (
                                <td
                                    key={index}
                                    style={styles.column}
                                >
                                    {value}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};