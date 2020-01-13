import { LOGIN } from '../actions/action.types';

export default function citizen(state = [], action) {
    switch (action.type) {
        case LOGIN:
            return action.citizen;
        default:
            return state;
    }
}
