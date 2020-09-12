import { combineReducers } from 'redux';
import AuthReducers from './AuthReducers';
import MessagesReducers from './MessagesReducers';

export default combineReducers({
    authResponse: AuthReducers,
    messageResponse: MessagesReducers
});