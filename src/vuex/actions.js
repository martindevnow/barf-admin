import axios from "axios";
import { vueAuth, vueAuthTokenBody } from '../auth/vue-auth';

export default {
    login (context, payload) {
        console.log('logging in...');
        axios.post(vueAuth.tokenUrl, {...payload.user, ...vueAuthTokenBody}).then(response => {
            context.commit('tokenData', response.data);
            context.commit('isAuthenticated', {
                isAuthenticated: true,
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