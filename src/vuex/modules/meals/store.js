import actions from './actions';
import mutations from './mutations';
import * as getters from './getters';

const state = {
    collection: [],
    selected: null,
    show: {
        creator: false,
    }
};

const mealsModule = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};

export default mealsModule;