export const setActiveUser = (user) => {
    return {
        type:'set_active_user',
        payload: user
    };
}

export const setAuthToken = (token) => {
    return {
        type:'set_auth_token',
        payload: token
    };
}

export const setActiveRelation = (token) => {
    return {
        type:'set_active_relation',
        payload: token
    };
}