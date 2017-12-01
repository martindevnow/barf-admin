import Vue from 'vue'
import Router from 'vue-router'
import HomeDashboard from '@/components/Admin/Dashboard/Dashboard.vue'
import MealsDashboard from '@/components/Admin/Meals/Dashboard.vue'
import MeatsDashboard from '@/components/Admin/Meats/Dashboard.vue'
import OrdersDashboard from '@/components/Admin/Orders/Dashboard.vue'
import PackagesDashboard from '@/components/Admin/Packages/Dashboard.vue'
import PetsDashboard from '@/components/Admin/Pets/Dashboard.vue'
import PlansDashboard from '@/components/Admin/Plans/Dashboard.vue'
import ProductsDashboard from '@/components/Admin/Products/Dashboard.vue'
import PurchaseOrdersDashboard from '@/components/Admin/PurchaseOrders/Dashboard.vue'
import UsersDashboard from '@/components/Admin/Users/Dashboard.vue'

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
    {
      path: '/meats',
      name: 'Meats',
      component: MeatsDashboard
    },
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
    {
      path: '/plans',
      name: 'Plans',
      component: PlansDashboard
    },
    {
      path: '/products',
      name: 'Products',
      component: ProductsDashboard
    },
    {
      path: '/purchase-orders',
      name: 'PurchaseOrders',
      component: PurchaseOrdersDashboard
    },
    {
      path: '/users',
      name: 'Users',
      component: UsersDashboard
    },
  ]
})
