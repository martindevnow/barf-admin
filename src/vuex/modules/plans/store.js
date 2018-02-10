import actions from './actions';
import mutations from './mutations';
import * as getters from './getters';

const state = {
    collection: [],
    selected: null,
    show: {
        mealReplacementModal: false,
        creator: false,
    }
};

const plansModule = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};

export default plansModule;