import {loadMealFromData} from "../../../models/Meal";
import * as mutations from './mutationTypes';

export default {
  [mutations.POPULATE_COLLECTION] (state, data) {
    state.collection = data.map(modelData => loadMealFromData(modelData));
  },

  [mutations.ADD_TO_COLLECTION] (state, modelData) {
    state.collection.unshift(loadMealFromData(modelData));
  },

  [mutations.CREATE_MODE] (state) {
    state.mode = null;
  },

  [mutations.EDIT_MODE] (state) {
    state.mode = 'EDIT';
  },

  [mutations.CLEAR_MODE] (state) {
    state.mode = null;
  },

  [mutations.CLEAR_COLLECTION] (state) {
    state.collection = [];
  },

  [mutations.SELECT] (state, model) {
    state.selected = loadMealFromData(model);
  },

  [mutations.DESELECT] (state) {
    state.selected = null;
  },

  [mutations.UPDATE_IN_COLLECTION] (state, payload) {
    state.collection = state.collection.map(model => {
      if (model.id === payload.id)
        return loadMealFromData(payload);
      return model;
    });
  },
};
