import {createStore} from 'redux';
import reducer from './../reducer';

const initValue = {
  appReducer: {},
  humitureReducer: {
    humiture: {}
  }
};

const store = createStore(reducer, initValue);

export default store;