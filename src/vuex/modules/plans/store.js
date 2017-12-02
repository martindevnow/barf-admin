import actions from './actions';
import * as getters from './getters';
import mutations from './mutations';

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