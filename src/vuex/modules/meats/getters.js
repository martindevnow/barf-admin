export const getMeatById = (state, getters) => (id) => {
    return state.collection.find(model => model.id === id)
};