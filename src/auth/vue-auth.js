import axios from 'axios';

const baseUrl = process.env.BARF_API_BASE + '/';
const apiSecret = process.env.BARF_API_SECRET;
const clientId = process.env.BARF_API_CLIENT_ID;

const vueAuth = {
    baseUrl:        baseUrl, // Your API domain
    clientId:       clientId,
    loginUrl:       '/oauth/token',
    tokenName:      'access_token',
    tokenUrl:       baseUrl + '/oauth/token',
};

const vueAuthTokenBody = {
    grant_type: 'password',
    client_id: clientId,
    client_secret: apiSecret,
    scope: '',
}

export { vueAuth, vueAuthTokenBody };