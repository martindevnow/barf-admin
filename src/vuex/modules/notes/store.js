import actions from './actions';
import mutations from './mutations';

const state = {
    collection: [],
    targeted: {},
    show: {
        creator: false,
    }
};

const notesModule = {
    namespaced: true,
    state,
    mutations,
    actions,
};

export default notesModule;