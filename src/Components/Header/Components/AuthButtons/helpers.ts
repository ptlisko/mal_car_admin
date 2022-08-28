export const getAuthButtonsWrapStyle = (isLoggedIn: boolean): Record<any, any> => {
    if (isLoggedIn) {
        return {
            justifyContent: 'flex-end',
            paddingRight: '10px',
            width: 'auto'
        };
    }

    return {
        justifyContent: 'flex-end',
        paddingRight: '10px',
        width: 'auto'
    };
}