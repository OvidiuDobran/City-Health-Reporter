import { LOGIN } from '../actions/actio.types';

export default function citizen(state = [], action) {
    switch (action.type) {
        case LOGIN:
            console.log('CITIZEN: ' + JSON.stringify(action.citizen));
            return { ...state, citizen: action.citizen };
        default:
            return state;
    }
}
