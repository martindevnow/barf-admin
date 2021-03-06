import actions from './actions';
import mutations from './mutations';
import * as getters from './getters';

const state = {
    collection: [],
    selected: null,
    mode: null,
};

const petsModule = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};

export default petsModule;