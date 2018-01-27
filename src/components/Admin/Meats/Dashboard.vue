<template>
  <div>

    <!--<v-data-table :items="collection"-->
                  <!--:headers="columns"-->
                  <!--class="elevation-1"-->
                  <!--&gt;-->
      <!--<template slot="items" slot-scope="props">-->
        <!--<td class="text-xs-right">{{ meat.type }}</td>-->
        <!--<td class="text-xs-right">{{ meat.variety }}</td>-->
        <!--<td class="text-xs-right">{{ meat.code }}</td>-->
        <!--<td class="text-xs-right">${{ meat.cost_per_lb.toFixed(2) }}</td>-->
        <!--<td class="text-xs-right">-->
          <!--<button class="btn btn-primary btn-sm"-->
                  <!--@click="edit(meat)"-->
          <!--&gt;-->
            <!--<i class="fa fa-pencil"></i>-->
          <!--</button>-->
          <!--<button class="btn btn-danger btn-sm">-->
            <!--<i class="fa fa-trash"></i>-->
          <!--</button>-->
        <!--</td>-->
      <!--</template>-->
    <!--</v-data-table>-->




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
      <tr v-for="meat in filteredData(collection)">
        <td>{{ meat.type }}</td>
        <td>{{ meat.variety }}</td>
        <td>{{ meat.code }}</td>
        <td>${{ meat.cost_per_lb.toFixed(2) }}</td>
        <td>
          <button class="btn btn-primary btn-sm"
                  @click="edit(meat)"
          >
            <i class="fa fa-pencil"></i>
          </button>
          <button class="btn btn-danger btn-sm" disabled>
            <i class="fa fa-trash"></i>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import {mapGetters, mapState, mapActions} from 'vuex';
  import isSortable from '../../../mixins/isSortable';
  import * as meatActions from '../../../vuex/modules/meats/actionTypes';
  import AdminCommonModal from '../Common/Modal.vue';
  import AdminMeatsCreator from '../Meats/Creator.vue';
  import VDataTable from "vuetify/es5/components/VDataTable/VDataTable";

  export default {
    components: {
      VDataTable, AdminCommonModal,
      AdminMeatsCreator,
    },
    mixins: [
      isSortable,
    ],
    data() {
      let columns = [
        'type',
        'variety',
        'code',
        'cost_per_lb',
      ];
      let numColumns = columns.length;
      let sortOrders = {};
      columns.forEach(function (key) {
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
      create() {
        this.$store.dispatch('meats/' + meatActions.CREATE);
        this.$router.push({name: 'MeatCreate'});
      },
      edit(model) {
        this.$store.dispatch('meats/' + meatActions.EDIT, model);
        this.$router.push({name: 'MeatEdit', params: {id: model.id}});
      },
      fetchAll() {
        this.$store.dispatch('meats/' + meatActions.FETCH_ALL);
      }
    },
    computed: {
      ...mapState('meats', [
        'collection',
        'show',
        'selected',
        'mode'
      ])
    }
  }
</script>

<style>

</style>
