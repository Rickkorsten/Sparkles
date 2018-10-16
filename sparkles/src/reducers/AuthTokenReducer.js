export default (state = null, action) => {
    switch (action.type) {
        case 'set_auth_token':
            return action.payload;
        default:
            return state;
    }
};