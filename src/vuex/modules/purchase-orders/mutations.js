import * as mutations from './mutationTypes';

export default {

  [mutations.POPULATE_COLLECTION] (state, data) {
    state.collection = data;
  },

  [mutations.UPDATE_IN_COLLECTION] (state, payload) {
    state.selected = {...state.selected, ...payload};
    state.collection = state.collection.map(po => {
      if (po.id === state.selected.id)
        return {...state.selected};
      return po;
    });
  },

  [mutations.CLEAR_COLLECTION] (state) {
    state.collection = [];
  },

  [mutations.SELECT] (state, model) {
    state.selected = model;
  },

  [mutations.DESELECT] (state) {
    state.selected = null;
  },

  [mutations.SHOW_ORDERED_LOGGER] (state) {
    state.show.orderedModal = true;
  },

  [mutations.HIDE_ORDERED_LOGGER] (state) {
    state.show.orderedModal = false;
  },

  [mutations.SHOW_RECEIVED_LOGGER] (state) {
    state.show.receivedModal = true;
  },

  [mutations.HIDE_RECEIVED_LOGGER] (state) {
    state.show.receivedModal = false;
  },

};
