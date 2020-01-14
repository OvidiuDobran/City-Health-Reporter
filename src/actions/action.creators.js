import {
    LOGIN,
    CREATE_PROBLEM,
    SET_CATEGORY,
    SET_COORDINATES,
    ADD_PROBLEM,
    SET_DESCRIPTION,
    INIT_PROBLEMS_LIST
} from './action.types';

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

export function setCoordinates(problem, latitude, longitude) {
    return {
        type: SET_COORDINATES,
        problem,
        latitude,
        longitude
    };
}

export function setDescription(problem, description) {
    return {
        type: SET_DESCRIPTION,
        problem,
        description
    };
}

export function addProblem(problems, problem) {
    return {
        type: ADD_PROBLEM,
        problems,
        problem
    };
}

export function initProblemsList() {
    return {
        type: INIT_PROBLEMS_LIST
    };
}
