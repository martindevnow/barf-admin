<template>
    <div>
        <table class="table table-bordered table-responsive table-striped">
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
                                    @click="create()"
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
            <tr v-for="user in filteredData(collection)">
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.getPets() }}</td>
                <td>
                    <button class="btn btn-primary btn-sm"
                            @click="edit(user)"
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
    import * as userActions from '../../../vuex/modules/users/actionTypes';

    import AdminCommonModal from '../Common/Modal.vue';
    import AdminUsersCreator from '../Users/Creator.vue';

    export default {
        components: {
            AdminCommonModal,
            AdminUsersCreator,
        },
        mixins: [
            isSortable,
        ],
        data() {
            let columns = [
                'name',
                'email',
                'pets',
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
                toppings: [],
            }
        },
        mounted() {
            this.fetchAll();
        },
        methods: {
            fetchAll() {
                this.$store.dispatch('users/' + userActions.FETCH_ALL);
            },
            create() {
                this.$store.dispatch('users/' + userActions.CREATE);
                this.$router.push({ name: 'UserCreate' });
            },
            edit(model) {
                this.$store.dispatch('users/' + userActions.EDIT, model);
                this.$router.push({ name: 'UserEdit', params: { id: model.id } });
            }
        },
        computed: {
            ...mapState('users', [
                'collection',
                'show',
                'mode',
                'selected',
            ])
        }
    }
</script>

<style>

</style>