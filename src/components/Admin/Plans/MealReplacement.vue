<template>
    <form @keydown="errors.clear($event.target.name)"
          @submit.prevent=""
    >

        <div class="row">
            <div class="col-sm-6">
                <h3>{{ selected.package.label }} Bento</h3>
                <!--<div class="row">-->
                    <button v-for="meal in selected.package.meals"
                            class="btn btn-block btn-sm" disabled
                            :class="{ 'btn-warning': isReplaced(meal),
                             'btn-outline-danger': !isReplaced(meal) }"
                    >
                        {{ meal.label }} - {{ meal.pivot.calendar_code }}
                    </button>
                <!--</div>-->
            </div>
            <div class="col-sm-6">
                <h3>Customized for {{ selected.pet.name }}</h3>
                <!--<div class="row">-->
                    <button v-for="meal in customMeals"
                            class="btn btn-block btn-sm btn-outline-danger" disabled
                            :class="{ 'btn-success': meal.subbed,
                                'btn-outline-danger': ! meal.subbed }"

                    >
                        {{ meal.label }} - {{ meal.pivot.calendar_code }}
                    </button>
                <!--</div>-->
            </div>
        </div>

        <div class="row">
            <div class="col-sm-12">
                <h3>Replacements</h3>
                <div class="row" v-for="repl in selected.meal_replacements">
                    <div class="col-sm-5">
                        <button class="btn btn-outline-danger btn-sm btn-block" disabled>
                            {{ getMealById(repl.removed_meal_id).label }}
                        </button>
                    </div>
                    <div class="col-sm-1">
                        <button class="btn btn-sm btn-block" disabled>=></button>
                    </div>
                    <div class="col-sm-5">
                        <button class="btn btn-outline-danger btn-sm btn-block" disabled>
                            {{ getMealById(repl.added_meal_id).label }}
                        </button>
                    </div>
                    <div class="col-sm-1">
                        <button class="btn btn-sm btn-danger"
                                @click="deleteReplacement(repl)"
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
                    <error input="removed_meal_id" :errors="errors"></error>
                </div>
            </div>
            <div class="col-sm-6">
                <h3>Meal to Add</h3>
                <admin-meal-selector v-model="form.added_meal"></admin-meal-selector>
                <error input="added_meal_id" :errors="errors"></error>
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
                <button class="btn btn-outline-danger btn-block"
                        @click="$emit('cancelled')"
                >
                    Cancel
                </button>
            </div>
        </div>

    </form>
</template>

<script>
    import FormErrors from '../../../models/FormErrors';
    import { mapGetters, mapState, mapActions, mapMutations } from 'vuex';
    import * as mealActions from "../../../vuex/modules/meals/actionTypes";

    import AdminMealSelector from '../Meals/MealSelector.vue';
    import * as planActions from "../../../vuex/modules/plans/actionTypes";

    export default {
        components: {
            AdminMealSelector,
        },
        data() {
            let form = {
                    removed_meal: {},
                    added_meal: {},
                };
            let formFields = Object.keys(form);
            return {
                errors: new FormErrors(formFields),
                form,
                customMeals: null,
            };
        },
        methods: {
            fetchAll() {
                return this.$store.dispatch('meals/' + mealActions.FETCH_ALL);
            },
            save() {
                let vm = this;
                this.$store.dispatch('plans/' + planActions.SAVE_MEAL_REPLACEMENT, {
                    removed_meal_id: vm.form.removed_meal.id,
                    added_meal_id: vm.form.added_meal.id,
                }).then(response => {
                    console.log(response);
                    vm.loadCustomMenu();

                    vm.$emit('saved');
                }).catch(error => {
                    console.log(error);
                });
            },
            deleteReplacement(meal_replacement) {
                this.$store.dispatch('plans/' + planActions.DELETE_MEAL_REPLACEMENT, {
                    mr_id: meal_replacement.id,
                    plan_id: meal_replacement.plan_id,
                }).then(response => {
                    vm.loadCustomMenu();
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
            loadCustomMenu() {
                let vm = this;
                this.customMeals = this.getPackageById(this.selected.package_id).meals;

                if (! this.selected.meal_replacements.length)
                    return meals;

                this.selected.meal_replacements.forEach(repl => {
                    vm.customMeals = vm.customMeals.map(meal => {
                        if (meal.id === repl.removed_meal_id) {
                            let newMeal = vm.getMealById(repl.added_meal_id);
                            newMeal.subbed = true;
                            newMeal.pivot = { ...meal.pivot };
                            return newMeal;
                        }

                        return meal;
                    });
                });
            }

        },
        computed: {
            ...mapState('plans', [
                'show',
                'selected',
            ]),
            ...mapState('meals', [
                'collection'
            ]),
            ...mapGetters('packages', [
                'getPackageById',
            ]),
            ...mapGetters('meals', [
                'getMealById',
            ]),

        },
        mounted() {
            let vm = this;
            this.fetchAll().then(() => {
                vm.loadCustomMenu();
            });

        }
    }
</script>

<style>

</style>