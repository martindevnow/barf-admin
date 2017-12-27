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
            context.dispatch('fetchAuthenticatedUser', payload.app);
        });
    },
    fetchAuthenticatedUser (context, app) {
        axios.get('/api/user').then(response => {
            context.commit('authUser', response.data);
            context.commit('persistUser', app);
        }).catch(error => {
            console.log(error);
        })
    },
    logout (context, app) {
        return new Promise((resolve, reject) => {
            context.commit('logout', app);
            resolve();
        });
    },
    loadUserFromLocalStorage(context, app) {
        context.commit('loadUser', app);
    }
}