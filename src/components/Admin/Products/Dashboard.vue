<template>
    <div>
        <table class="table table-bordered table-responsive">
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
                            <button class="btn btn-primary"
                                    @click="openProductCreatorModal()"
                            >
                                New
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
            <tr v-for="product in filteredData(collection)"
                :class="{'in-active': ! product.active }"
            >
                <td>{{ product.name }}</td>
                <td>{{ product.description }}</td>
                <td>{{ product.description_long }}</td>
                <td>{{ product.size }}</td>
                <td>{{ product.sku }}</td>
                <td>${{ product.price.toFixed(2) }}</td>
                <td>{{ product.ingredients }}</td>
                <td>
                    <button class="btn btn-primary btn-sm"
                            @click="editProduct(product)"
                    >
                        <i class="fa fa-pencil"></i>
                    </button>
                    <button class="btn btn-danger btn-sm">
                        <i class="fa fa-trash"></i>
                    </button>
                </td>
            </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';
import isSortable from '../../../mixins/isSortable';
import * as productActions from "../../../vuex/modules/products/actionTypes";

import AdminCommonModal from '../Common/Modal.vue';
import AdminProductsCreator from '../Products/Creator.vue';

export default {
    components: {
        AdminCommonModal,
        AdminProductsCreator,
    },
    mixins: [
        isSortable,
    ],
    data() {
        let columns = [
            'name',
            'description',
            'description_long',
            'size',
            'sku',
            'price',
            'ingredients',
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
            this.$store.dispatch('products/' + productActions.FETCH_ALL);
        },
        openProductCreatorModal() {
            this.$store.dispatch('products/' + productActions.CREATE);
            this.$router.push({ name: 'ProductCreate'});
        },
        editProduct(model) {
            this.$store.dispatch('products/' + productActions.EDIT, model);
            this.$router.push({ name: 'ProductEdit', params: { id: model.id }});
        },
    },
    computed: {
        ...mapState('products', [
            'collection',
            'show',
            'selected',
            'mode'
        ])
    }
}
</script>

<style scoped>
  .in-active {
    background-color: orange;
  }
</style>
