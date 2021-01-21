import {
    LOGIN,
    CREATE_PROBLEM,
    SET_CATEGORY,
    SET_COORDINATES,
    SET_DESCRIPTION,
    SET_CITY_PROBLEM,
    SET_CITIZEN_EMAIL,
    CLEAR_PROBLEM_IMAGES,
    SET_PROBLEM_IMAGES,
    SET_CITY,
    SET_REWARD,
    SET_ACQUISITION,
    SET_DEFINED_REWARDS,
    SET_CLAIMED_REWARDS,
    SET_BUDGET,
    SET_CITIZEN,
    SET_ADDRESS
} from './action.types';

export function login(citizen) {
    return {
        type: LOGIN,
        citizen
    };
}

export function setCitizen(citizen) {
    return {
        type: SET_CITIZEN,
        citizen
    };
}

export function createProblem() {
    return {
        type: CREATE_PROBLEM
    };
}

export function setCategory(problem, category) {
    return {
        type: SET_CATEGORY,
        problem,
        category
    };
}

export function setCoordinates(problem, latitude, longitude) {
    return {
        type: SET_COORDINATES,
        problem,
        latitude,
        longitude
    };
}

export function setDescription(problem, description) {
    return {
        type: SET_DESCRIPTION,
        problem,
        description
    };
}

export function setCityProblem(problem, city) {
    return {
        type: SET_CITY_PROBLEM,
        problem,
        city
    };
}

export function setCitizenEmail(problem, citizenEmail) {
    return {
        type: SET_CITIZEN_EMAIL,
        problem,
        citizenEmail
    };
}

export function clearProblemImages() {
    return {
        type: CLEAR_PROBLEM_IMAGES
    };
}

export function setProblemImages(images) {
    return {
        type: SET_PROBLEM_IMAGES,
        images
    };
}

export function setCity(city) {
    return {
        type: SET_CITY,
        city
    };
}

export function setReward(reward) {
    return {
        type: SET_REWARD,
        reward
    };
}

export function setAcquisition(acquisition) {
    return {
        type: SET_ACQUISITION,
        acquisition
    };
}

export function setDefinedRewards(rewards) {
    return {
        type: SET_DEFINED_REWARDS,
        rewards
    };
}

export function setClaimedRewards(acquisitions) {
    return {
        type: SET_CLAIMED_REWARDS,
        acquisitions
    };
}

export function setBudget(budget) {
    return {
        type: SET_BUDGET,
        budget
    };
}

export function setAddress(problem, address) {
    return {
        type: SET_ADDRESS,
        problem,
        address
    };
}
