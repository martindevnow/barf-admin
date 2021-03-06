<template>
    <form @keydown="errors.clear($event.target.name)"
          @submit.prevent=""
    >
        <div class="row">
            <div class="col-sm-12">
                <div class="form-group"
                     :class="{ 'has-error': errors.has('owner_id') }"
                >
                    <label>Owner</label>
                    <admin-user-selector v-model="form.owner"
                                         @input="errors.clear('owner_id')"
                    ></admin-user-selector>
                    <error input="owner_id" :errors="errors"></error>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-6">
                <div class="form-group"
                     :class="{ 'has-error': errors.has('name') }"
                >
                    <label for="name">Name</label>
                    <input type="text"
                           class="form-control"
                           id="name"
                           name="name"
                           v-model="form.name"
                    >
                    <error input="name" :errors="errors"></error>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group"
                     :class="{ 'has-error': errors.has('breed') }"
                >
                    <label for="breed">Breed</label>
                    <input type="text"
                           class="form-control"
                           id="breed"
                           name="breed"
                           v-model="form.breed"
                    >
                    <error input="breed" :errors="errors"></error>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-6">
                <div class="form-group"
                     :class="{ 'has-error': errors.has('species') }"
                >
                    <label for="species">Species</label>
                    <input type="text"
                           class="form-control"
                           id="species"
                           name="species"
                           v-model="form.species"
                    >
                    <error input="species" :errors="errors"></error>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group"
                     :class="{ 'has-error': errors.has('activity_level') }"
                >
                    <label for="activity_level">Activity Level</label>
                    <input type="text"
                           class="form-control"
                           id="activity_level"
                           name="activity_level"
                           v-model="form.activity_level"
                    >
                    <error input="activity_level" :errors="errors"></error>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-6">
                <div class="form-group"
                     :class="{ 'has-error': errors.has('birthday') }"
                >
                    <label>Birthday</label>
                    <datepicker v-model="form.birthday"
                                id="birthday"
                                name="birthday"
                                format="yyyy-MM-dd"
                                input-class="form-control"
                    >
                    </datepicker>
                    <error input="birthday" :errors="errors"></error>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group"
                     :class="{ 'has-error': errors.has('weight') }"
                >
                    <label for="weight">Weight</label>
                    <input type="text"
                           class="form-control"
                           id="weight"
                           name="weight"
                           v-model="form.weight"
                    >
                    <error input="weight" :errors="errors"></error>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-6">
                <div class="form-group"
                     :class="{ 'has-error': errors.has('daily_meals') }"
                >
                    <label for="daily_meals">Daily Meals</label>
                    <input type="text"
                           class="form-control"
                           id="daily_meals"
                           name="daily_meals"
                           v-model="form.daily_meals"
                    >
                    <error input="daily_meals" :errors="errors"></error>
                </div>
            </div>
        </div>


        <div class="row">
            <div class="col-sm-6">
                <label>&nbsp;</label>
                <button class="btn btn-success btn-block"
                        :disabled="errors.any()"
                        @click="save()"
                        v-if="! mode"
                >
                    Save
                </button>
                <button class="btn btn-primary btn-block"
                        :disabled="errors.any()"
                        @click="update()"
                        v-if="mode == 'EDIT'"
                >
                    Update
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


    </form>
</template>

<script>
import FormErrors from '../../../models/FormErrors';
import Form from '../../../models/Form';
import swal from 'sweetalert2';

import { mapGetters, mapState, mapActions, mapMutations } from 'vuex';
import moment from 'moment';
import Datepicker from 'vuejs-datepicker';
import { BasicSelect } from 'vue-search-select'
import * as userActions from "../../../vuex/modules/users/actionTypes";
import * as petActions from "../../../vuex/modules/pets/actionTypes";
import AdminUserSelector from '../Users/UserSelector.vue';

export default {
    components: {
        Datepicker,
        AdminUserSelector,
    },
    data() {
        let form  = {
                owner: {},
                owner_id: null,
                name: '',
                breed: '',
                species: 'dog',
                weight: null,
                activity_level: null,
                birthday: null,
                daily_meals: 2,
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
            let birthday = this.form.birthday ? moment(this.birthday).format('YYYY-MM-DD') : null;
            let owner_id = this.form.owner.id;
            this.$store.dispatch('pets/' + petActions.SAVE, {
                ...this.form, birthday, owner_id,
            }).then(response => {
                vm.$emit('saved');
            }).catch(failedRequest => {
                swal('Error', 'Something went wrong...', 'error');
                vm.errors.fill(failedRequest);
            });
        },
        update() {
            let vm = this;
            let birthday = this.form.birthday ? moment(this.birthday).format('YYYY-MM-DD') : null;
            let owner_id = this.form.owner.id;
            this.$store.dispatch('pets/' + petActions.UPDATE, {
                ...this.form, birthday, owner_id,
            }).then(response => {
                vm.$emit('updated');
            }).catch(failedRequest => {
                swal('Error', 'Something went wrong...', 'error');
                vm.errors.fill(failedRequest);
            });
        },
        fetchAll() {
            this.$store.dispatch('users/' + userActions.FETCH_ALL);
        },
        populateFormFromPet(pet) {
            this.form.owner = pet.owner;

            this.form.name = pet.name;
            this.form.breed = pet.breed;
            this.form.species = pet.species;
            this.form.weight = pet.weight;
            this.form.activity_level = pet.activity_level;
            this.form.birthday = pet.birthday;
            this.form.daily_meals = pet.daily_meals;
        }
    },
    computed: {
        ...mapState('pets', [
            'collection',
            'mode',
            'selected',
        ]),
        ...mapState('users', {
            'users': 'collection'
        }),
    },
    mounted() {
        this.fetchAll();
        if (this.mode == 'EDIT') {
            this.populateFormFromPet(this.selected);
        }
    },
    watch: {
        selected(newSelected) {
            if (newSelected)
                this.populateFormFromPet(newSelected);
        }
    }
}
</script>

<style>

</style>