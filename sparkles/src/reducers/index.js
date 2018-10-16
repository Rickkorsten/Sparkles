import { combineReducers } from 'redux';
import ActiveUserReducer from './ActiveUserReducer';
import AuthTokenReducer from './AuthTokenReducer';

export default combineReducers({
    activeUser: ActiveUserReducer,
    authToken: AuthTokenReducer
});