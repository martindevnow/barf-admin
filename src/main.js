import Vue from 'vue';
import App from './App';
import router from './router';
import store from './vuex/store';
import axios from 'axios';

Vue.config.productionTip = false;
window.axios = require('axios');

const baseUrl = process.env.BARF_API_BASE + '/';
axios.defaults.baseURL = baseUrl;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
