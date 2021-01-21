import { LOGIN, SET_CITIZEN } from '../actions/action.types';

export default function citizen(state = [], action) {
    switch (action.type) {
        case LOGIN:
            return action.citizen;
        case SET_CITIZEN:
            return action.citizen;
        default:
            return state;
    }
}
