import {createStore} from 'redux';
import reducer from './../reducer';

const initValue = {
  appReducer: {},
  carReducer: {},
  humitureReducer: {
    humiture: {}
  },
  chatReducer: {
    messages: []
  }
};

const store = createStore(reducer, initValue);

export default store;