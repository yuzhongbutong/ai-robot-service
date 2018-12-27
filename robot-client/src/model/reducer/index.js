import {combineReducers} from 'redux';
import HumitureReducer from './HumitureReducer';
import AppReducer from './AppReducer';

export default combineReducers({
  appReducer: AppReducer,
  humitureReducer: HumitureReducer
});