<template>
    <form @keydown="errors.clear($event.target.name)"
          @submit.prevent=""
    >
        <div class="row">

            <div class="col-sm-6">
                <div class="form-group"
                     v-bind:class="{'has-error': errors.has('received_at') }"
                >
                    <label>Received At</label>
                    <datepicker v-model="received_at"
                                id="received_at"
                                name="received_at"
                                format="yyyy-MM-dd"
                                input-class="form-control"
                    >
                    </datepicker>
                    <error input="received_at" :errors="errors"></error>
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
    import { mapState, mapActions } from 'vuex';
    import Datepicker from 'vuejs-datepicker';
    import moment from 'moment';
    import * as purchaseOrderMutations from "../../../vuex/modules/purchase-orders/mutationTypes";
    import * as purchaseOrderActions from "../../../vuex/modules/purchase-orders/actionTypes";

    export default {
        components: {
            Datepicker,
        },
        data() {
            let form = {
                received_at: null,
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
                this.$store.dispatch('purchaseOrders/' + purchaseOrderActions.SAVE_RECEIVED, {
                    received_at: moment(vm.received_at).format('YYYY-MM-DD'),
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
            this.form.received_at = new Date();
        }
    }
</script>

<style>

</style>