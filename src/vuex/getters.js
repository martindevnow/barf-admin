import {VueAuthenticate} from "vue-authenticate";
import {vueAuth} from '../main';

export const isAuthenticated = () => {
    return vueAuth.isAuthenticated()
};