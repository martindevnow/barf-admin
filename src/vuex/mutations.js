import {resetAuth} from "../models/Auth";
export default {
    isAuthenticated (state, payload) {
        state.auth.isAuthenticated = payload.isAuthenticated
    },
    tokenData (state, payload) {
        state.auth = {...state.auth, ...payload};
        axios.defaults.headers.common['Authorization'] =
            state.auth.token_type + ' ' + state.auth.access_token;
    },
    authUser (state, payload) {
        state.auth.user = {...payload};
    },
    logout (state) {
        state.auth = resetAuth();
    }
}