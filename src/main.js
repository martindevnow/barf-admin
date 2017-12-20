import Vue from 'vue';
import App from './App';
import router from './router';
import store from './vuex/store';
import VueAxios from 'vue-axios';
import VueAuthenticate from 'vue-authenticate';
import axios from 'axios';

Vue.config.productionTip = false;
window.axios = require('axios');

console.log(process.env.API_BASE);
axios.defaults.baseURL = process.env.API_BASE + '/';

export const vueAuth = new VueAuthenticate(axios, {
    baseUrl: 'http://bb-api.dev', // Your API domain
    clientId: '4',
    loginUrl: '/oauth/token',
    redirectUri: 'http://localhost:8080/auth/callback', // Your client app URL
    tokenName: 'access_token',
});

Vue.use(VueAxios, axios);
Vue.use(VueAuthenticate, {
    baseUrl: 'http://bb-api.dev', // Your API domain
    clientId: '4',
    loginUrl: '/oauth/token',
    redirectUri: 'http://localhost:8080/auth/callback', // Your client app URL
    tokenName: 'access_token',

    bindRequestInterceptor: function () {
        this.$http.interceptors.request.use((config) => {
            let loginFields = {
                'grant_type': 'password',
                'client_id': '4',
                'client_secret': 'W8yRSIlnH0hST6sPVaqBXDnhHFIP70WtIFMOJcxH',
                'scope':    '',
            };
            if (config.url === "http://bb-api.dev/oauth/token") {
                config.data = {...config.data, ...loginFields};
            }
            return config
        })
    },
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
