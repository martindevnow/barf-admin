import Vue from 'vue'
import Router from 'vue-router'
import HomeDashboard from '@/components/Admin/Dashboard/Dashboard.vue'
import MealsDashboard from '@/components/Admin/Meals/Dashboard.vue'
import MeatsDashboard from '@/components/Admin/Meats/Dashboard.vue'
import OrdersDashboard from '@/components/Admin/Orders/Dashboard.vue'
import PackagesDashboard from '@/components/Admin/Packages/Dashboard.vue'
import PetsDashboard from '@/components/Admin/Pets/Dashboard.vue'

import PlansPage from '@/views/Plans.vue';
import PlansCreateEditPage from '@/views/Plans/CreateEdit.vue';
import PlansDashboard from '@/components/Admin/Plans/Dashboard.vue'
import PlansCreator from '@/components/Admin/Plans/Creator.vue';

import ProductsPage from '@/views/Products.vue';
import ProductsCreateEditPage from '@/views/Products/CreateEdit.vue';
import ProductsDashboard from '@/components/Admin/Products/Dashboard.vue'
import ProductsCreator from '@/components/Admin/Products/Creator.vue';

import PurchaseOrdersDashboard from '@/components/Admin/PurchaseOrders/Dashboard.vue'
import PurchaseOrdersPage from '@/views/PurchaseOrders.vue';
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
      path: '/plans/create',
      name: 'PlansCreate',
      component: PlansCreateEditPage
    },
      {
          path: '/plans/:id/edit',
          // name: 'PlansEdit',
          component: PlansPage,
          children: [
              {
                  path: '',
                  name: 'PlansEdit',
                  component: PlansCreateEditPage,
              }
          ]
      },
    {
      path: '/products',
      name: 'Products',
      component: ProductsDashboard,
    },
    {
      path: '/peroducts/create',
      name: 'ProductsCreate',
      component: ProductsCreateEditPage,
    },
    {
      path: '/products/:id/edit',
      // name: 'ProductsEdit',
        component: ProductsPage,
        children: [
            {
                path: '',
                name: 'ProductsEdit',
                component: ProductsCreateEditPage,
            }
        ]
    },
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
