export default class Reward {
    id;
    title;
    creationDate;
    city;
    cost;
    description;

    constructor(id, title, creationDate, city, cost, description) {
        this.id = id;
        this.title = title;
        this.creationDate = creationDate;
        this.city = city;
        this.cost = cost;
        this.description = description;
    }
}
