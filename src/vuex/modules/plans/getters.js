export const getPlanById = (state, getters) => (id) => {
    return state.collection.find(plan => plan.id === id)
};