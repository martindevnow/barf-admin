<template>
    <form @keydown="errors.clear($event.target.name)"
          @submit.prevent=""
    >
        <div class="row">
            <div class="col-sm-6">
                <div class="form-group"
                     v-bind:class="{'has-error': errors.has('amount_paid') }"
                >
                    <label for="amount_paid">Amount Paid</label>
                    <div class="input-group">
                        <span class="input-group-addon">$</span>
                        <input type="text"
                               class="form-control"
                               placeholder="10"
                               id="amount_paid"
                               name="amount_paid"
                               v-model="form.amount_paid"
                        >
                    </div>
                    <error input="amount_paid" :errors="errors"></error>
                </div>
            </div>

            <div class="col-sm-6">
                <div class="form-group"
                     v-bind:class="{'has-error': errors.has('received_at') }"
                >
                    <label>Received At</label>
                    <datepicker v-model="form.received_at"
                                id="received_at"
                                name="received_at"
                                format="yyyy-MM-dd"
                                input-class="form-control"
                    >
                    </datepicker>
                    <error input="received_at" :errors="errors"></error>
                </div>
            </div>
        </div>


        <div class="row">
            <div class="col-sm-6">
                <div class="form-group"
                     v-bind:class="{'has-error': errors.has('format') }"
                >
                    <label for="format">Format</label>
                    <select v-model="form.format"
                            class="form-control"
                            id="format"
                            name="format"
                            @change="errors.clear('format')"
                    >
                        <option v-for="format in paymentFormats">{{ format }}</option>
                    </select>
                    <error input="format" :errors="errors"></error>

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
                                @click="close()"
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
import { mapState, mapActions, mapMutations } from 'vuex';
import Datepicker from 'vuejs-datepicker';
import moment from 'moment';
import * as orderActions from "../../../vuex/modules/orders/actionTypes";

export default {
    components: {
        Datepicker,
    },
    data() {
        let form = {
            amount_paid: null,
            received_at: null,
            format: '',
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
        save() {
            let vm = this;
            this.$store.dispatch('orders/' + orderActions.SAVE_PAYMENT, {
                format:      this.form.format,
                amount_paid: this.form.amount_paid,
                received_at: moment(this.form.received_at).format('YYYY-MM-DD'),
            }).then(response => {
                vm.close();
            }).catch(failedRequest => {
                vm.errors.fill(failedRequest);
            });
        },
        close() {
            this.$store.dispatch('orders/' + orderActions.CLOSE_PAYMENT_LOGGER);
            this.$router.push({ name: 'Orders' });
        }
    },
    computed: {
        ...mapState('orders', [
            'selected'
        ]),
    },
    mounted() {
        this.format = this.selected.plan.payment_method;
        this.received_at = new Date();
        this.amount_paid = this.selected.plan.weekly_cost;
    }
}
</script>

<style>

</style>