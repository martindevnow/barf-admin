import MeatsPage from '../views/Meats.vue'
import MeatsCreateEditPage from '../views/Meats/CreateEditPage.vue';

import MeatsDashboard from '../components/Admin/Meats/Dashboard.vue';

export default {
    path: '/meats',
    component: MeatsPage,
    children: [
        {
            path: '',
            name: 'Meats',
            component: MeatsDashboard,
        },
        {
            path: 'create',
            name: 'MeatCreate',
            component: MeatsCreateEditPage,
        },
        {
            path: ':id/edit',
            name: 'MeatEdit',
            component: MeatsCreateEditPage,
        }
    ]
};