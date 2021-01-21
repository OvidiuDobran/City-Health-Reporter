export default class Problem {
    id;
    longitude;
    latitude;
    description;
    city;
    category;
    citizenEmail;
    histories;
    images;
    rating;
    address;

    constructor() {}

    static buildProblem({
        id,
        longitude,
        latitude,
        description,
        category,
        city,
        citizenEmail,
        histories,
        images,
        rating,
        address
    }) {
        const problem = new Problem();
        problem.id = id;
        problem.longitude = longitude;
        problem.latitude = latitude;
        problem.category = category;
        problem.description = description;
        problem.city = city;
        problem.citizenEmail = citizenEmail;
        problem.histories = histories.map(
            (history) => new ProblemHistory(history.creationDate, history.comment, history.status, history.clerk)
        );
        problem.images = images;
        problem.rating = rating;
        problem.address = address;
        return problem;
    }

    getReportedDate() {
        let reportedDate = this.histories[0].creationDate;
        this.histories.forEach((history) => {
            if (history.creationDate < reportedDate) {
                reportedDate = history.creationDate;
            }
        });
        return reportedDate;
    }

    getCurrentStatus() {
        if (!this.histories || this.histories.length == 0) {
            return STATUS.NEW;
        }
        let currentHistory = this.histories[0];
        this.histories.forEach((history) => {
            if (history.creationDate > currentHistory.creationDate) {
                currentHistory = history;
            }
        });
        return currentHistory.status;
    }
}

export class ProblemHistory {
    creationDate;
    comment;
    status;
    clerk;

    constructor(creationDate, comment, status, clerk) {
        this.creationDate = creationDate;
        this.comment = comment;
        this.status = status;
        this.clerk = clerk;
    }
}

export class ProblemImage {
    name;
}

export const STATUS = {
    NEW: 'NEW',
    IN_PROGRESS: 'IN_PROGRESS',
    RESOLVED: 'RESOLVED',
    CLOSED: 'CLOSED',
    REJECTED: 'REJECTED'
};
