import {loadProductFromData} from "../../../models/Product";
import * as mutations from './mutationTypes';

export default {
  [mutations.POPULATE_COLLECTION] (state, data) {
    state.collection = data.map(modelData => loadProductFromData(modelData));
  },

  [mutations.ADD_TO_COLLECTION] (state, modelData) {
    state.collection.unshift(loadProductFromData(modelData));
  },

  [mutations.CREATE_MODE] (state) {
    state.show.creator = true;
    state.mode = null;
  },

  [mutations.EDIT_MODE] (state) {
    state.show.creator = true;
    state.mode = 'EDIT';
  },

  [mutations.CLEAR_MODE] (state) {
    state.show.creator = false;
    state.mode = null;
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

  [mutations.UPDATE_IN_COLLECTION] (state, payload) {
    state.collection = state.collection.map(model => {
      if (model.id === payload.id)
        return loadProductFromData(payload);
      return model;
    });
  },
};
