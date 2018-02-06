import Errors from '../models/Errors';
import ErrorComponent from '../components/Errors/ErrorComponent';
import http from '../http';

class Validator {

    install(Vue) {

        Vue.component('error', ErrorComponent);

        if (http) {
            http.interceptors.response.use(response => {
                return response; 
            }, (error) => {
                console.log('== API Error (http.js) ==');
                console.log({error});
                if (error && error.response && error.response.status === 422) {
                    console.log('... sending to fill global errors');
                    Errors.fill(error.data)
                }
                return Promise.reject(error)
            });
        }

        Vue.mixin({
            beforeCreate() {
                //errors
                this.$options.$errors = {};
                Vue.util.defineReactive(this.$options, '$errors', Errors);
                if (!this.$options.computed) {
                    this.$options.computed = {}
                }
                this.$options.computed["$errors"] = function () {
                    return this.$options.$errors;
                };
            },

        })

    }

}

export default new Validator()