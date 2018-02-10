export const getCourierById = (state, getters) => (id) => {
    return state.collection.find(model => model.id === id)
};
