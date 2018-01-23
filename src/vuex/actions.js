import http from '../http';
import { vueAuth, vueAuthTokenBody } from '../auth/vue-auth';

export default {
    login (context, payload) {
        http.post(vueAuth.tokenUrl, {...payload.user, ...vueAuthTokenBody}).then(response => {
            context.commit('tokenData', response.data);
            context.commit('isAuthenticated', {
                isAuthenticated: true,
            });
            context.dispatch('fetchAuthenticatedUser', payload.app);
        });
    },
    fetchAuthenticatedUser (context, app) {
        http.get('/admin/api/user').then(response => {
            context.commit('authUser', response.data);
            context.commit('persistUser', app);
        }).catch(error => {
            console.log(errorr);
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
