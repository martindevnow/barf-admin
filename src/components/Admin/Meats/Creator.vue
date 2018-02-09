<template>
    <form @keydown="errors.clear($event.target.name)"
          @submit.prevent=""
    >

        <div class="row">
            <div class="col-sm-6">
                <div class="form-group"
                     :class="{ 'has-error': errors.has('code') }"
                >
                    <label for="code">code</label>
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
                     :class="{ 'has-error': errors.has('type') }"
                >
                    <label for="type">type</label>
                    <input type="text"
                           class="form-control"
                           id="type"
                           name="type"
                           v-model="form.type"
                    >
                    <error input="type" :errors="errors"></error>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-6">
                <div class="form-group"
                     :class="{ 'has-error': errors.has('variety') }"
                >
                    <label for="variety">variety</label>
                    <input type="text"
                           class="form-control"
                           id="variety"
                           name="variety"
                           v-model="form.variety"
                    >
                    <error input="variety" :errors="errors"></error>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group"
                     :class="{ 'has-error': errors.has('cost_per_lb') }"
                >
                    <label for="cost_per_lb">cost_per_lb</label>
                    <input cost_per_lb="text"
                           class="form-control"
                           id="cost_per_lb"
                           name="cost_per_lb"
                           v-model="form.cost_per_lb"
                    >
                    <error input="cost_per_lb" :errors="errors"></error>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-6">
                <div class="form-group"
                     :class="{ 'has-error': errors.has('has_bone') }"
                >
                    <label>Status</label>
                    <div class="checkbox">
                        <label>
                            <input type="checkbox"
                                   class="checkbox style-0"
                                   name="has_bone"
                                   id="has_bone"
                                   v-model="form.has_bone">
                            <span>Has Bone?</span>
                        </label>
                    </div>
                    <error input="has_bone" :errors="errors"></error>
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
    import * as meatActions from '../../../vuex/modules/meats/actionTypes';

    export default {
        data() {
            let form = {
                    code: '',
                    type: '',
                    variety: '',
                    has_bone: '',
                    cost_per_lb: '',
                };
            let formFields = Object.keys(form);
            return {
                errors: new FormErrors(formFields),
                form,
            };
        },
        methods: {
            populateFormFromModel(meat) {
                this.form.code = meat.code;
                this.form.type = meat.type;
                this.form.variety = meat.variety;
                this.form.cost_per_lb = meat.cost_per_lb;
                this.form.has_bone = meat.has_bone;
            },
            save() {
                let vm = this;
                this.$store.dispatch('meats/' + meatActions.SAVE,
                    this.form
                ).then(response => {
                    vm.$emit('saved');
                }).catch(failedRequest => {
                    vm.errors.fill(failedRequest);
                });
            },
            update() {
                let vm = this;
                this.$store.dispatch('meats/' + meatActions.UPDATE,
                    this.form
                ).then(response => {
                    vm.$emit('updated');
                }).catch(failedRequest => {
                    vm.errors.fill(failedRequest);
                });
            },
        },
        computed: {
            ...mapState('meats', [
                'show',
                'selected',
                'mode',
                'collection'
            ]),
        },
        mounted() {
            this.$store.dispatch('meats/' + meatActions.FETCH_ALL);
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