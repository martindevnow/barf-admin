import * as actions from './actionTypes';
import * as mutations from './mutationTypes';
import * as orderMutations from "../orders/mutationTypes";
import http from '../../../http';

export default {
    [actions.FETCH_ALL] ({commit, state}, force = false) {
        return new Promise((resolve, reject) => {
            if (!force && state.collection.length)
                return resolve(state.collection);

            http.get('/admin/api/plans')
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

    [actions.SELECT] ({commit}, model) {
        commit(mutations.SELECT, model);
    },

    [actions.DESELECT] ({commit}) {
        commit(mutations.DESELECT);
    },

    [actions.CREATE] ({commit}) {
        commit(mutations.DESELECT);
        commit(mutations.CREATE_MODE);
    },

    [actions.SAVE] ({commit}, formData) {
        return new Promise((resolve, reject) => {
            http.post('/admin/api/plans',
                formData
            ).then(response => {
                commit(mutations.ADD_TO_COLLECTION, response.data);
                resolve(response)
            }).catch(error => {
                reject(error);
            });
        });
    },

    [actions.EDIT] ({commit}, model) {
        commit(mutations.SELECT, model);
        commit(mutations.EDIT_MODE);
    },

    [actions.UPDATE] ({commit, state}, formData) {
        return new Promise((resolve, reject) => {
            http.patch('/admin/api/plans/' + state.selected.id,
                formData
            ).then(response => {
                commit(mutations.UPDATE_IN_COLLECTION, response.data);
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    },

    [actions.CANCEL] ({commit}) {
        commit(mutations.DESELECT);
        commit(mutations.CLEAR_MODE);
    },

    [actions.OPEN_MEAL_REPLACEMENT_CREATOR] ({commit}, model) {
        commit(mutations.SELECT, model);
        commit(mutations.SHOW_MEAL_REPLACEMENT_CREATOR);
    },

    [actions.CLOSE_MEAL_REPLACEMENT_CREATOR] ({commit}) {
        commit(mutations.HIDE_MEAL_REPLACEMENT_CREATOR);
        commit(mutations.DESELECT);
    },

    [actions.SAVE_MEAL_REPLACEMENT] ({commit, state}, formData) {
        return new Promise((resolve, reject) => {
            http.post('/admin/api/plans/' + state.selected.id + '/replaceMeal',
                formData
            ).then(response => {
                // TODO: Add the meal replacement to the plan, so it is updated properly...
                commit(mutations.ADD_REPLACEMENT_TO_PLAN, response.data);
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    },

    [actions.DELETE_MEAL_REPLACEMENT] ({commit}, data) {
        return new Promise((resolve, reject) => {
            http.delete('/admin/api/mealReplacements/' + data.mr_id
            ).then(response => {
                commit(mutations.REMOVE_REPLACEMENT_FROM_PLAN, data);
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    },

    [actions.CANCEL_PLAN] ({commit}, formData) {
        return new Promise((resolve, reject) => {
            http.post('/admin/api/plans/' + formData.plan_id + '/cancel',
                formData,
            ).then(response => {
                commit(mutations.UPDATE_IN_COLLECTION, response.data);
                if (formData.cancel_orders) {
                    response.data.orders
                        .filter(ord => ord.cancelled)
                        .forEach(ord => {
                            commit('orders/' + orderMutations.UPDATE_IN_COLLECTION, ord, { root: true });
                    });
                }
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    }
};
