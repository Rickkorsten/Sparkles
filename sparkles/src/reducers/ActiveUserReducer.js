

export default (state = null, action) => {
    switch (action.type) {
        case 'set_active_user':
            return action.payload;
        default:
            return state;
    }
};