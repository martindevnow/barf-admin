import * as mutations from './mutationTypes';
import { loadPlanFromData } from '../../../models/Plan';

export default {
  [mutations.POPULATE_COLLECTION] (state, collectionData) {
    // TODO: access the packages getter to find the relevant package...
    // so we don't rely on the plan being this god object
    state.collection = collectionData.map(planData => loadPlanFromData(planData));
  },

  [mutations.ADD_TO_COLLECTION] (state, planData) {
    state.collection.unshift(loadPlanFromData(planData));
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

  [mutations.UPDATE_IN_COLLECTION](state, planData) {
    state.collection = state.collection.map(model => {
      if (model.id === payload.id) {
        return loadPlanFromData(planData);
      }
      return model;
    });
  },

  [mutations.CREATE_MODE] (state) {
    state.show.creator = true;
    state.mode = null;
  },

  [mutations.CLEAR_MODE] (state) {
    state.show.creator = false;
  },

  [mutations.SHOW_MEAL_REPLACEMENT_CREATOR] (state) {
    state.show.mealReplacementModal = true;
  },

  [mutations.HIDE_MEAL_REPLACEMENT_CREATOR] (state) {
    state.show.mealReplacementModal = false;
  },

  [mutations.ADD_NOTE_TO_PLAN] (state, formData) {
    state.collection = state.collection.map(plan => {
      if (plan.id === formData.modelId) {
        plan.notes.push(formData.response.data);
      }
      return plan;
    });
  },

  [mutations.ADD_REPLACEMENT_TO_PLAN] (state, data) {
    state.collection = state.collection.map(plan => {
      if (plan.id === data.plan_id) {
        plan.meal_replacements.push(data);
      }
      return plan;
    })
  },

  [mutations.REMOVE_REPLACEMENT_FROM_PLAN] (state, {plan_id, mr_id}) {
    state.collection = state.collection.map(plan => {
      if (plan.id === plan_id) {
        plan.meal_replacements = plan.meal_replacements.filter(repl => {
          return repl.id !== mr_id;
        });
      }
      return plan;
    })
  }
};
