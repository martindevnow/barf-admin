export const getMealById = (state, getters) => (id) => {
    return state.collection.find(meal => meal.id === id)
};