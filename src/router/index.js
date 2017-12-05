import Vue from 'vue'
import Router from 'vue-router'
import HomeDashboard from '../components/Admin/Dashboard/Dashboard.vue'
import MealsDashboard from '../components/Admin/Meals/Dashboard.vue'

import meatRoutes from './meat-routes';

import OrdersDashboard from '../components/Admin/Orders/Dashboard.vue'
import PackagesDashboard from '../components/Admin/Packages/Dashboard.vue'
import PetsDashboard from '../components/Admin/Pets/Dashboard.vue'

import planRoutes from './plan-routes';
import productRoutes from './product-routes';

import PurchaseOrdersDashboard from '../components/Admin/PurchaseOrders/Dashboard.vue'
import PurchaseOrdersPage from '../views/PurchaseOrders.vue';
import UsersDashboard from '../components/Admin/Users/Dashboard.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeDashboard
    },
    {
      path: '/meals',
      name: 'Meals',
      component: MealsDashboard
    },

      { ...meatRoutes },
    {
      path: '/orders',
      name: 'Orders',
      component: OrdersDashboard
    },
    {
      path: '/packages',
      name: 'Packages',
      component: PackagesDashboard
    },
    {
      path: '/pets',
      name: 'Pets',
      component: PetsDashboard
    },

      { ...planRoutes },

      { ...productRoutes },

    {
      path: '/purchase-orders',
      name: 'PurchaseOrders',
      component: PurchaseOrdersPage
    },
    {
      path: '/users',
      name: 'Users',
      component: UsersDashboard
    },
  ]
})
