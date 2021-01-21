import { SET_BUDGET } from '../actions/action.types';

export default function city(state = [], action) {
    switch (action.type) {
        case SET_BUDGET:
            return action.budget;
        default:
            return state;
    }
}
