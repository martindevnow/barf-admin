<template>
    <div>
        <table class="table table-bordered table-responsive table-striped">
            <thead>
            <tr>
                <th v-bind:colspan="numColumns + 1">
                    <div class="row">
                        <div class="col-xs-6">
                            <div class="input-group">
                                <input type="text"
                                       class="form-control"
                                       v-model="sortable.filterKey"
                                />
                                <span class="input-group-addon">
                                    <i class="fa fa-search"></i>
                                </span>
                            </div>
                        </div>
                        <div class="col-xs-6">
                            <button class="btn btn-primary"
                                    @click="create()"
                            >
                                New
                            </button>
                        </div>
                    </div>
                </th>
            </tr>
            <tr>
                <th v-for="key in columns"
                    @click="sortBy(key)"
                    :class="{ active: sortable.sortKey == key }">
                    {{ key | capitalize }}
                    <span class="fa" :class="sortOrders[key] > 0 ? 'fa-sort-asc' : 'fa-sort-desc'">
                  </span>
                </th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="model in filteredData(collection)">
                <td>{{ model.label }}</td>
                <td>{{ model.code }}</td>
                <td>
                    <button class="btn btn-circle btn-xs"
                            :class="boolBtnClass(model.active)"
                    >
                        <i class="fa"
                           :class="boolIconClass(model.active)"
                        ></i>
                    </button>
                </td>
                <td>
                    <button class="btn btn-circle btn-xs"
                            :class="boolBtnClass(model.public)"
                    >
                        <i class="fa"
                           :class="boolIconClass(model.public)"
                        ></i>
                    </button>
                </td>
                <td>
                    <button class="btn btn-circle btn-xs"
                            :class="boolBtnClass(model.customization)"
                    >
                        <i class="fa"
                           :class="boolIconClass(model.customization)"
                        ></i>
                    </button>
                </td>
                <td>{{ model.level }}</td>
                <td>
                    <button class="btn btn-primary btn-xs"
                            @click="editMealPlan(model)"
                    >
                        Meals
                    </button>
                </td>
                <td>
                    <button class="btn btn-primary btn-xs"
                            @click="edit(model)"
                    >
                        <i class="fa fa-pencil"></i>
                    </button>
                    <button class="btn btn-danger btn-xs">
                        <i class="fa fa-trash"></i>
                    </button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import { mapGetters, mapState, mapActions } from 'vuex';
    import isSortable from '../../../mixins/isSortable';
    import * as packageActions from '../../../vuex/modules/packages/actionTypes';

    import AdminCommonModal from '../Common/Modal.vue';
    import AdminPackagesCreator from '../Packages/Creator.vue';
    import AdminMealPlanEditor from '../Packages/MealPlanEditor.vue';

    export default {
        components: {
            AdminCommonModal,
            AdminMealPlanEditor,
            AdminPackagesCreator,
        },
        mixins: [
            isSortable,
        ],
        data() {
            let columns = [
                'label',
                'code',
                'active',
                'public',
                'custom',
                'level',
                'meals',
            ];
            let numColumns = columns.length;
            let sortOrders = {};
            columns.forEach(function(key) {
                sortOrders[key] = 1;
            });

            return {
                columns: columns,
                numColumns: numColumns,
                sortOrders: sortOrders
            }
        },
        mounted() {
            this.fetchAll();
        },
        methods: {
            fetchAll() {
                this.$store.dispatch('packages/' + packageActions.FETCH_ALL);
            },
            create() {
                this.$store.dispatch('packages/' + packageActions.CREATE);
                this.$router.push({ name: 'PackageCreate'});
            },

            editMealPlan(model) {
                this.$store.dispatch('packages/' + packageActions.OPEN_MEAL_PLAN_EDITOR, model);
                this.$router.push({ name: 'PackageMealPlanEdit', params: {id: model.id} });
            },

            edit(model) {
                this.$store.dispatch('packages/' + packageActions.EDIT, model);
                this.$router.push({ name: 'PackageEdit', params: {id: model.id} });
            },
            boolIconClass(val) {
                if (val)
                    return 'fa-check';
                return 'fa-times';
            },
            boolBtnClass(val) {
                if (val)
                    return 'btn-success';
                return 'btn-danger';
            }
        },
        computed: {
            ...mapState('packages', [
                'collection',
                'show',
                'selected',
                'mode'
            ])
        }
    }
</script>

<style>

</style>