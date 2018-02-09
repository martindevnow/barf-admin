<template>
    <form @keydown="errors.clear($event.target.name)"
          @submit.prevent=""
    >
        <div class="row">
            <div class="col-sm-12">
                <div class="form-group"
                     :class="{ 'has-error': errors.has('pet_id') }"
                >
                    <label>Pet</label>
                    <admin-pet-selector v-model="form.pet"
                                        @input="errors.clear('pet_id')"
                    >
                    </admin-pet-selector>
                    <error input="pet_id" :errors="errors"></error>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <div class="form-group"
                     :class="{ 'has-error': errors.has('package_id') }"
                >
                    <label>Package</label>
                    <admin-package-selector v-model="form.pkg"
                                            @input="errors.clear('package_id')"
                    >
                    </admin-package-selector>
                    <error input="package_id" :errors="errors"></error>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-6">
                <div class="form-group"
                     :class="{ 'has-error': errors.has('shipping_cost') }"
                >
                    <label for="shipping_cost">shipping_cost</label>
                    <input type="text"
                           class="form-control"
                           id="shipping_cost"
                           name="shipping_cost"
                           v-model="form.shipping_cost"
                    >
                    <error input="shipping_cost" :errors="errors"></error>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group"
                     :class="{ 'has-error': errors.has('weekly_cost') }"
                >
                    <label for="weekly_cost">weekly_cost</label>
                    <input type="text"
                           class="form-control"
                           id="weekly_cost"
                           name="weekly_cost"
                           v-model="form.weekly_cost"
                    >
                    <error input="weekly_cost" :errors="errors"></error>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-6">
                <div class="form-group"
                     :class="{ 'has-error': errors.has('weeks_of_food_per_shipment') }"
                >
                    <label for="weeks_of_food_per_shipment">weeks_of_food_per_shipment</label>
                    <input type="text"
                           class="form-control"
                           id="weeks_of_food_per_shipment"
                           name="weeks_of_food_per_shipment"
                           v-model="form.weeks_of_food_per_shipment"
                    >
                    <error input="weeks_of_food_per_shipment" :errors="errors"></error>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group"
                     :class="{ 'has-error': errors.has('ships_every_x_weeks') }"
                >
                    <label for="ships_every_x_weeks">ships_every_x_weeks</label>
                    <input type="text"
                           class="form-control"
                           id="ships_every_x_weeks"
                           name="ships_every_x_weeks"
                           v-model="form.ships_every_x_weeks"
                    >
                    <error input="ships_every_x_weeks" :errors="errors"></error>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-6">
                <div class="form-group"
                     :class="{ 'has-error': errors.has('first_delivery_at') }"
                >
                    <label>First Delivery At</label>
                    <datepicker v-model="form.first_delivery_at"
                                id="first_delivery_at"
                                name="first_delivery_at"
                                format="yyyy-MM-dd"
                                input-class="form-control"
                                @selected="errors.clear('first_delivery_at')"
                    >
                    </datepicker>
                    <error input="first_delivery_at" :errors="errors"></error>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group"
                     :class="{ 'has-error': errors.has('payment_method') }"
                >
                    <label for="payment_method">payment_method</label>
                    <select v-model="form.payment_method"
                            class="form-control"
                            id="payment_method"
                            name="payment_method"
                            @change="errors.clear('payment_method')"
                    >
                        <option v-for="format in paymentFormats">{{ format }}</option>
                    </select>
                    <error input="payment_method" :errors="errors"></error>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-6">
                <div class="form-group"
                     :class="{ 'has-error': errors.has('delivery_address_id') }"
                >
                    <label>Delivery Address</label>
                    <admin-address-selector v-model="form.delivery_address"
                                        :userId="form.pet.owner ? form.pet.owner.id : 0"
                                        @input="errors.clear('delivery_address_id')"
                    >
                    </admin-address-selector>
                    <error input="delivery_address_id" :errors="errors"></error>
                </div>
            </div>
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
import swal from "sweetalert2";

import { mapGetters, mapState, mapActions, mapMutations } from 'vuex';
import moment from 'moment';
import Datepicker from 'vuejs-datepicker';
import { BasicSelect } from 'vue-search-select'

import * as packageActions from '../../../vuex/modules/packages/actionTypes';
import * as petActions from '../../../vuex/modules/pets/actionTypes';
import * as planActions from "../../../vuex/modules/plans/actionTypes";

import AdminAddressSelector from '../Addresses/AddressSelector.vue';
import AdminPackageSelector from '../Packages/PackageSelector.vue';
import AdminPetSelector from '../Pets/PetSelector.vue';

export default {
    components: {
        Datepicker,
        AdminAddressSelector,
        AdminPackageSelector,
        AdminPetSelector,
    },
    data() {
        let form = {
                delivery_address_id: 0,
                delivery_address: {},
                shipping_cost: 0,
                package_id: 0,
                pkg: {},
                pet_id: 0,
                pet: {},
                weekly_cost: 0,
                weeks_of_food_per_shipment: 1,
                ships_every_x_weeks: null,
                first_delivery_at: null,
                payment_method: 'cash',
            };
        let formFields = Object.keys(form);
            
        return {
            errors: new FormErrors(formFields),            
            form,
            paymentFormats: [
                'cash',
                'e-transfer',
                'stripe',
                'paypal',
                'interac',
            ],
        };
    },
    methods: {
        fetchAll() {
            this.$store.dispatch('pets/' + petActions.FETCH_ALL);
            this.$store.dispatch('packages/' + packageActions.FETCH_ALL);
        },
        save() {
            let vm = this;
            let first_delivery_at = this.form.first_delivery_at ? moment(this.form.first_delivery_at).format('YYYY-MM-DD') : null;

            this.$store.dispatch('plans/' + planActions.SAVE, {
                ...this.form,
                first_delivery_at,
                package_id: this.form.pkg.id,
                pet_id: this.form.pet.id,
                delivery_address_id: this.form.delivery_address.id,
            }).then(response => {
                vm.$emit('saved');
            }).catch(failedRequest => {
                vm.errors.fill(failedRequest);
            });
        },
        update() {
            let vm = this;
            let first_delivery_at = this.form.first_delivery_at ? moment(this.form.first_delivery_at).format('YYYY-MM-DD') : null;

            this.$store.dispatch('plans/' + planActions.UPDATE, {
                ...this.form,
                first_delivery_at,
                package_id: this.form.pkg.id,
                pet_id: this.form.pet.id,
                delivery_address_id: this.form.delivery_address.id,
            }).then(response => {
                vm.$emit('updated');
            }).catch(failedRequest => {
                vm.errors.fill(failedRequest);
            });
        },
        populateFormFromPlan(plan) {
            this.form.pet = plan.pet;
            this.form.pkg = plan.package;
            this.form.delivery_address = plan.delivery_address;

            this.form.shipping_cost = plan.shipping_cost;
            this.form.weekly_cost = plan.weekly_cost;
            this.form.weeks_of_food_per_shipment = plan.weeks_of_food_per_shipment;
            this.form.ships_every_x_weeks = plan.ships_every_x_weeks;
            this.form.activity_level = plan.activity_level;
            this.form.first_delivery_at = plan.first_delivery_at;
            this.form.payment_method = plan.payment_method;
        }
    },
    computed: {
        ...mapState('plans', [
            'collection',
            'mode',
            'selected',
            'show',
        ]),
        ...mapState('pets', {
            'pets': 'collection'
        }),
        ...mapState('packages', {
            'packages': 'collection'
        }),
    },
    mounted() {
        this.fetchAll();
        if (this.mode == 'EDIT') {
            this.populateFormFromPlan(this.selected);
        }
    },
    watch: {
        selected(newSelected) {
            if (newSelected)
                this.populateFormFromPlan(newSelected);
        }
    }
}
</script>

<style>

</style>