import {
    CREATE_PROBLEM,
    SET_CATEGORY,
    SET_COORDINATES,
    SET_DESCRIPTION,
    SET_CITY_PROBLEM,
    SET_CITIZEN_EMAIL,
    SET_ADDRESS
} from '../actions/action.types';
import Problem from '../data/Problem';

export default function problem(state = [], action) {
    switch (action.type) {
        case CREATE_PROBLEM:
            return new Problem();
        case SET_CATEGORY:
            return { ...action.problem, category: action.category };
        case SET_COORDINATES:
            return { ...action.problem, latitude: action.latitude, longitude: action.longitude };
        case SET_DESCRIPTION:
            return { ...action.problem, description: action.description };
        case SET_CITY_PROBLEM:
            return { ...action.problem, city: action.city };
        case SET_CITIZEN_EMAIL:
            return { ...action.problem, citizenEmail: action.citizenEmail };
        case SET_ADDRESS:
            return { ...action.problem, address: action.address };
        default:
            return state;
    }
}
