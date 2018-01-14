import PackagesPage from '../views/Packages.vue'
import PackagesCreateEditPage from '../views/Packages/CreateEditPage.vue';
import PackageMealPlanEditorPage from '../views/Packages/MealPlanEditorPage.vue';

import PackagesDashboard from '../components/Admin/Packages/Dashboard.vue';

export default {
    path: 'packages',
    component: PackagesPage,
    children: [
        {
            path: '',
            name: 'Packages',
            component: PackagesDashboard,
        },
        {
            path: 'create',
            name: 'PackageCreate',
            component: PackagesCreateEditPage,
        },
        {
            path: ':id/edit',
            name: 'PackageEdit',
            component: PackagesCreateEditPage,
        },
        {
            path: ':id/mealPlanEdit',
            name: 'PackageMealPlanEdit',
            component: PackageMealPlanEditorPage,
        },
    ]
};