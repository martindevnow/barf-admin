<template>
    <div>
        <table class="table table-bordered table-striped">
            <thead>
            <tr>
                <th v-bind:colspan="numColumns + 1">
                    <div class="row">
                        <div class="col-xs-6">
                            <div class="input-group">
                                <input type="text"
                                       class="form-control"
                                       v-model="sortable.filterKey"
                                />
                                <span class="input-group-addon">
                                    <i class="fa fa-search"></i>
                                </span>
                            </div>
                        </div>
                        <div class="col-xs-6">
                            <button class="btn btn-warning"
                                    @click="refresh(true)"
                            >
                                Refresh
                            </button>
                        </div>
                    </div>
                </th>
            </tr>
            <tr>
                <th v-for="key in columns"
                    @click="sortBy(key)"
                    :class="{ active: sortable.sortKey == key }">
                    {{ key | capitalize }}
                    <span class="fa" :class="sortOrders[key] > 0 ? 'fa-sort-asc' : 'fa-sort-desc'">
                  </span>
                </th>
                <th>Actions</th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="order in filteredData(collection)" :key="order.id">
                <td>{{ order.pet_breed_customer }}</td>
                <td>{{ order.meal_size }} x {{ order.daily_meals }}</td>
                <td>
                    {{ order.package_label }}
                </td>
                <td>{{ order.weeks_of_food }}</td>
                <td v-if="orderBeingEdited != order.id">
                    {{ order.deliver_by }}
                    <button class="btn btn-sm btn-outline-danger"
                            @click="orderBeingEdited = order.id"
                    >
                        <i class="fa fa-pencil"></i>
                    </button>
                </td>
                <td v-if="orderBeingEdited == order.id">
                    <datepicker :value="simpleDate(order.deliver_by)"
                                format="yyyy-MM-dd"
                                input-class="form-control"
                                @input="updateDeliverBy(order, $event)"
                    >
                    </datepicker>
                    <button class="btn btn-danger"
                            @click="orderBeingEdited = null"
                    >
                        <i class="fa fa-times"></i>
                    </button>
                </td>
                <td v-if="! order.cancelled">
                    <v-btn @click="openPaymentModal(order)"
                           small
                           :color="order.paid ? 'success' : 'error'"
                    >
                        Paid
                    </v-btn>
                    <v-btn @click="openPackedModal(order)"
                            small
                            :color="order.packed ? 'success' : 'error'"
                    >
                        Packed
                    </v-btn>
                    <v-btn @click="openShippedModal(order)"
                           small
                           :color="order.shipped ? 'success' : 'error'"
                    >
                        Shipped
                    </v-btn>
                    <v-btn v-if="! order.cancelled"
                            @click="openCancellationModal(order)"
                            color="warning"
                            small
                    >
                        Cancel
                    </v-btn>
                </td>
                <td v-if="order.cancelled">
                    Cancelled
                </td>
            </tr>
            </tbody>
        </table>


        <!-- <admin-common-modal v-if="show.paymentModal">
            <p slot="header">Log a Payment</p>
            <admin-payment-logger @saved="closePaymentModal()"
                                  @cancelled="closePaymentModal()"
                                  slot="body"
            ></admin-payment-logger>
        </admin-common-modal>

        <admin-common-modal v-if="show.packedModal">
            <p slot="header">Log Packing an Order</p>
            <admin-packed-logger @saved="closePackedModal()"
                                 @cancelled="closePackedModal()"
                                 slot="body"
            ></admin-packed-logger>
        </admin-common-modal>

        <admin-common-modal v-if="show.shippedModal">
            <p slot="header">Log a Shipment</p>
            <admin-shipped-logger @saved="closeShippedModal()"
                                  @cancelled="closeShippedModal()"
                                  slot="body"
            ></admin-shipped-logger>
        </admin-common-modal>

        <admin-common-modal v-if="show.cancellationModal">
            <p slot="header">Cancel an Order</p>
            <p slot="body">Reason:</p>
            <admin-orders-canceller @saved="closeCancellationModal()"
                                    @cancelled="closeCancellationModal()"
                                    slot="body"
            ></admin-orders-canceller>
        </admin-common-modal> -->
    </div>
</template>


<script>
import { mapGetters, mapState, mapActions } from 'vuex';
import isSortable from '../../../mixins/isSortable';
import Datepicker from 'vuejs-datepicker';
import swal from 'sweetalert2';
import moment from 'moment';
import * as orderActions from '../../../vuex/modules/orders/actionTypes';

import AdminCommonModal from '../Common/Modal.vue';
import AdminPaymentLogger from './PaymentLogger.vue';
import AdminPackedLogger from './PackedLogger.vue';
import AdminShippedLogger from './ShippedLogger.vue';
import AdminOrderCanceller from './OrderCanceller.vue';

export default {
    mixins: [
        isSortable
    ],
    components: {
        Datepicker,
        AdminCommonModal,
        AdminPaymentLogger,
        AdminPackedLogger,
        AdminShippedLogger,
        AdminOrderCanceller,
    },
    data() {
        let columns = [
            'pet_breed_customer',
            'meal_size',
            'package_label',
            '# of Weeks',
            'deliver_by',
        ];
        let numColumns = columns.length;
        let sortOrders = {};
        columns.forEach(function(key) {
            sortOrders[key] = 1;
        });

        return {
            columns: columns,
            numColumns: numColumns,
            sortOrders: sortOrders,
            orderBeingEdited: null,
        }
    },
    mounted() {
        this.fetchAll();
    },
    methods: {
        fetchAll() {
            this.$store.dispatch('orders/' + orderActions.FETCH_ALL);
        },
        openPaymentModal(order) {
            this.$store.dispatch('orders/' + orderActions.OPEN_PAYMENT_LOGGER, order)
            this.$router.push({name: 'OrderPaymentLogger', params: {id: order.id}});
        },
        openPackedModal(order) {
            this.$store.dispatch('orders/' + orderActions.OPEN_PACKED_LOGGER, order)
            this.$router.push({name: 'OrderPackedLogger', params: {id: order.id}});        
        },
        openShippedModal(order) {
            this.$store.dispatch('orders/' + orderActions.OPEN_SHIPPED_LOGGER, order)
            this.$router.push({name: 'OrderShippedLogger', params: {id: order.id}});   
        },
        openCancellationModal(order) {
            this.$store.dispatch('orders/' + orderActions.OPEN_CANCELLED_LOGGER, order)
            this.$router.push({name: 'OrderCancellationLogger', params: {id: order.id}});
        },
        closeCancellationModal() {
            this.$store.dispatch('orders/' + orderActions.CLOSE_CANCELLED_LOGGER)
        },
        refresh(force) {
            this.$store.dispatch('orders/' + orderActions.FETCH_ALL, force);
        },
        updateDeliverBy(order, event) {
            let vm = this;

            let newDeliverByDate = moment(event).format('YYYY-MM-DD');
            swal({
                title: 'Are you sure?',
                text: "Do you want to update this order's deliver by date to "
                    + newDeliverByDate + "?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Update',
                cancelButtonColor: '#d33',
            }).then(function () {
                swal({
                    title: 'Future Orders',
                    text: "Should future orders adjust to ship on the same day of the week?",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Yes, update future orders',
                    cancelButtonColor: '#dd9e56',
                    cancelButtonText: 'Only This Order',
                }).then(function () {
                    vm.orderBeingEdited = null;
                    vm.$store.dispatch('orders/' + orderActions.UPDATE_DELIVER_BY, {
                        order,
                        formData: {
                            deliver_by: newDeliverByDate,
                            updateFuture: 1,
                        },
                    }).then(response => {
                        swal(
                            'Updated!',
                            'Future orders have been updated as well.',
                            'success'
                        )
                    }).catch(error => {
                        swal('Error', 'Something went wrong...', 'error');
                    });
                }).catch(function() {
                    vm.orderBeingEdited = null;
                    console.log('Apply to only this one...');
                    vm.$store.dispatch('orders/' + orderActions.UPDATE_DELIVER_BY, {
                        order,
                        formData: {
                            deliver_by: newDeliverByDate,
                            updateFuture: 0,
                        },
                    }).then(response => {
                        swal(
                            'Updated',
                            'Only this order was updated.',
                            'success'
                        )
                    }).catch(error => {
                        swal('Error', 'Something went wrong...', 'error');
                    });

                });
            }).catch(cancellation => {
                swal('Cancelled');
            });
        },
        simpleDate(dateData) {
            return moment(dateData).toDate();
        }

    },
    computed: {
        ...mapState('orders', [
            'collection',
            'show',
            'selected'
        ])
    },


}
</script>

<style>

</style>