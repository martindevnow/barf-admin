import MealsPage from '../views/Meals.vue'
import MealsCreateEditPage from '../views/Meals/CreateEditPage.vue';

import MealsDashboard from '../components/Admin/Meals/Dashboard.vue';

export default {
    path: '/meals',
    component: MealsPage,
    children: [
        {
            path: '',
            name: 'Meals',
            component: MealsDashboard,
        },
        {
            path: 'create',
            name: 'MealCreate',
            component: MealsCreateEditPage,
        },
        {
            path: ':id/edit',
            name: 'MealEdit',
            component: MealsCreateEditPage,
        }
    ]
};