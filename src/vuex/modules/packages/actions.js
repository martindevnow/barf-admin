import * as actions from './actionTypes';
import * as mutations from './mutationTypes';

export default {
    [actions.CREATE] ({commit}) {
        commit(mutations.DESELECT);
        commit(mutations.CREATE_MODE);
    },

    [actions.EDIT] ({commit}, model) {
        commit(mutations.SELECT, model);
        commit(mutations.EDIT_MODE);
    },

    [actions.FETCH_ALL] ({commit, state}, force = false) {
        return new Promise((resolve, reject) => {
            if (! force && state.collection.length)
                return resolve(state.collection);

            axios.get('/admin/api/packages')
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

    [actions.SAVE] ({commit}, formData) {
        return new Promise((resolve, reject) => {
            axios.post('/admin/api/packages',
                formData
            ).then(response => {
                commit(mutations.ADD_TO_COLLECTION, response.data);
                resolve(response);
            }).catch(error => {
                console.log(error);
                reject(error);
            });
        });
    },

    [actions.UPDATE] ({commit, state}, formData) {
        return new Promise((resolve, reject) => {
            axios.patch('/admin/api/packages/' + state.selected.id,
                formData
            ).then(response => {
                commit(mutations.UPDATE_IN_COLLECTION, response.data);
                resolve(response);
            }).catch(error => {
                console.log(error);
                reject(error);
            });
        });
    },

    [actions.CANCEL] ({commit}) {
        commit(mutations.DESELECT);
        commit(mutations.CLEAR_MODE);
    },

    [actions.OPEN_MEAL_PLAN_EDITOR] ({commit}, model) {
        commit(mutations.SELECT, model);
        commit(mutations.SHOW_MEAL_PLAN_EDITOR);
    },

    [actions.CLOSE_MEAL_PLAN_EDITOR] ({commit}) {
        commit(mutations.DESELECT);
        commit(mutations.HIDE_MEAL_PLAN_EDITOR);
    },

    [actions.SAVE_MEAL_PLAN] ({commit}, formData) {
        return new Promise((resolve, reject) => {

            axios.patch('/admin/api/packages/' + formData.package_id + '/mealPlan',
                formData
            ).then(response => {
                commit(mutations.UPDATE_IN_COLLECTION, response.data);
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
        });
    },
};