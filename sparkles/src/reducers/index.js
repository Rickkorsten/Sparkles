import { combineReducers } from 'redux';
import ActiveUserReducer from './ActiveUserReducer';
import AuthTokenReducer from './AuthTokenReducer';
import ActiveRelationReducer from './ActiveRelationReducer';

export default combineReducers({
    activeUser: ActiveUserReducer,
    activeRelation: ActiveRelationReducer,
    authToken: AuthTokenReducer,
});