// Import the App
import Vue from 'vue'

// Import Routing
import Router from 'vue-router'

// Route Riles
import mealRoutes from './meal-routes';
import meatRoutes from './meat-routes';
import packageRoutes from './package-routes';
import petRoutes from './pet-routes';
import planRoutes from './plan-routes';
import productRoutes from './product-routes';
import userRoutes from './user-routes';

// Other Components
import LoginForm from '../components/Auth/LoginForm.vue';
import LogoutPage from '../views/LogoutPage.vue';

import HomeDashboard from '../components/Admin/Dashboard/Dashboard.vue'
import OrdersDashboard from '../components/Admin/Orders/Dashboard.vue'
import PurchaseOrdersPage from '../views/PurchaseOrders.vue';

// Add the router to the App
Vue.use(Router);

export default new Router({
    routes: [

        {
            path: '/',
            name: 'Home',
            component: HomeDashboard
        },
        {
            path: '/login',
            name: 'Login',
            component: LoginForm,
        },
        {
            path: '/logout',
            name: 'Logout',
            component: LogoutPage,
        },

        { ...mealRoutes },

        { ...meatRoutes },

        {
            path: '/orders',
            name: 'Orders',
            component: OrdersDashboard
        },

        { ...packageRoutes },

        { ...petRoutes },

        { ...planRoutes },

        { ...productRoutes },

        {
            path: '/purchase-orders',
            name: 'PurchaseOrders',
            component: PurchaseOrdersPage
        },
        { ...userRoutes },
    ]
})
