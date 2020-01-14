import { CREATE_PROBLEM, SET_CATEGORY, SET_COORDINATES, ADD_PROBLEM, SET_DESCRIPTION } from '../actions/action.types';
import Problem from '../data/Problem';

export default function problem(state = [], action) {
    switch (action.type) {
        case CREATE_PROBLEM:
            return new Problem();
        case SET_CATEGORY:
            console.log('ACTION.PROBLEM: ' + JSON.stringify(action.problem.problem));
            console.log('ACTION.CATEGORY: ' + JSON.stringify(action.category));
            let updatedProblem = Object.assign({}, action.problem);
            updatedProblem.category = action.category;
            console.log('The updated problem is: ' + JSON.stringify(updatedProblem));
            return updatedProblem;
        case SET_COORDINATES:
            updatedProblem = Object.assign({}, action.problem);
            updatedProblem.latitude = action.latitude;
            updatedProblem.longitude = action.longitude;
            console.log('The updated problem is: ' + JSON.stringify(updatedProblem));
            return updatedProblem;
        case SET_DESCRIPTION:
            return { ...action.problem, description: action.description };
        default:
            return state;
    }
}
