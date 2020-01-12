import { LOGIN } from './actio.types';

export function login(citizen) {
    return {
        type: LOGIN,
        citizen
    };
}
