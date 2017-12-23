export class Auth {}

export const loadAuthFromData = function(data) {

};

export const resetAuth = function () {
    let auth = {
        isAuthenticated: false,
        access_token: null,
        expires_in: null,
        refresh_token: null,
        token_type: null,
        user: {},
    };

    return auth;
};