import {VueAuthenticate} from "vue-authenticate";
import axios from "axios";

const baseUrl = process.env.API_BASE + '/';

const vueAuth = new VueAuthenticate(axios, {
    baseUrl: baseUrl, // Your API domain
    clientId: '4',
    loginUrl: '/oauth/token',
    redirectUri: 'http://localhost:8080/auth/callback', // Your client app URL
    tokenName: 'access_token',
    bindRequestInterceptor: function () {
        this.$http.interceptors.request.use((config) => {
            console.log(config);
            console.log(config.data);

            let loginFields = {
                'grant_type': 'password',
                'client_id': '4',
                'client_secret': 'W8yRSIlnH0hST6sPVaqBXDnhHFIP70WtIFMOJcxH',
                'scope':    '',
            };
            if (config.url === baseUrl + "oauth/token") {
                config.data = {...config.data, ...loginFields};
            }
            return config
        })
    },
});

export default {
    login (context, payload) {
        vueAuth.login(payload.user, payload.requestOptions).then((response) => {
            console.log(response.data);
            context.commit('tokenData', response.data);
            context.commit('isAuthenticated', {
                isAuthenticated: vueAuth.isAuthenticated(),
            });
            context.dispatch('fetchAuthenticatedUser');
        })
    },
    fetchAuthenticatedUser (context, payload) {
        axios.get('/api/user').then(response => {
            context.commit('authUser', response.data);
        }).catch(error => {
            console.log(error);
        })
    },
    logout (context) {
        return new Promise((resolve, reject) => {
            context.commit('logout');
            resolve();
        });
    }
}