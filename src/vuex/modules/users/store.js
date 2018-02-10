import actions from './actions';
import mutations from './mutations';
import * as getters from './getters';

const state = {
    collection: [],
    selected: null,
    show: {
        creator: false,
    },
    mode: null,
};

const usersModule = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};

export default usersModule;