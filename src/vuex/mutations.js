import {resetAuth} from "../models/Auth";
export default {
    isAuthenticated (state, payload) {
        state.auth.isAuthenticated = payload.isAuthenticated
    },
    tokenData (state, payload) {
        state.auth = {...state.auth, ...payload};
        // console.log('setting axios default header for auth');
        // axios.defaults.headers.common['Authorization'] =
        //     state.auth.token_type + ' ' + state.auth.access_token;
    },
    authUser (state, payload) {
        state.auth.user = {...payload};
    },
    persistUser(state) {
    },
    logout (state) {
        state.auth = resetAuth();
    },
    loadUser (state) {
        // if (state.auth) {
        //     state.auth = auth;
        // }
        // axios.defaults.headers.common['Authorization'] =
        //     auth.token_type + ' ' + auth.access_token;
    },
}
