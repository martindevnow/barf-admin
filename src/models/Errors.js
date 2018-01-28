class Errors {
    constructor() {
        this.errors = {};
    }

    has(key) {
        return this.errors[key] !== undefined;
    }

    get(key) {
        if (this.errors[key]) {
            return this.errors[key];
        }
    }

    first(key) {
        if (this.has(key)) {
            return this.errors[key][0]
        }
    }

    get(key) {
        if (this.errors[key]) {
            return this.errors[key];
        }
    }

    fill(data) {
        console.log('filling..');
        this.errors = data.errors;
    }

    record(errors) {
        this.errors = { ...this.errors, ...errors };
    }

    clear(key) {
        delete this.errors[key];
    }

    any() {
        return !! Object.keys(this.errors).length > 0;
    }

    flush() {
        this.errors = {};
    }
}

export default new Errors();