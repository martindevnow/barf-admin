<template>
    <form @keydown="errors.clear($event.target.name)"
          @submit.prevent=""
    >

        <div class="row">
            <div class="col-sm-6">
                <h3>{{ selected.package.label }} Bento</h3>
                <!--<div class="row">-->
                    <button class="btn btn-block btn-xs" disabled
                            :class="{ 'btn-warning': isReplaced(meal),
                             'btn-default': !isReplaced(meal) }"
                            v-for="meal in selected.package.meals">
                        {{ meal.label }} - {{ meal.pivot.calendar_code }}
                    </button>
                <!--</div>-->
            </div>
            <div class="col-sm-6">
                <h3>Customized for {{ selected.pet.name }}</h3>
                <!--<div class="row">-->
                    <button class="btn btn-block btn-xs btn-default" disabled

                            v-for="meal in selected.meals">
                        {{ meal.label }} - {{ meal.pivot.calendar_code }}
                    </button>
                <!--</div>-->
            </div>
        </div>

        <div class="row">
            <div class="col-sm-12">
                <h3>Replacements</h3>
                <div class="row">
                    <div class="col-sm-12" v-for="repl in selected.meal_replacements">
                        {{ getMealById(repl.removed_meal_id).label }} => {{ getMealById(repl.added_meal_id).label }}
                        <button class="btn btn-xs btn-danger"
                                @click="deleteReplacement(repl.id)"
                        >
                            <i class="fa fa-times"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>


        <div class="row">
            <div class="col-sm-6">
                <div class="form-group">
                    <h3>Meal to Remove</h3>
                    <admin-meal-selector v-model="form.removed_meal"></admin-meal-selector>
                </div>
            </div>
            <div class="col-sm-6">
                <h3>Meal to Add</h3>
                <admin-meal-selector v-model="form.added_meal"></admin-meal-selector>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-6">
                <label>&nbsp;</label>
                <button class="btn btn-success btn-block"
                        :disabled="errors.any()"
                        @click="save()"
                >
                    Save
                </button>
            </div>
            <div class="col-sm-6">
                <label>&nbsp;</label>
                <button class="btn btn-default btn-block"
                        @click="$emit('cancelled')"
                >
                    Cancel
                </button>
            </div>
        </div>

    </form>
</template>

<script>
    import { mapGetters, mapState, mapActions, mapMutations } from 'vuex';
    import hasErrors from '../../../mixins/hasErrors';
    import * as mealActions from "../../../vuex/modules/meals/actionTypes";

    import AdminMealSelector from '../Meals/MealSelector.vue';
    import * as planActions from "../../../vuex/modules/plans/actionTypes";

    export default {
        components: {
            AdminMealSelector,
        },
        mixins: [
            hasErrors
        ],
        data() {
            return {
                form : {
                    removed_meal: {},
                    added_meal: {},
                },
            };
        },
        methods: {
            fetchAll() {
                this.$store.dispatch('meals/' + mealActions.FETCH_ALL);
            },
            save() {
                let vm = this;
                this.$store.dispatch('plans/' + planActions.SAVE_MEAL_REPLACEMENT, {
                    removed_meal_id: vm.form.removed_meal.id,
                    added_meal_id: vm.form.added_meal.id,
                }).then(response => {
                    console.log(response);
                    vm.$emit('saved');
                }).catch(error => {
                    console.log(error);
                });
            },
            getMealById(meal_id) {
                return this.collection.filter(meal => {
                    return meal.id === meal_id;
                })[0];
            },
            deleteReplacement(id) {
                this.$store.dispatch('plans/' + planActions.DELETE_MEAL_REPLACEMENT,
                    id
                ).then(response => {
                    alert('Removed');
                }).catch(error => {
                    alert('Error');
                });
            },
            isReplaced(meal) {
                if (! this.selected.meal_replacements.length) {
                    console.log('no meal replacements');
                    return false;
                }

                return this.selected.meal_replacements.filter(repl => {
                    return repl.removed_meal_id == meal.id
                }).length;
            },
//            isSubstituted(meal) {
//                if (! this.selected.meal_replacements.length)
//                    return false;
//
//                return this.selected.meal_replacements.filter(repl => {
//                    return repl.added_meal_id == meal.id
//                }).length;
//            }
        },
        computed: {
            ...mapState('plans', [
                'show',
                'selected',
            ]),
            ...mapState('meals', [
                'collection'
            ])
        },
        mounted() {
            this.fetchAll();
        }
    }
</script>

<style>

</style>