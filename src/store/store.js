import { createStore, combineReducers } from 'redux';
import rootReducer from '../reducers/index';
import citizen from '../reducers/citizen';
import problem from '../reducers/problem';
import problems from '../reducers/problems';

const store = createStore(combineReducers({ citizen, problem, problems }));
export default store;
