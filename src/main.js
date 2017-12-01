import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store';
import axios from 'axios';

Vue.config.productionTip = false;
window.axios = require('axios');

axios.defaults.baseURL = 'http://bb2.lan/';


/**
 * Dashboards
 */
Vue.component('admin-dashboard', require('./components/Admin/Dashboard/Dashboard.vue'));

Vue.component('admin-addresses-creator', require('./components/Admin/Addresses/Creator.vue'));
Vue.component('admin-address-selector', require('./components/Admin/Addresses/AddressSelector.vue'));

Vue.component('admin-meals-dashboard', require('./components/Admin/Meals/Dashboard.vue'));
Vue.component('admin-meals-creator', require('./components/Admin/Meals/Creator.vue'));
Vue.component('admin-meal-selector', require('./components/Admin/Meals/MealSelector.vue'));
Vue.component('admin-meal-plan-editor', require('./components/Admin/Packages/MealPlanEditor.vue'));

Vue.component('admin-meats-dashboard', require('./components/Admin/Meats/Dashboard.vue'));
Vue.component('admin-meats-creator', require('./components/Admin/Meats/Creator.vue'));
Vue.component('admin-meat-selector', require('./components/Admin/Meats/MeatSelector.vue'));

Vue.component('admin-notes-creator', require('./components/Admin/Notes/Creator.vue'));

Vue.component('admin-orders-dashboard', require('./components/Admin/Orders/Dashboard.vue'));
Vue.component('admin-orders-canceller', require('./components/Admin/Orders/OrderCanceller.vue'));

Vue.component('admin-packages-dashboard', require('./components/Admin/Packages/Dashboard.vue'));
Vue.component('admin-packages-creator', require('./components/Admin/Packages/Creator.vue'));
Vue.component('admin-package-selector', require('./components/Admin/Packages/PackageSelector.vue'));

Vue.component('admin-pets-dashboard', require('./components/Admin/Pets/Dashboard.vue'));
Vue.component('admin-pets-creator', require('./components/Admin/Pets/Creator.vue'));
Vue.component('admin-pet-selector', require('./components/Admin/Pets/PetSelector.vue'));

Vue.component('admin-plans-dashboard', require('./components/Admin/Plans/Dashboard.vue'));
Vue.component('admin-plans-creator', require('./components/Admin/Plans/Creator.vue'));
Vue.component('admin-plans-meal-replacement', require('./components/Admin/Plans/MealReplacement.vue'));

Vue.component('admin-products-dashboard', require('./components/Admin/Products/Dashboard.vue'));
Vue.component('admin-products-creator', require('./components/Admin/Products/Creator.vue'));
Vue.component('admin-product-selector', require('./components/Admin/Products/ProductSelector.vue'));

Vue.component('admin-purchase-orders-dashboard', require('./components/Admin/PurchaseOrders/Dashboard.vue'));
Vue.component('admin-purchase-order-builder', require('./components/Admin/PurchaseOrders/OrderBuilder.vue'));
Vue.component('admin-purchase-orders-dashboard', require('./components/Admin/PurchaseOrders/Dashboard.vue'));

Vue.component('admin-topping-selector', require('./components/Admin/Toppings/ToppingSelector.vue'));

Vue.component('admin-users-dashboard', require('./components/Admin/Users/Dashboard.vue'));
Vue.component('admin-users-creator', require('./components/Admin/Users/Creator.vue'));
Vue.component('admin-user-selector', require('./components/Admin/Users/UserSelector.vue'));



/**
 * Common Components
 */
Vue.component('admin-common-modal', require('./components/Admin/Common/Modal.vue'));

/**
 * Forms for Modals
 */
Vue.component('admin-payment-logger', require('./components/Admin/Orders/PaymentLogger.vue'));
Vue.component('admin-packed-logger', require('./components/Admin/Orders/PackedLogger.vue'));
Vue.component('admin-shipped-logger', require('./components/Admin/Orders/ShippedLogger.vue'));
Vue.component('admin-received-logger', require('./components/Admin/PurchaseOrders/ReceivedLogger.vue'));
Vue.component('admin-ordered-logger', require('./components/Admin/PurchaseOrders/OrderedLogger.vue'));



/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
