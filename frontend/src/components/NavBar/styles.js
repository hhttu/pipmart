export const styles = {
    navbar: {
        position: 'fixed',
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '5px 20px',
        backgroundColor: '#fff',
        color: '#fff',
        height: '60px',
        borderBottom: '1px solid #e0e0e0',
    },
    logoLink: {
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        color: '#fff',
        padding: '0 20px',
    },
    logoImage: {
        width: '90px',
        height: '45px',
    },
    buttons: {
        display: 'flex',
        gap: '10px',
    },
    link: {
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        color: '#000',
        padding: '0 5px',
    },
    userLogo: {
        marginRight: '5px'
    },
    userSpan: {
        color: '#000',
        '&:hover': {
            color: '#C14859',
        }
    },
    cartLink: {
        marginLeft: '10px',
        display: 'flex',
        padding: '5px 20px',
        border: '1px solid #e0e0e0',
        borderRadius: '20px',
    },
    cartIcon: {
        color: '#3D3D3D',
        width: '20px',
        height: '20px',
        marginRight: '5px',
    },
    cartBadge: {
        color: '#3D3D3D',
    },
};