<template>
    <div class="content-body">
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
            <tr v-for="meal in filteredData(collection)">
                <td>({{ meal.id }}) {{ meal.label }} <br />
                    {{ meal.code }}</td>
                <td>
                    <ul>
                        <li v-for='meat in meal.meats'  style="color: red">{{ meat.type + ' (' + meat.variety + ')'}}</li>
                        <li v-for='topping in meal.toppings' style="color: blue">{{ topping.label }}</li>
                    </ul>
                </td>
                <td>${{ meal.cost_per_lb }}</td>

                <td>
                    <button class="btn btn-primary btn-sm"
                            @click="edit(meal)"
                    >
                        <i class="fa fa-pencil"></i>
                    </button>
                    <button class="btn btn-danger btn-sm">
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
    import * as mealActions from '../../../vuex/modules/meats/actionTypes';
    import * as mealMutations from '../../../vuex/modules/meats/mutationTypes';
    import AdminCommonModal from '../Common/Modal.vue';
    import AdminMealsCreator from '../Meals/Creator.vue';

    export default {
        components: {
            AdminCommonModal,
            AdminMealsCreator,
        },
        mixins: [
            isSortable,
        ],
        data() {
            let columns = [
                'label',
                'contents',
                'costPerLb',
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
                this.$store.dispatch('meals/' + mealActions.FETCH_ALL);
            },
            create() {
                this.$store.dispatch('meals/' + mealActions.CREATE);
                this.$router.push({ name: 'MealCreate' });
            },
            edit(model) {
                this.$store.dispatch('meals/' + mealActions.EDIT, model);
                this.$router.push({ name: 'MealEdit', params: { id: model.id } });
            },
        },
        computed: {
            ...mapState('meals', [
                'collection',
                'selected',
                'mode'
            ])
        }
    }
</script>

<style>
.content-body {
    padding: 1rem;
}
</style>