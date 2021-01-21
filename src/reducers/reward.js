import { SET_REWARD } from '../actions/action.types';

export default function reward(state = [], action) {
    switch (action.type) {
        case SET_REWARD:
            return action.reward;
        default:
            return state;
    }
}
