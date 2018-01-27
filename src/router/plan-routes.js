import PlansPage from '../views/Plans.vue'
import PlansCreateEditPage from '../views/Plans/CreateEditPage.vue';
import PlansMealReplacementPage from '../views/Plans/MealReplacementsPage.vue';

import PlansDashboard from '../components/Admin/Plans/Dashboard.vue';

export default {
    path: '/plans',
    component: PlansPage,
    children: [
        {
            path: '',
            name: 'Plans',
            component: PlansDashboard,
        },
        {
            path: 'create',
            name: 'PlanCreate',
            component: PlansCreateEditPage,
        },
        {
            path: ':id/edit',
            name: 'PlanEdit',
            component: PlansCreateEditPage,
        },
        {
            path: ':id/mealReplacements',
            name: 'PlanMealReplacements',
            component: PlansMealReplacementPage,
        }
    ]
};