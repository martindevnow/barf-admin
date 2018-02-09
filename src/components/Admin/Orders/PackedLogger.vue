<template>
    <form @keydown="errors.clear($event.target.name)"
          @submit.prevent=""
    >
        <div class="row">
            <div class="col-sm-12">
                <p>Note: if you update the package or # of weeks packed here, it will update their Order for this shipment.</p>
                <p>It will <b>not</b> change their plan.</p>
            </div>
        </div>


        <div class="row">
            <div class="col-sm-6">
                <div class="form-group"
                     v-bind:class="{'has-error': errors.has('weeks_packed') }"
                >
                    <label for="weeks_packed">Weeks Packed</label>
                    <input type="text" class="form-control"
                           id="weeks_packed"
                           name="weeks_packed"
                           v-model="form.weeks_packed"
                    >
                    <error input="weeks_packed" :errors="errors"></error>
                </div>

            </div>
            <div class="col-sm-6">
                <div class="form-group"
                     v-bind:class="{'has-error': errors.has('packed_package_id') }"
                >
                    <label>Package</label>
                    <admin-package-selector v-model="form.packed_package"
                                            @input="errors.clear('packed_package_id')"
                    >
                    </admin-package-selector>
                    <error input="packed_package_id" :errors="errors"></error>
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
import * as packageActions from '../../../vuex/modules/packages/actionTypes';
import * as orderMutations from "../../../vuex/modules/orders/mutationTypes";
import * as orderActions from "../../../vuex/modules/orders/actionTypes";
import AdminPackageSelector from "../Packages/PackageSelector.vue";

export default {
    components: {
        AdminPackageSelector
    },
    data() {
        let form = {
            weeks_packed: 0,
            package_id: null,
            packed_package: {},
            packed_package_id: 0,
        }
        let formFields = Object.keys(form);
        return {
            errors: new FormErrors(formFields),            
            form,
        };
    },
    methods: {
        fetchAll() {
            this.$store.dispatch('packages/' + packageActions.FETCH_ALL);
        },
        save() {
            if (! this.form.packed_package) {
                return swal('Error', 'You must specify a package.', 'error');
            }
            let vm = this;
            let payload = { ... this.form };
            payload.packed_package_id = this.form.packed_package.id;
            delete payload.packed_package;

            this.$store.dispatch('orders/' + orderActions.SAVE_PACKED, payload)
            .then(response => {
                vm.close();
            }).catch(failedRequest => {
                vm.errors.fill(failedRequest);
            });
        },
        close() {
            this.$store.dispatch('orders/' + orderActions.CLOSE_PACKED_LOGGER)
            this.$router.push({name: 'Orders'});
        }
    },
    computed: {
        ...mapState('orders', [
            'show',
            'selected',
        ]),
        ...mapState('packages', {
            'packages': 'collection'
        }),
        ...mapGetters('packages', [
            'getPackageById',
        ]),
    },
    mounted() {
        this.fetchAll();
        this.form.weeks_packed = this.selected.plan.weeks_of_food_per_shipment;
        this.form.package_id = this.selected.packed_package_id;
        this.form.packed_package_id = this.selected.packed_package_id
            || this.selected.plan.package_id;
        this.form.packed_package = this.getPackageById(this.form.packed_package_id);
    }
}
</script>

<style>
span.label {
    color: black;
}
</style>