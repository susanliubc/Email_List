import { combineReducers } from 'redux';
import emailReducer from './emailReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
  email: emailReducer,
  error: errorReducer,
  auth: authReducer
});
