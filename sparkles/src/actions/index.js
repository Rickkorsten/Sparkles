export const setActiveUser = (user) => {
    return {
        type:'set_active_user',
        payload: user
    };
}