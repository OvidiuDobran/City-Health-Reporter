import { SET_CLAIMED_REWARDS } from '../actions/action.types';

export default function claimedRewards(state = [], action) {
    switch (action.type) {
        case SET_CLAIMED_REWARDS:
            return action.acquisitions;
        default:
            return state;
    }
}
