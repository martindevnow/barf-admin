import * as actions from './actionTypes';
import * as mutations from './mutationTypes';
import http from '../../../http';

export default {
    [actions.FETCH_ALL] ({commit, state}, force = false) {
        return new Promise((resolve, reject) => {
            if (! force && state.collection.length)
                return resolve(state.collection);

            http.get('/admin/api/products')
                .then(response => {
                    commit(mutations.POPULATE_COLLECTION, response.data);
                    resolve(response);
                })
                .catch(error => {
                    console.log(error);
                    reject(error);
                });
        });
    },

    [actions.SELECT]({ commit }, model) {
        commit(mutations.SELECT, model);
    },

    [actions.DESELECT]({ commit }) {
        commit(mutations.DESELECT);
    },

    [actions.CREATE] ({commit}) {
        commit(mutations.DESELECT);
        commit(mutations.CREATE_MODE);
    },

    [actions.SAVE] ({commit, rootState}, formData) {
        return new Promise((resolve, reject) => {
            http.post('/admin/api/products',
                formData
                // , {'Authorization': rootState.auth.token_type + ' ' + rootState.auth.access_token}
            ).then(response => {
                commit(mutations.ADD_TO_COLLECTION, response.data);
                resolve(response);
            }).catch(error => {
                console.log(error);
                reject(error);
            });
        });
    },

    [actions.EDIT] ({commit}, model) {
        commit(mutations.SELECT, model);
        commit(mutations.EDIT_MODE);
    },

    [actions.UPDATE] ({commit, state, rootState}, formData) {
        return new Promise((resolve, reject) => {
            http.patch('/admin/api/products/' + state.selected.id,
                formData
              //, {'Authorization': rootState.auth.token_type + ' ' + rootState.auth.access_token}
            ).then(response => {
                commit(mutations.UPDATE_IN_COLLECTION, response.data);
                resolve(response);
            }).catch(error => {
                console.log(error);
                reject(error);
            });
        });
    },

    // TODO: Delete

    [actions.CANCEL] ({commit}) {
        commit(mutations.DESELECT);
        commit(mutations.CLEAR_MODE);
    },
};
