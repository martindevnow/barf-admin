<template>
    <form @keydown="errors.clear($event.target.name)"
          @submit.prevent=""
    >

        <div class="row">
            <div class="col-sm-6">
                <h2>Breakfasts</h2>

                <div class="form-group"
                     v-for="(bfast, index) in breakfasts"
                     :class="{ 'has-error': errors.has('meal_id_' + bfast) }"
                >
                    <label>Day {{ index + 1 }}</label>
                    <admin-meal-selector :key="bfast"
                                         v-model="form.meals[bfast]"
                                         @input="errors.clear('meal_id_' + bfast)"
                                         :deletable="true"
                                         @delete="removeMeal(bfast)"
                    >
                    </admin-meal-selector>
                    <error input="received_at" :errors="errors"></error>
                    <span class="help-block">{{ errors.get('meal_id_' + bfast) }}</span>
                </div>

            </div>
            <div class="col-sm-6">

                <h2>Dinners</h2>

                <div class="form-group"
                     v-for="(dinner, index) in dinners"
                     :class="{ 'has-error': errors.has('meal_id_' + dinner) }"
                >
                    <label>Day {{ index + 1 }}</label>
                    <admin-meal-selector :key="dinner"
                                         v-model="form.meals[dinner]"
                                         @input="errors.clear('meal_id_' + dinner)"
                                         :deletable="true"
                                         @delete="removeMeal(dinner)"
                    >
                    </admin-meal-selector>
                    <error input="received_at" :errors="errors"></error>
                    <span class="help-block">{{ errors.get('meal_id_' + dinner) }}</span>
                </div>


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
    import swal from 'sweetalert2';
    
    import { mapGetters, mapState, mapActions, mapMutations } from 'vuex';
    import * as mealActions from "../../../vuex/modules/meals/actionTypes";
    import * as packageActions from "../../../vuex/modules/packages/actionTypes";
    import * as packageMutations from "../../../vuex/modules/packages/mutationTypes";
    import AdminMealSelector from '../Meals/MealSelector.vue';

    export default {
        components: {
            AdminMealSelector
        },
        data() {
            let form = {
                package_id: null,
                meals: {
                    B1: {},
                    B2: {},
                    B3: {},
                    B4: {},
                    B5: {},
                    B6: {},
                    B7: {},
                    D1: {},
                    D2: {},
                    D3: {},
                    D4: {},
                    D5: {},
                    D6: {},
                    D7: {},
                    }
            };
            let formFields = [ ... Object.keys(form.meals)
                .map(meal_abbreviation => 'meal_id_' + meal_abbreviation ),
                'package_id'
            ];
                     
            return {
                errors: new FormErrors(formFields),
                form,
                breakfasts: [
                    'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7',
                ],
                dinners: [
                    'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7',
                ]
            };
        },
        methods: {
            fetchAll() {
                this.$store.dispatch('meals/' + mealActions.FETCH_ALL);
            },
            removeMeal(key) {
                this.form.meals[key] = {};
            },
            populateFormFromPackage(pkg) {
                let vm = this;

                this.form.package_id = pkg.id;
                pkg.meals.forEach(meal => {
                    vm.form.meals[meal.calendar_code] = meal;
                });
            },
            buildMealPlan() {
                let meals = [];
                for (let cal_code in this.form.meals) {
                    if (this.form.meals[cal_code].id) {
                        meals.push({
                            ...this.form.meals[cal_code],
                            calendar_code: cal_code,
                        });
                    }
                }
                return meals;
            },
            save() {
                let vm = this;
                let meals = this.buildMealPlan();
                this.$store.dispatch('packages/' + packageActions.SAVE_MEAL_PLAN, {
                    ...this.form,
                    meals
                }).then(response => {
                    vm.$emit('saved');
                    swal('Done', 'Thank you', 'success');
                })
                .catch(failedRequest => {
                    swal('Error', 'Something went wrong...', 'error');
                    vm.errors.fill(failedRequest);
                });
            },
        },
        computed: {
            ...mapState('packages', [
                'selected'
            ]),
            ...mapState('meals', {
                'meals': 'collection',
            }),
            mealsSelect() {
                return this.meals.map(model => {
                    return { value: model.id, text: model.label + ' (' + model.id + ')' };
                });
            },
        },
        mounted() {
            this.fetchAll();
            this.populateFormFromPackage(this.selected);
        },
        watch: {
            selected(newSelected) {
                if (newSelected)
                    this.populateFormFromPackage(newSelected);
            }
        }
    }
</script>

<style>

</style>