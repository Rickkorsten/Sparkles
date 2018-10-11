import { combineReducers } from 'redux';
import ActiveUserReducer from './ActiveUserReducer';

export default combineReducers({
    activeUser: ActiveUserReducer,
});