import { SET_CITY } from '../actions/action.types';

export default function city(state = [], action) {
    switch (action.type) {
        case SET_CITY:
            return action.city;
        default:
            return state;
    }
}
