import PetsPage from '../views/Pets.vue'
import PetsCreateEditPage from '../views/Pets/CreateEditPage.vue';

import PetsDashboard from '../components/Admin/Pets/Dashboard.vue';

export default {
    path: 'pets',
    component: PetsPage,
    children: [
        {
            path: '',
            name: 'Pets',
            component: PetsDashboard,
        },
        {
            path: 'create',
            name: 'PetCreate',
            component: PetsCreateEditPage,
        },
        {
            path: ':id/edit',
            name: 'PetEdit',
            component: PetsCreateEditPage,
        }
    ]
};