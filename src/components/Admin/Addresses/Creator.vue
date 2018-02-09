<template>
    <form @keydown="errors.clear($event.target.name)"
          @submit.prevent=""
    >
        <div class="row">
            <div class="col-sm-6">
                <div class="form-group">
                    <label for="name">Name / Label</label>
                    <input class="form-control"
                           type="text"
                           id="name"
                           name="name"
                           v-model="form.name"
                           placeholder="Home / Office / Cottage ..."
                    >
                    <error input="name" :errors="errors"></error>
                </div>
            </div>

            <div class="col-sm-6">
                <div class="form-group">
                    <label for="description">Description</label>
                    <input class="form-control"
                           type="text"
                           id="description"
                           name="description"
                           v-model="form.description"
                    >
                    <error input="description" :errors="errors"></error>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-6">
                <div class="form-group">
                    <label for="street_1">Street</label>
                    <input class="form-control"
                           type="text"
                           id="street_1"
                           name="street_1"
                           v-model="form.street_1"
                    >
                    <error input="street_1" :errors="errors"></error>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group">
                    <label for="street_2">Street (Unit...)</label>
                    <input class="form-control"
                           type="text"
                           id="street_2"
                           name="street_2"
                           v-model="form.street_2"
                    >
                    <error input="street_2" :errors="errors"></error>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-6">
                <div class="form-group">
                    <label for="city">City</label>
                    <input class="form-control"
                           type="text"
                           id="city"
                           name="city"
                           v-model="form.city"
                    >
                    <error input="city" :errors="errors"></error>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group">
                    <label for="province">State / Province</label>
                    <input class="form-control"
                           type="text"
                           id="province"
                           name="province"
                           v-model="form.province"
                    >
                    <error input="province" :errors="errors"></error>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-6">
                <div class="form-group">
                    <label for="postal_code">Postal / Zip</label>
                    <input class="form-control"
                           type="text"
                           id="postal_code"
                           name="postal_code"
                           v-model="form.postal_code"
                    >
                    <error input="postal_code" :errors="errors"></error>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group">
                    <label for="country">Country</label>
                    <input class="form-control"
                           type="text"
                           id="country"
                           name="country"
                           v-model="form.country"
                    >
                    <error input="country" :errors="errors"></error>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-6">
                <div class="form-group">
                    <label for="phone">Phone</label>
                    <input class="form-control"
                           type="text"
                           id="phone"
                           name="phone"
                           v-model="form.phone"
                    >
                    <error input="phone" :errors="errors"></error>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group">
                    <label for="buzzer">Buzzer</label>
                    <input class="form-control"
                           type="text"
                           id="buzzer"
                           name="buzzer"
                           v-model="form.buzzer"
                    >
                    <error input="buzzer" :errors="errors"></error>
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
    import swal from 'sweetalert2';
    import { mapGetters, mapState, mapActions, mapMutations } from 'vuex';
    import * as addressMutations from "../../../vuex/modules/addresses/mutationTypes";
    import * as addressActions from "../../../vuex/modules/addresses/actionTypes";

    export default {
        data() {
            let form = {
                    name: '',
                    description: '',
                    company: '',
                    street_1: '',
                    street_2: '',
                    city: '',
                    province: 'Ontario',
                    country: 'Canada',
                    postal_code: '',
                    phone: '',
                    buzzer: '',
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

                this.$store.dispatch('addresses/' + addressActions.SAVE, this.form
                ).then(response => {
                    vm.$emit('saved', response.data);
                }).catch(failedRequest => {
                    swal('Error', 'Something went wrong...', 'error');
                    vm.errors.fill(failedRequest);
                });
            },
            update() {
                let vm = this;

                this.$store.dispatch('addresses/' + addressActions.UPDATE, this.form
                ).then(response => {
                    vm.$emit('updated', response.data);
                }).catch(failedRequest => {
                    vm.errors.fill(failedRequest);
                });
            },

            populateFormFromModel(model) {
                for (let prop in this.form) {
                    if (this.form.hasOwnProperty(prop)) {
                        this.form[prop] = model[prop];
                    }
                }
            }
        },
        computed: {
            ...mapState('addresses', [
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