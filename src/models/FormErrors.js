class FormErrors {
    constructor(keys = null) {
        this.errors = {};
        
        if (keys) {
            keys.forEach((key) => {
                this.errors[key] = '';
            })
        }
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
        Object.keys(request.response.data.errors)
            .forEach(key => {
                if (request.response.data.errors.hasOwnProperty(key)) {
                    this.errors[key] = request.response.data.errors[key];
                }
            })
    }

    clear(key) {
        this.errors[key] = '';
    }

    any() {
        let hasErrors = false;
        Object.keys(this.errors).forEach(key => {
            if (this.errors[key]) {
                hasErrors = true;
            }
        });
        return hasErrors;
    }

    flush() {
        this.errors = {};
    }
}

export default FormErrors;