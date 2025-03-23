import {combineReducers} from 'redux';
import { userAuthReducer } from './reducer/userAuthReducer';
import { userProfileDataReducer } from './reducer/userProfileDataReducer';

export default combineReducers({
    userAuth: userAuthReducer,
    userProfileData: userProfileDataReducer
});