<template>
    <form @keydown="errors.clear($event.target.name)"
          @submit.prevent=""
          autocomplete="off"
    >
        <div class="row" v-if="addAddress">
            <div class="col-sm-12">
                <h1>Editing Addresses ...</h1>
            </div>
        </div>
        <div class="row" v-if="! addAddress">
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
                     :class="{ 'has-error': errors.has('email') }"
                >
                    <label for="email">Email</label>
                    <input type="email"
                           class="form-control"
                           id="email"
                           name="email"
                           v-model="form.email"
                           autocomplete="off"
                    >
                    <error input="email" :errors="errors"></error>
                </div>
            </div>
        </div>

        <div class="row" v-if="! addAddress">
            <div class="col-sm-6">
                <div class="form-group"
                     :class="{ 'has-error': errors.has('password') }"
                >
                    <label for="password">Password</label>
                    <input type="password"
                           class="form-control"
                           id="password"
                           name="password"
                           v-model="form.password"
                           autocomplete="off"
                    >
                    <error input="password" :errors="errors"></error>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group"
                     :class="{ 'has-error': errors.has('phone_number') }"
                >
                    <label for="phone_number">Phone Number</label>
                    <input type="text"
                           class="form-control"
                           id="phone_number"
                           name="phone_number"
                           v-model="form.phone_number"
                    >
                    <error input="phone_number" :errors="errors"></error>
                </div>
            </div>
        </div>
        <div class="row" v-if="! addAddress">
            <div class="col-sm-6">
                <div class="form-group"
                     :class="{ 'has-error': errors.has('first_name') }"
                >
                    <label>First Name</label>
                    <input type="text"
                           v-model="form.first_name"
                           id="first_name"
                           name="first_name"
                           class="form-control"
                    >
                    <error input="first_name" :errors="errors"></error>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group"
                     :class="{ 'has-error': errors.has('last_name') }"
                >
                    <label for="last_name">Last Name</label>
                    <input type="text"
                           class="form-control"
                           id="last_name"
                           name="last_name"
                           v-model="form.last_name"
                    >
                    <error input="last_name" :errors="errors"></error>
                </div>
            </div>
        </div>


        <div class="row" v-if="! addAddress">
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

        <div class="row" v-if="showAddresses">
            <div class="col-sm-12">
                <h1> Current Addresses:</h1>
            </div>
            <div class="col-sm-12">
                <div class="row" v-for="address in selected.addresses">
                    <div class="col-xs-10">
                        <button class="btn btn-outline-danger btn-block"
                                @click="editAddress(address)"
                        >
                            <i class="fa fa-pencil"></i>
                            {{ address.street_1 }}
                            {{ address.street_2 }}
                            {{ address.city }}
                            {{ address.province }}
                            {{ address.postal_code }}
                            {{ address.country }}
                        </button>
                    </div>
                    <div class="col-xs-2">
                        <button class="btn btn-danger btn-block"
                                @click="deleteAddress(address)"
                        >
                            <i class="fa fa-times"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="row" v-if="! addAddress && showAddresses">
            <div class="col-sm-12">
                <button class="btn btn-block btn-primary"
                        @click="addAddress = true"
                >
                    <i class="fa fa-plus"></i> Add an Address
                </button>
            </div>
        </div>

        <div class="row" v-if="showAddresses && addAddress">
            <div class="col-sm-12">
                <admin-addresses-creator @cancelled="addAddress = false"
                                         @saved="attachAddress"
                                         @updated="updateUserAddress"
                ></admin-addresses-creator>
            </div>
        </div>


    </form>
</template>

<script>
    import FormErrors from '../../../models/FormErrors';
    import Form from '../../../models/Form';
    import swal from 'sweetalert2';
    
    import { mapGetters, mapState, mapActions, mapMutations } from 'vuex';
    import * as userActions from '../../../vuex/modules/users/actionTypes';
    import * as userMutations from '../../../vuex/modules/users/mutationTypes';
    import * as addressActions from "../../../vuex/modules/addresses/actionTypes";
    import AdminAddressesCreator from '../Addresses/Creator.vue';

    export default {
        components: {
            AdminAddressesCreator,
        },
        props: ['showAddresses'],
        data() {
            let form = {
                    name: '',
                    email: '',
                    password: '',
                    first_name: null,
                    last_name: null,
                    phone_number: null,
                };
            let formFields = Object.keys(form);
            return {
                errors: new FormErrors(formFields),
                form,
                addAddress: false,
                
            };
        },
        methods: {
            save() {
                let vm = this;
                this.$store.dispatch('users/' + userActions.SAVE,
                    this.form
                ).then(response => {
                    vm.$emit('saved');
                }).catch(failedRequest => {
                    swal('Error', 'Something went wrong...', 'error');
                    vm.errors.fill(failedRequest);
                });
            },
            update() {
                let vm = this;
                this.$store.dispatch('users/' + userActions.UPDATE,
                    this.form
                ).then(response => {
                    vm.$emit('saved');
                }).catch(failedRequest => {
                    swal('Error', 'Something went wrong...', 'error');
                    vm.errors.fill(failedRequest);
                });
            },
            attachAddress(address) {
                let vm = this;
                this.$store.dispatch('users/' + userActions.ATTACH_ADDRESS,
                    address.id
                ).then(response => {
                    vm.addAddress = false;
                }).catch(failedRequest => {
                    swal('Error', 'Something went wrong...', 'error');
                    vm.errors.fill(failedRequest)
                });
            },
            updateUserAddress(address) {
                this.$store.commit('users/' + userMutations.UPDATE_ADDRESS_ON_USER, address);
                this.addAddress = false;
            },
            populateFormFromModel(model) {
                for (let prop in this.form) {
                    if (this.form.hasOwnProperty(prop)) {
                        this.form[prop] = model[prop];
                    }
                }
                this.form.password = '';
            },
            editAddress(address) {
                this.addAddress = true;
                this.$store.dispatch('addresses/' + addressActions.EDIT, address);
            },
            deleteAddress(address) {
                swal('error', 'You shouldnt do that...', 'error');
            }
        },
        computed: {
            ...mapState('users', [
                'collection',
                'mode',
                'selected',
                'show',
            ]),
        },
        mounted() {
            if (this.mode == 'EDIT') {
                this.populateFormFromModel(this.selected);
            }
        },
        watch: {
            selected(newSelected) {
                if (newSelected)
                    this.populateFormFromModel(newSelected);
            }
        }
    }
</script>

<style>

</style>