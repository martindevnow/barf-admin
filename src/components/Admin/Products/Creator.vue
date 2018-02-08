<template>
    <form @keydown="errors.clear($event.target.name)"
          @submit.prevent=""
    >

        <div class="row">
            <div class="col-sm-6">
                <div class="form-group"
                     :class="{ 'has-error': errors.has('name') }"
                >
                    <label for="name">name</label>
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
                     :class="{ 'has-error': errors.has('description') }"
                >
                    <label for="description">description</label>
                    <input type="text"
                           class="form-control"
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
                <div class="form-group"
                     :class="{ 'has-error': errors.has('description_long') }"
                >
                    <label for="description_long">description_long</label>
                    <input type="text"
                           class="form-control"
                           id="description_long"
                           name="description_long"
                           v-model="form.description_long"
                    >
                    <error input="description_long" :errors="errors"></error>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group"
                     :class="{ 'has-error': errors.has('size') }"
                >
                    <label for="size">size</label>
                    <input type="text"
                           class="form-control"
                           id="size"
                           name="size"
                           v-model="form.size"
                    >
                    <error input="size" :errors="errors"></error>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-6">
                <div class="form-group"
                     :class="{ 'has-error': errors.has('sku') }"
                >
                    <label for="sku">sku</label>
                    <input type="text"
                           class="form-control"
                           id="sku"
                           name="sku"
                           v-model="form.sku"
                    >
                    <error input="sku" :errors="errors"></error>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group"
                     :class="{ 'has-error': errors.has('price') }"
                >
                    <label for="price">price</label>
                    <input type="text"
                           class="form-control"
                           id="price"
                           name="price"
                           v-model="form.price"
                    >
                    <error input="price" :errors="errors"></error>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-6">
                <div class="form-group"
                     :class="{ 'has-error': errors.has('ingredients') }"
                >
                    <label for="ingredients">ingredients</label>
                    <input type="text"
                           class="form-control"
                           id="ingredients"
                           name="ingredients"
                           v-model="form.ingredients"
                    >
                    <error input="ingredients" :errors="errors"></error>
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
import { mapGetters, mapState, mapActions, mapMutations } from 'vuex';
import moment from 'moment';
import * as productActions from "../../../vuex/modules/products/actionTypes";
import * as toppingActions from "../../../vuex/modules/toppings/actionTypes";

export default {
    data() {
        let form = {
                name: '',
                description: '',
                description_long: '',
                size: '',
                sku: '',
                ingredients: '',
                price: '',
                active: '',
            };
        let formFields = Object.keys(form);
            
        return {
            errors: new FormErrors(formFields),            
            form,
        };
    },
    methods: {
        fetchAll() {
            this.$store.dispatch('products/' + productActions.FETCH_ALL);
            this.$store.dispatch('toppings/' + toppingActions.FETCH_ALL);
        },
        save() {
            let vm = this;
            this.$store.dispatch('products/' + productActions.SAVE, {
                ...this.form,
            }).then(response => {
                vm.$emit('saved');
            }).catch(failedRequests => {
                vm.errors.fill(failedRequests);
            });
        },
        update() {
            let vm = this;
            this.$store.dispatch('products/' + productActions.UPDATE, this.form
            ).then(response => {
                vm.$emit('updated');
            }).catch(failedRequests => {
                vm.errors.fill(failedRequests);
            });
        },
        populateFormFromProduct(product) {
            this.form.name = product.name;
            this.form.description = product.description;
            this.form.description_long = product.description_long;
            this.form.size = product.size;
            this.form.sku = product.sku;
            this.form.ingredients = product.ingredients;
            this.form.price = product.price;
            this.form.active = product.active;
        },
    },
    computed: {
        ...mapState('products', ['show', 'selected', 'mode', 'collection']),
    },
    mounted() {
        this.fetchAll();
        if (this.mode == 'EDIT') {
            this.populateFormFromProduct(this.selected);
        }
    },
    watch: {
        selected(newSelected) {
            if (newSelected)
                this.populateFormFromProduct(newSelected);
        }
    }
}
</script>

<style>

</style>
