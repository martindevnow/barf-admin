import Vue from 'vue';
import App from './App';
import router from './router';
import store from './vuex/store';
import axios from 'axios';
import VueLocalStorage from 'vue-localstorage'

Vue.config.productionTip = false;

/**
 * Axios Stuff
 */
window.axios = require('axios');
const baseUrl = process.env.BARF_API_BASE + '/';
axios.defaults.baseURL = baseUrl;

axios.interceptors.response.use(
    response => {
        return response;
    },
    err => {
        if (err.response.status === 401) {
            console.log('401 received...');
            store.commit('logout', app);
            router.push('/auth/login');
        } else {
            return Promise.reject(err);
        }
    }
);


/**
 * Local Storage Stuff
 */

Vue.use(VueLocalStorage, {
    name: 'ls',
    createComputed: true //created computed members from your variable declarations
});


/**
 * Main App Instance
 */
/* eslint-disable no-new */
let app = new Vue({
    el: '#app',
    ls: {
        auth: {
            type: Object,
            default: null,
        }
    },
    router,
    store,
    render: h => h(App)
});
