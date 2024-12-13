export const ColorSquare = ({alt, styles}) => {
    const combinedStyles = {
        ...styles,
        backgroundColor: "gray",
        color: "#FFF",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }

    return (
        <div style={combinedStyles}>
            {`# ${alt}`}
        </div>
    )
}