import { createStore, combineReducers } from 'redux';
import rootReducer from '../reducers/index';
import citizen from '../reducers/citizen';

const store = createStore(combineReducers({ citizen }));
export default store;
