import axios from 'axios'
import store from './vuex/store'

const baseUrl = process.env.BARF_API_BASE + '/';

// Instance
let http = axios.create({
  baseURL: baseUrl,
  headers: {
  }
});

// Add a request interceptor
http.interceptors.request.use(function (config) {
  config.headers.common['Authorization'] = `Bearer ${store.state.auth.access_token}`;
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
http.interceptors.response.use(function (response) {
  return response
}, function (error) {
  console.log('== API Error ==');
  // console.log({error});
  if (error.response && error.response.status === 401 && store.state.auth.access_token) {
    store.dispatch('logout', false)
  }
  return Promise.reject(error)
})

export default http
