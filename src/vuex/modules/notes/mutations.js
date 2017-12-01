import * as mutations from './mutationTypes';

export default {
    [mutations.CREATE_MODE] (state, target) {
        state.show.creator = true;
        state.targeted = target;
    },

    [mutations.CLEAR_MODE] (state) {
        state.show.creator = false;
    },

    [mutations.SET_TARGET_MODEL] (state, payload) {
        // state.targeted = payload;
    },

    [mutations.UNSET_TARGET_MODEL] (state) {
        state.targeted = {};
    },
};


