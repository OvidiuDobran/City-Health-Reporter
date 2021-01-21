import { SET_ACQUISITION } from '../actions/action.types';

export default function acquisition(state = [], action) {
    switch (action.type) {
        case SET_ACQUISITION:
            return action.acquisition;
        default:
            return state;
    }
}
