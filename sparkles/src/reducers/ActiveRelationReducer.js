export default (state = null, action) => {
    switch (action.type) {
        case 'set_active_relation':
            return action.payload;
        default:
            return state;
    }
};