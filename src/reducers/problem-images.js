import { CLEAR_PROBLEM_IMAGES, SET_PROBLEM_IMAGES } from '../actions/action.types';
export default function problemImages(state = [], action) {
    switch (action.type) {
        case CLEAR_PROBLEM_IMAGES:
            return [];
        case SET_PROBLEM_IMAGES:
            return action.images;
        default:
            return state;
    }
}
