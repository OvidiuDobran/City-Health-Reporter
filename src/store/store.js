import { createStore, combineReducers } from 'redux';
import rootReducer from '../reducers/index';
import citizen from '../reducers/citizen';
import problem from '../reducers/problem';

const store = createStore(combineReducers({ citizen, problem }));
export default store;
