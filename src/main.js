import Vue from 'vue';
import App from './App';
import router from './router';
import store from './vuex/store';
import axios from 'axios';
import VueLocalStorage from 'vue-localstorage'

Vue.config.productionTip = false;
window.axios = require('axios');

const baseUrl = process.env.BARF_API_BASE + '/';
axios.defaults.baseURL = baseUrl;

Vue.use(VueLocalStorage, {
    name: 'ls',
    createComputed: true //created computed members from your variable declarations
});

/* eslint-disable no-new */
new Vue({
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

