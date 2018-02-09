<template>
    <form @keydown="errors.clear($event.target.name)"
          @submit.prevent=""
    >

        <div class="row">
            <div class="col-sm-6">
                <div class="form-group"
                     :class="{ 'has-error': errors.has('label') }"
                >
                    <label for="label">Label</label>
                    <input type="text"
                           class="form-control"
                           id="label"
                           name="label"
                           v-model="form.label"
                    >
                    <error input="label" :errors="errors"></error>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group"
                     :class="{ 'has-error': errors.has('public') }"
                >
                    <label>Availability</label>
                    <div class="checkbox">
                        <label>
                            <input type="checkbox"
                                   class="checkbox style-0"
                                   name="public"
                                   id="public"
                                   v-model="form.public">
                            <span>Public</span>
                        </label>
                    </div>
                    <error input="public" :errors="errors"></error>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-6">
                <div class="form-group"
                     :class="{ 'has-error': errors.has('code') }"
                >
                    <label for="code">Code</label>
                    <input type="text"
                           class="form-control"
                           id="code"
                           name="code"
                           v-model="form.code"
                    >
                    <error input="code" :errors="errors"></error>
                </div>
            </div>

            <div class="col-sm-6">
                <div class="form-group"
                     :class="{ 'has-error': errors.has('customization') }"
                >
                    <label>Type</label>
                    <div class="checkbox">
                        <label>
                            <input type="checkbox"
                                   class="checkbox style-0"
                                   name="customization"
                                   id="customization"
                                   v-model="form.customization">
                            <span>Customized</span>
                        </label>
                    </div>
                    <error input="customization" :errors="errors"></error>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-6">
                <div class="form-group"
                     :class="{ 'has-error': errors.has('level') }"
                >
                    <label>Level</label>
                    <input v-model="form.level"
                           type="text"
                            id="level"
                            name="level"
                            class="form-control"
                    >
                    <error input="level" :errors="errors"></error>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group"
                     :class="{ 'has-error': errors.has('active') }"
                >
                    <label>Status</label>
                    <div class="checkbox">
                        <label>
                            <input type="checkbox"
                                   class="checkbox style-0"
                                   name="active"
                                   id="active"
                                   v-model="form.active">
                            <span>Active</span>
                        </label>
                    </div>
                    <error input="active" :errors="errors"></error>
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
    import swal from "sweetalert2";
    import { mapGetters, mapState, mapActions, mapMutations } from 'vuex';
    import moment from 'moment';
    import Datepicker from 'vuejs-datepicker';
    import { BasicSelect } from 'vue-search-select'
    import * as packageActions from '../../../vuex/modules/packages/actionTypes';
    import * as mealActions from '../../../vuex/modules/meals/actionTypes';

export default {
    components: {
        Datepicker,
        BasicSelect,
    },
    data() {
        let form = {
                code: '',
                label: '',
                customization: false,
                level: null,
                active: false,
                public: false,
            };
        let formFields = Object.keys(form);            
        return {
            form,
            errors: new FormErrors(formFields),            
            ownerSearchText: '',
            owner: {
                value: '',
                text: '',
            },
            
        };
    },
    methods: {
        fetchAll() {
            this.$store.dispatch('meals/' + mealActions.FETCH_ALL);
        },
        save() {
            let vm = this;
            this.$store.dispatch('packages/' + packageActions.SAVE, {
                ...this.form
            }).then(response => {
                vm.$emit('saved');
            }).catch(failedRequest => {
                vm.errors.fill(failedRequest);
            });
        },
        update() {
            let vm = this;
            this.$store.dispatch('packages/' + packageActions.UPDATE,
                this.form
            ).then(response => {
                vm.$emit('updated');
            }).catch(failedRequest => {
                vm.errors.fill(failedRequest);
            });
        },
        populateFormFromPackage(pkg) {
            this.form.label = pkg.label;
            this.form.code = pkg.code;
            this.form.active = pkg.active;
            this.form.level = pkg.level;
            this.form.customization = pkg.customization;
            this.form.public = pkg.public;
        },
    },
    computed: {
        ...mapState('packages', [
            'collection',
            'mode',
            'selected',
            'show',
        ]),
    },
    mounted() {
        this.fetchAll();
        if (this.mode == 'EDIT') {
            this.populateFormFromPackage(this.selected);
        }
    },
    watch: {
        selected(newSelected) {
            if (newSelected)
                this.populateFormFromPackage(newSelected);
        }
    }
}
</script>

<style>

</style>