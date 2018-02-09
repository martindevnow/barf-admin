export const getPackageById = (state, getters) => (id) => {
    console.log('fetching package by id...');
    return state.collection.find(pkg => pkg.id === id)
};