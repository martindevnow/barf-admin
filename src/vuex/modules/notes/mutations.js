import * as mutations from './mutationTypes';

export default {
  [mutations.CREATE_MODE] (state, target) {
    state.show.creator = true;
    state.targeted = {model: { ...target.model, notes: null }, type: target.type};
  },

  [mutations.CLEAR_MODE] (state) {
    state.show.creator = false;
  },

  [mutations.CLEAR_COLLECTION] (state) {
    state.collection = [];
  },

  [mutations.SET_TARGET_MODEL] (state, payload) {
    console.log('== Inside Notes Mutations ==');
    console.log('setting payload to targeted');
    state.targeted = { ...payload };
  },

  [mutations.UNSET_TARGET_MODEL] (state) {
    state.targeted = {};
  },

  [mutations.ATTACH_TO_TARGETED] (state, response) {
    state.targeted.notes = response.data;
  }
};


