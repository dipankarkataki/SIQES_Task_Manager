import {combineReducers} from 'redux';
import { userAuthReducer } from './reducer/userAuthReducer';

export default combineReducers({
    userAuth: userAuthReducer
});