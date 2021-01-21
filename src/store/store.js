import { createStore, combineReducers } from 'redux';
import citizen from '../reducers/citizen';
import problem from '../reducers/problem';
import problemImages from '../reducers/problem-images';
import city from '../reducers/city';
import reward from '../reducers/reward';
import acquisition from '../reducers/acquisition';
import definedRewards from '../reducers/definedRewards';
import claimedRewards from '../reducers/claimedRewards';
import budget from '../reducers/budget';

const store = createStore(
    combineReducers({
        citizen,
        problem,
        problemImages,
        city,
        reward,
        acquisition,
        definedRewards,
        claimedRewards,
        budget
    })
);
export default store;
