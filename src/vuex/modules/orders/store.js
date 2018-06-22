import actions from './actions';
import mutations from './mutations';
import * as getters from './getters';

const state = {
    collection: [],
    selected: null,
    show: {
        paymentModal: false,
        packedModal: false,
        pickedModal: false,
        shippedModal: false,
        deliveredModal: false,
        cancellationModal: false,
    },
    mode: null,
};

const ordersModule = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};

export default ordersModule;