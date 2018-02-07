import Vue from 'Vue';
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
        if (this.has(key) ) {
            return this.errors[key][0];
        }
    }

    fill(request) {
        console.log('filling..');
        // this.errors = request.response.data.errors;
        console.log({ errorObj: request.response.data.errors});
        console.log({ keys: Object.keys(request.response.data.errors)});
        Object.keys(request.response.data.errors)
            .forEach(key => {
                console.log('checking for key .. ' + key);
                if (request.response.data.errors.hasOwnProperty(key)) {
                    console.log('it is a good key');
                    this.errors[key] = request.response.data.errors[key];
                }
            })
            Vue.$forceUpdate();
    }

    // record(errors) {
    //     this.errors = { ...this.errors, ...errors };
    // }

    clear(key) {
        delete this.errors[key];
    }

    any() {
        if (! this.formId)
            return !! Object.keys(this.errors)
                .length > 0;

        return !! Object.keys(this.errors)
            .filter(key => key.indexOf(this.formId) !== -1)
            .length > 0;
    }

    flush() {
        this.errors = {};
    }
}

export default new Errors();