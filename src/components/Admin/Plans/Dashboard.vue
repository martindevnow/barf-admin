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
              <button class="btn btn-primary"
                      @click="openPlanCreatorModal()"
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
      <tr v-for="plan in filteredData(collection)"
          :key="plan.id"
          :class="{ 'danger': ! plan.active }"
      >
        <td class="np">
          <table>
            <u>Plan:</u> {{ plan.id }} <br />
            <u>Owner:</u> {{ plan.customer_name }} <br />
            <u>Pet:</u> {{ plan.pet_name }} <br />
          </table>
        </td>
        <td class="np">
          <table>
            <u>Package:</u> {{ plan.package_label }}<br />
            <u>Food:</u> {{ plan.weeks_of_food }} wks of food <br />
            <u>Delivery:</u> every {{ plan.weeks_per_shipment }} week(s) <br />
            <u>Cost:</u> ${{ plan.weekly_cost }}<br />
          </table>
        </td>
        <td>
          <button class="btn btn-outline-danger btn-sm"
                  @click="openNoteCreatorModal({ model: plan, type: 'plan' })"
          >
            + Note

          </button>
          <button class="btn btn-sm btn-primary"
                  @click="openMealReplacementModal(plan)"
          >
            Replace Meal

          </button>
          <button class="btn btn-primary btn-sm"
                  @click="edit(plan)"
          >
            <i class="fa fa-pencil"></i>
          </button>
          <button class="btn btn-danger btn-sm"
                  @click="deactivate(plan)"
          >
            <i class="fa fa-times"></i>
          </button>
        </td>
      </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
  import swal from 'sweetalert2'
  import {mapGetters, mapState, mapActions} from 'vuex';
  import isSortable from '../../../mixins/isSortable';

  import * as packageActions from '../../../vuex/modules/packages/actionTypes';
  import * as planActions from '../../../vuex/modules/plans/actionTypes';
  import * as noteActions from "../../../vuex/modules/notes/actionTypes";

  import AdminCommonModal from '../Common/Modal.vue';
  import AdminPlansCreator from '../Plans/Creator.vue';
  import AdminNotesCreator from '../Notes/Creator.vue';
  import AdminPlansMealReplacement from '../Plans/MealReplacement.vue';

  export default {
    components: {
      AdminCommonModal,
      AdminPlansCreator,
      AdminNotesCreator,
      AdminPlansMealReplacement,
    },
    mixins: [
      isSortable
    ],
    data() {
      let columns = [
        'plan_id',
        'package_label',
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
      fetchAll() {
        this.$store.dispatch('plans/' + planActions.FETCH_ALL);
        this.$store.dispatch('packages/' + packageActions.FETCH_ALL);
      },
      openPlanCreatorModal() {
        this.$store.dispatch('plans/' + planActions.CREATE);
        this.$router.push({name: 'PlanCreate'});
      },
      edit(plan) {
        this.$store.dispatch('plans/' + planActions.EDIT, plan);
        this.$router.push({name: 'PlanEdit', params: {id: plan.id}});
      },
      openMealReplacementModal(plan) {
        this.$store.dispatch('plans/' + planActions.OPEN_MEAL_REPLACEMENT_CREATOR, plan)
        this.$router.push({name: 'PlanMealReplacements', params: {id: plan.id}});
      },
      openNoteCreatorModal(dto) {
        this.$store.dispatch('notes/' + noteActions.CREATE, dto)
      },
      closeNoteCreatorModal() {
        this.$store.dispatch('notes/' + noteActions.CANCEL)
      },
      deactivate(plan) {
        let vm = this;
        swal({
          title: 'Are you sure?',
          text: `Are you sure you wish to cancel ${plan.customer.name}'s plan?`,
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Terminate',
          cancelButtonColor: '#d33',
          cancelButtonText: 'Undo'
        }).then((result) => {
          if (!result.value)
            return;

          swal({
            title: 'Cancel Orders?',
            text: `Should their pending orders be cancelled?`,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Yes',
            cancelButtonColor: '#d33',
            cancelButtonText: 'No'

          }).then((result) => {
            let cancel_orders = !!result.value;
            vm.$store.dispatch('plans/' + planActions.CANCEL_PLAN, {
              plan_id: plan.id,
              cancel_orders
            }).then(response => {
              swal('Success', 'That plan has been cancelled', 'success')
            }).catch(error => {
              swal('Failed', 'The plan could not be cancelled', 'error');
            });
          });

        })
      }
    },
    computed: {
      ...mapState('plans', [
        'collection',
        'show',
        'selected',
        'mode',
      ]),
      ...mapState('notes', {
        'notesShow': 'show',
      }),
    },
  }
</script>

<style>
td.np {
  padding: 0 !important;
}
</style>
