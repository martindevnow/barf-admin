export const getPetById = (state, getters) => (id) => {
    console.log('== Pet Getters ==');
    console.log('Finding pet by ID');
    return state.collection.find(model => model.id === id)
};