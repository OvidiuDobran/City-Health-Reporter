import { LOGIN, CREATE_PROBLEM, SET_CATEGORY } from './action.types';

export function login(citizen) {
    return {
        type: LOGIN,
        citizen
    };
}

export function createProblem() {
    return {
        type: CREATE_PROBLEM
    };
}

export function setCategory(problem, category) {
    return {
        type: SET_CATEGORY,
        problem,
        category
    };
}
