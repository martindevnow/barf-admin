import * as actions from './actionTypes';
import * as mutations from './mutationTypes';
import * as planMutations from "../plans/mutationTypes";
import http from '../../../http';

export default {
    // FETCH_ALL ??

    [actions.CREATE] ({commit}, targetModel) {
        commit(mutations.CREATE_MODE, targetModel);
        // commit(mutations.SET_TARGET_MODEL, targetModel);
    },

    [actions.SELECT]({ commit }, model) {
        commit(mutations.SELECT, model);
    },

    [actions.DESELECT]({ commit }) {
        commit(mutations.DESELECT);
    },

    [actions.SAVE] ({commit}, formData) {
        return new Promise((resolve, reject) => {
            http.post('/admin/api/notes',
                formData
            ).then(response => {
                // TODO: Add the note to the relevant model
                if (formData.modelName === 'plan') {
                    commit('plans/' + planMutations.ADD_NOTE_TO_PLAN,
                        { ...formData, response }, {root: true});
                }
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    },

    [actions.DELETE] ({commit}, id) {
        return new Promise((resolve, reject) => {
            http.delete('/admin/api/notes/' + id)
            .then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    },

    [actions.CANCEL] ({commit}) {
        commit(mutations.UNSET_TARGET_MODEL);
        commit(mutations.CLEAR_MODE);
    }
};
