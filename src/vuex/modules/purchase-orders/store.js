import actions from './actions';
import mutations from './mutations';
import * as getters from './getters';

const state = {
    collection: [],
    selected: null,
    show: {
        receivedModal: false,
        orderedModal: false,
    },
    mode: null,
}

const purchaseOrdersModule = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};

export default purchaseOrdersModule;