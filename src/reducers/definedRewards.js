import { SET_DEFINED_REWARDS } from '../actions/action.types';

export default function definedRewards(state = [], action) {
    switch (action.type) {
        case SET_DEFINED_REWARDS:
            return action.rewards;
        default:
            return state;
    }
}
