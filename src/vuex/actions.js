import http from '../http';
import {vueAuth, vueAuthTokenBody} from '../auth/vue-auth';
import * as mutations from "./modules/products/mutationTypes";

export default {
  login (context, payload) {
    return new Promise((resolve, reject) => {
      http.post(vueAuth.tokenUrl, {...payload.user, ...vueAuthTokenBody})
        .then(response => {
          context.commit('tokenData', response.data);
          context.commit('isAuthenticated', {
            isAuthenticated: true,
          });
          context.dispatch('fetchAuthenticatedUser', payload.app);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  fetchAuthenticatedUser (context) {
    return new Promise((resolve, reject) => {
      http.get('/admin/api/user').then(response => {
        context.commit('authUser', response.data);
        context.commit('persistUser');
        resolve(response);
      }).catch(error => {
        console.log(errorr);
        reject(error);
      })
    });
  },
  logout (context) {
    return new Promise((resolve, reject) => {
      context.commit('logout');
      context.commit('addresses/' + mutations.CLEAR_COLLECTION, null, {root: true});
      context.commit('couriers/' + mutations.CLEAR_COLLECTION, null, {root: true});
      context.commit('meals/' + mutations.CLEAR_COLLECTION, null, {root: true});
      context.commit('meats/' + mutations.CLEAR_COLLECTION, null, {root: true});
      context.commit('notes/' + mutations.CLEAR_COLLECTION, null, {root: true});
      context.commit('orders/' + mutations.CLEAR_COLLECTION, null, {root: true});
      context.commit('packages/' + mutations.CLEAR_COLLECTION, null, {root: true});
      context.commit('products/' + mutations.CLEAR_COLLECTION, null, {root: true});
      context.commit('purchaseOrders/' + mutations.CLEAR_COLLECTION, null, {root: true});
      context.commit('toppings/' + mutations.CLEAR_COLLECTION, null, {root: true});
      context.commit('users/' + mutations.CLEAR_COLLECTION, null, {root: true});
      resolve();
    });
  },
  loadUserFromLocalStorage(context) {
    context.commit('loadUser');
  },
  ping(context) {
      if (context.state.auth.access_token) {
          http.get('/admin/api/ping');
      }
  }
}
