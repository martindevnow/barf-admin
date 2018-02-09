<template>
    <form @keydown="errors.clear($event.target.name)"
          @submit.prevent=""
    >
        <div class="row">
            <div class="col-sm-12">
                <p>Note: if you update the package or # of weeks shipped here, it will update their Order for this shipment.</p>
                <p>It will not change their plan.</p>
            </div>
        </div>


        <div class="row">
            <div class="col-sm-6">
                <div class="form-group"
                     v-bind:class="{'has-error': errors.has('weeks_shipped') }"
                >
                    <label for="weeks_shipped">Weeks Shipped</label>
                    <input type="text" class="form-control"
                           id="weeks_shipped"
                           name="weeks_shipped"
                           v-model="form.weeks_shipped"
                    >
                </div>
                <error input="weeks_shipped" :errors="errors"></error>
            </div>
            <div class="col-sm-6">
                <div class="form-group"
                     v-bind:class="{'has-error': errors.has('shipped_package_id') }"
                >
                    <label>Package</label>
                    <admin-package-selector v-model="form.shipped_package"
                                            @input="errors.clear('shipped_package_id')"
                    >
                    </admin-package-selector>
                    <error input="shipped_package_id" :errors="errors"></error>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-6">
                <div class="form-group"
                     v-bind:class="{'has-error': errors.has('shipped_at') }"
                >
                    <label>Date Shipped</label>
                    <datepicker v-model="form.shipped_at"
                                id="shipped_at"
                                format="yyyy-MM-dd"
                                input-class="form-control"
                    >
                    </datepicker>
                </div>
                <error input="shipped_at" :errors="errors"></error>
            </div>
            <div class="col-sm-6">
                <div class="form-group"
                     v-bind:class="{'has-error': errors.has('courier_id') }"
                >
                    <label for="courier_id">Courier</label>
                    <select v-model="form.courier_id"
                            class="form-control"
                            id="courier_id"
                            @change="errors.clear('courier_id')"
                    >
                        <option v-for="courier in couriers"
                                :value="courier.id"
                        >{{ courier.label }}</option>
                    </select>
                    <error input="courier_id" :errors="errors"></error>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-6">
                <button class="btn btn-success btn-block"
                        @click="save()"
                >
                    Save
                </button>
            </div>
            <div class="col-sm-6">
                <button class="btn btn-outline-danger btn-block"
                        @click="close()"
                >
                    Cancel
                </button>
            </div>
        </div>
    </form>
</template>

<script>


import FormErrors from '../../../models/FormErrors';
import swal from "sweetalert2";
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';
import Datepicker from 'vuejs-datepicker';
import moment from 'moment';
import * as courierActions from "../../../vuex/modules/couriers/actionTypes";
import * as packageActions from "../../../vuex/modules/packages/actionTypes";
import * as orderActions from "../../../vuex/modules/orders/actionTypes";
import AdminPackageSelector from '../Packages/PackageSelector.vue';

export default {
    components: {
        AdminPackageSelector,
        Datepicker,
    },
    data() {
        let form = {
                weeks_shipped: null,
                package_id: null,
                shipped_package: {},
                shipped_package_id: null,
                shipped_at: null,
                courier_id: null,
            };
        let formFields = Object.keys(form);
            
        return {
            errors: new FormErrors(formFields),            
            form,
        };
    },
    methods: {
        fetchAll() {
            this.$store.dispatch('couriers/' + courierActions.FETCH_ALL);
            this.$store.dispatch('packages/' + packageActions.FETCH_ALL);
        },
        hasErrorClass(field) {
            return this.errors.has(field) ? 'has-error' : '';
        },
        save() {
            let vm = this;
            let requestBody = {
                ...this.form,
                shipped_at:             moment(this.form.shipped_at).format('YYYY-MM-DD'),
                weeks_shipped:          this.form.weeks_shipped,
                shipped_package_id:     this.form.shipped_package.id,
            };
            delete requestBody.shipped_package;
            this.$store.dispatch('orders/' + orderActions.SAVE_SHIPPED,
                requestBody
            ).then(response => {
                vm.close();
            }).catch(failedRequest => {
                vm.errors.fill(failedRequest);
            });
        },
        close() {
            this.$store.dispatch('orders/' + orderActions.CLOSE_SHIPPED_LOGGER)
            this.$router.push({name: 'Orders'});
            }
    },
    computed: {
        ...mapState('orders', [
            'selected',
        ]),
        ...mapState('couriers', {
            'couriers': 'collection',
        }),
        ...mapState('packages', {
            'packages': 'collection',
        }),
        ...mapGetters('packages', [
            'getPackageById',
        ]),
    },
    mounted() {
        this.fetchAll();
        this.form.shipped_at = new Date();
        this.form.package_id = this.selected.shipped_package_id
            || this.selected.packed_package_id
            || this.selected.plan.package_id;
        this.form.weeks_shipped = this.selected.weeks_shipped
            || this.selected.weeks_packed
            || this.selected.plan.weeks_of_food_per_shipment;
        this.form.shipped_package = this.getPackageById(this.form.package_id);
    }
}
</script>

<style>
span.label {
    color: black;
}
</style>