export default class Citizen {
    _id;
    _firstName;
    _lastName;
    _email;

    constructor(id, firstName, lastName, email) {
        this._id = id;
        this._firstName = firstName;
        this._lastName = lastName;
        this._email = email;
    }

    get id() {
        return this._id;
    }

    get firstName() {
        return this._firstName;
    }

    get lastName() {
        return this._lastName;
    }

    get email() {
        return this._email;
    }

    set id(id) {
        this._id = id;
    }

    set firstName(firstName) {
        this._firstName = firstName;
    }

    set lastName(lastName) {
        this._lastName = lastName;
    }

    set email(email) {
        this._email = email;
    }
}
