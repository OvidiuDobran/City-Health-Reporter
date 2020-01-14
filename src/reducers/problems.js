import {
    CREATE_PROBLEM,
    SET_CATEGORY,
    SET_COORDINATES,
    ADD_PROBLEM,
    SET_DESCRIPTION,
    INIT_PROBLEMS_LIST
} from '../actions/action.types';
import Problem from '../data/Problem';

export default function problems(state = [], action) {
    switch (action.type) {
        case ADD_PROBLEM:
            const newProblemsList = action.problems;
            newProblemsList.push(action.problem);
            console.log('Problem is ' + JSON.stringify(action.problem));
            console.log('The new problems are: ' + JSON.stringify(newProblemsList));
            return newProblemsList;
        case INIT_PROBLEMS_LIST:
            return [];
        default:
            return state;
    }
}
