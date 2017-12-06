import UsersPage from '../views/Users.vue'
import UsersCreateEditPage from '../views/Users/CreateEditPage.vue';

import UsersDashboard from '../components/Admin/Users/Dashboard.vue';

export default {
    path: '/users',
    component: UsersPage,
    children: [
        {
            path: '',
            name: 'Users',
            component: UsersDashboard,
        },
        {
            path: 'create',
            name: 'UserCreate',
            component: UsersCreateEditPage,
        },
        {
            path: ':id/edit',
            name: 'UserEdit',
            component: UsersCreateEditPage,
        }
    ]
};