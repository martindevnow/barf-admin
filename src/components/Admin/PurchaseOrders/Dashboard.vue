<template>
    <div>

        <table class="table table-bordered table-striped">
            <thead>
            <tr>
                <th v-bind:colspan="numColumns + 1">
                    <div class="input-group">
                        <input type="text"
                               class="form-control"
                               v-model="sortable.filterKey"
                        />
                        <span class="input-group-addon">
                            <i class="fa fa-search"></i>
                        </span>
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
            <tr v-for="purchaseOrder in filteredData(collection)">
                <td>{{ purchaseOrder.id }}</td>
                <td>{{ purchaseOrder.created_at }}</td>
                <td>{{ purchaseOrder.ordered_at }}</td>
                <td>{{ purchaseOrder.vendor_name }}</td>
                <td>${{ purchaseOrder.total_cost.toFixed(2) }}</td>
                <td>
                    <button @click="openOrderedModal(purchaseOrder)"
                            class="btn btn-sm"
                            :class="{
                            'btn-danger': ! purchaseOrder.ordered,
                            'btn-success': purchaseOrder.ordered
                        }"
                    >
                        Ordered
                    </button>
                    <button @click="openReceivedModal(purchaseOrder)"
                            class="btn btn-sm"
                            :class="{
                            'btn-danger': ! purchaseOrder.received,
                            'btn-success': purchaseOrder.received
                        }"
                    >
                        Received
                    </button>
                </td>
            </tr>
            </tbody>
        </table>


        <admin-common-modal v-if="show.orderedModal"
                            @close="closeOrderedModal()"
        >
            <p slot="header">Ordered</p>
            <admin-ordered-logger @saved="closeOrderedModal()"
                                  @cancelled="closeOrderedModal()"
                                  slot="body"
            ></admin-ordered-logger>
        </admin-common-modal>

        <admin-common-modal v-if="show.receivedModal"
                            @close="closeReceivedModal()"
        >
            <p slot="header">Received</p>
            <admin-received-logger @saved="closeReceivedModal()"
                                   @cancelled="closeReceivedModal()"
                                 slot="body"
            ></admin-received-logger>
        </admin-common-modal>

    </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';
import isSortable from '../../../mixins/isSortable';
import * as purchaseOrderActions from "../../../vuex/modules/purchase-orders/actionTypes";

import AdminCommonModal from '../Common/Modal.vue';
import AdminOrderedLogger from '../PurchaseOrders/OrderedLogger.vue';
import AdminReceivedLogger from '../PurchaseOrders/ReceivedLogger.vue';

export default {
    components: {
        AdminCommonModal,
        AdminOrderedLogger,
        AdminReceivedLogger,
    },
    mixins: [
        isSortable
    ],
    data() {
        let columns = [
            'id',
            'created_at',
            'ordered_at',
            'vendor_name',
            'total_cost',
        ];
        let numColumns = columns.length;
        let sortOrders = {};
        columns.forEach(function(key) {
            sortOrders[key] = 1;
        });

        return {
            columns: columns,
            numColumns: numColumns,
            sortOrders: sortOrders
        }
    },
    mounted() {
        this.fetchAll();
    },
    methods: {
        fetchAll() {
            this.$store.dispatch('purchaseOrders/' + purchaseOrderActions.FETCH_ALL);
        },
        openOrderedModal(po) {
            this.$store.dispatch('purchaseOrders/' + purchaseOrderActions.OPEN_ORDERED_LOGGER, po);
        },
        closeOrderedModal() {
            this.$store.dispatch('purchaseOrders/' + purchaseOrderActions.CLOSE_ORDERED_LOGGER);
        },
        openReceivedModal(po) {
            this.$store.dispatch('purchaseOrders/' + purchaseOrderActions.OPEN_RECEIVED_LOGGER, po);
        },
        closeReceivedModal() {
            this.$store.dispatch('purchaseOrders/' + purchaseOrderActions.CLOSE_RECEIVED_LOGGER);
        },
    },
    computed: {
        ...mapState('purchaseOrders', [
            'show',
            'collection',
            'selected',
        ])
    },

}
</script>

<style>

</style>