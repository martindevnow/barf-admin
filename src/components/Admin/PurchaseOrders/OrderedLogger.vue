<template>
    <form @keydown="errors.clear($event.target.name)"
          @submit.prevent=""
    >
        <div class="row">

            <div class="col-sm-6">
                <div class="form-group"
                     v-bind:class="{'has-error': errors.has('ordered_at') }"
                >
                    <label>Ordered At</label>
                    <datepicker v-model="form.ordered_at"
                                id="ordered_at"
                                name="ordered_at"
                                format="yyyy-MM-dd"
                                input-class="form-control"
                    >
                    </datepicker>
                    <error input="ordered_at" :errors="errors"></error>
                </div>
            </div>

            <div class="col-sm-6">
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
            </div>
        </div>

    </form>
</template>

<script>
    import FormErrors from '../../../models/FormErrors';
    import swal from "sweetalert2";
    
    import { mapState, mapActions } from 'vuex';
    import Datepicker from 'vuejs-datepicker';
    import moment from 'moment';
    import * as purchaseOrderActions from "../../../vuex/modules/purchase-orders/actionTypes";
    import * as purchaseOrderMutations from "../../../vuex/modules/purchase-orders/mutationTypes";

    export default {
        components: {
            Datepicker,
        },
        data() {
            let form = {
                ordered_at: null,
            };
            let formFields = Object.keys(form);
            return {
                errors: new FormErrors(formFields),
                form,
            };
        },
        methods: {
            save() {
                let vm = this;
                this.$store.dispatch('purchaseOrders/' + purchaseOrderActions.SAVE_ORDERED, {
                    ordered_at: moment(vm.ordered_at).format('YYYY-MM-DD'),
                }).then(response => {
                    vm.$emit('saved');
                }).catch(failedRequest => {
                    vm.errors.fill(failedRequest);
                });
            },
        },
        computed: {
            ...mapState([
                'show',
                'selected'
            ]),
        },
        mounted() {
            this.form.ordered_at = new Date();
        }
    }
</script>

<style>

</style>