import ProductsPage from '../views/Products.vue'
import ProductsCreateEditPage from '../views/Products/CreateEditPage.vue';

import ProductsDashboard from '../components/Admin/Products/Dashboard.vue';

export default {
    path: '/products',
    component: ProductsPage,
    children: [
        {
            path: '',
            name: 'Products',
            component: ProductsDashboard,
        },
        {
            path: 'create',
            name: 'ProductCreate',
            component: ProductsCreateEditPage,
        },
        {
            path: ':id/edit',
            name: 'ProductEdit',
            component: ProductsCreateEditPage,
        },
    ]
};