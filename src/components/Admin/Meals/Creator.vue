<template>
    <form @keydown="errors.clear($event.target.name)"
          @submit.prevent=""
    >

        <div class="row">
            <div class="col-sm-6">
                <div class="form-group"
                     :class="{ 'has-error': errors.has('code') }"
                >
                    <label for="code">Code</label>
                    <input type="text"
                           class="form-control"
                           id="code"
                           name="code"
                           v-model="form.code"
                           placeholder="M-CH-BL"
                    >
                    <error input="code" :errors="errors"></error>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group"
                     :class="{ 'has-error': errors.has('label') }"
                >
                    <label for="label">Label</label>
                    <input type="text"
                           class="form-control"
                           id="label"
                           name="label"
                           v-model="form.label"
                           placeholder="Chicken (Boneless)"
                    >
                    <error input="label" :errors="errors"></error>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-6">
                <div class="form-group"
                     :class="{ 'has-error': errors.has('meal_value') }"
                >
                    <label for="meal_value">Meal Value (1 or 2 meals worth of food)</label>
                    <input type="text"
                           class="form-control"
                           id="meal_value"
                           name="meal_value"
                           v-model="form.meal_value"
                    >
                    <error input="meal_value" :errors="errors"></error>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-6">
                <div class="form-group"
                     :class="{ 'has-error': errors.has('meats') }"
                >
                <h2>Meats</h2>
                    <admin-meat-selector v-for="(mealMeat, index) in form.meats"
                                         :key="index"
                                         v-model="form.meats[index]"
                                         @input="errors.clear('meats')"
                                         :deletable="true"
                                         @delete="removeMeat(index)"
                    >
                    </admin-meat-selector>
                    <button class="btn btn-block"
                            @click="form.meats.push({})"
                    >+</button>
                    <error input="meats" :errors="errors"></error>
                </div>
            </div>
            <div class="col-sm-6">
                <h2>Toppings</h2>
                <admin-topping-selector v-for="(mealTopping, index) in form.toppings"
                                        :key="index"
                                        v-model="form.toppings[index]"
                                        @input="errors.clear('toppings')"
                                        :deletable="true"
                                        @delete="removeTopping(index)"
                >
                </admin-topping-selector>
                <button class="btn btn-block"
                        @click="form.toppings.push({})"
                >+</button>
                <error input="toppings" :errors="errors"></error>
            </div>
        </div>



        <div class="row">
            <div class="col-sm-6">
                <label>&nbsp;</label>
                <button class="btn btn-success btn-block"
                        :disabled="errors.any()"
                        @click="save()"
                        v-if="! mode"
                >
                    Save
                </button>
                <button class="btn btn-primary btn-block"
                        :disabled="errors.any()"
                        @click="update()"
                        v-if="mode == 'EDIT'"
                >
                    Update
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
    import Form from '../../../models/Form';
    import swal from 'sweetalert2';

    import { mapGetters, mapState, mapActions, mapMutations } from 'vuex';
    import moment from 'moment';
    import * as mealActions from '../../../vuex/modules/meats/actionTypes';
    import * as mutations from '../../../vuex/modules/meats/mutationTypes';
    import * as toppingActions from "../../../vuex/modules/toppings/actionTypes";

    import AdminToppingSelector from '../Toppings/ToppingSelector.vue';
    import AdminMeatSelector from '../Meats/MeatSelector.vue';


    export default {
        components: {
            AdminToppingSelector,
            AdminMeatSelector,
        },
        data() {
            let form = {
                    code: '',
                    label: '',
                    meal_value: null,
                    meats: [],
                    toppings: [],
                };
            let formFields = Object.keys(form);
            return {
                errors: new FormErrors(formFields),
                form,
            };
        },
        methods: {
            fetchAll() {
                this.$store.dispatch('toppings/' + toppingActions.FETCH_ALL);
                this.$store.dispatch('meats/' + mealActions.FETCH_ALL);
            },
            removeTopping(index) {
                this.form.toppings.splice(index, 1);
            },
            removeMeat(index) {
                this.form.meats.splice(index, 1);
            },
            populateFormFromModel(meal) {
                this.form.code = meal.code;
                this.form.label = meal.label;
                this.form.meal_value = meal.meal_value;
                this.form.meats = meal.meats;
                this.form.toppings = meal.toppings;
            },
            save() {
                let vm = this;
                let meats = this.form.meats.map(meat => meat.id);
                let toppings = this.form.toppings.map(topping => topping.id);

                this.$store.dispatch('meals/' + mealActions.SAVE, {
                    ...this.form, meats, toppings
                }).then(response => {
                    vm.$emit('saved');
                }).catch(failedRequest => {
                    vm.errors.fill(failedRequest);
                });
            },
            update() {
                let vm = this;
                let meats = this.form.meats.filter(item => item.id).map(item => item.id);
                let toppings = this.form.toppings.filter(item => item.id).map(item => item.id);

                this.$store.dispatch('meals/' + mealActions.UPDATE, {
                    ...this.form, meats, toppings
                }).then(response => {
                    vm.$emit('updated');
                }).catch(failedRequest => {
                    vm.errors.fill(failedRequest);
                });
            }
        },
        computed: {
            ...mapState('meals', [
                'selected',
                'mode',
                'collection'
            ]),
        },
        mounted() {
            this.fetchAll();
            if (this.mode == 'EDIT') {
                this.populateFormFromModel(this.selected);
            }
        },
        watch: {
            selected(newSelected) {
                if (newSelected)
                    this.populateFormFromModel(newSelected);
            }
        }
    }
</script>

<style>

</style>