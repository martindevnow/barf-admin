<template>
    <div :class="{ 'input-group' : deletable }">
        <basic-select :options="options"
                      :selected-option="selectedItem"
                      @select="$emit('input', $event)"
                      :isError="hasError"
        >
        </basic-select>
        <div class="input-group-btn" v-if="deletable">
            <button class="btn btn-danger"
                    type="button"
                    @click="$emit('delete')"
            >
                <i class="fa fa-times"></i>
            </button>
        </div>
    </div>

</template>

<script>
    import { BasicSelect } from 'vue-search-select';
    import { mapGetters, mapState, mapActions, mapMutations } from 'vuex';
    import * as actions from '../../../vuex/modules/toppings/actionTypes';
    import * as mutations from '../../../vuex/modules/toppings/mutationTypes';

    export default {
        props: [
            'value',
            'hasError',
            'deletable'
        ],
        components: {
            BasicSelect
        },
        data() {
            return {};
        },
        mounted() {
            this.fetchAll();
        },
        methods: {
            fetchAll() {
                this.$store.dispatch('toppings/' + actions.FETCH_ALL)
            },
            getText(item) {
                return item.label + ' (' + item.id + ')';
            }
        },
        computed: {
            ...mapState('toppings', [
                'collection',
            ]),
            options() {
                let vm = this;
                return this.collection.map(item => {
                    return {
                        ...item,
                        text: vm.getText(item),
                    };
                });
            },
            selectedItem() {
                if ( ! this.value.id) {
                    return { text: 'Select ...' };
                }

                return {
                    ...this.value,
                    text: this.getText(this.value),
                };
            }
        },
    }
</script>

<style>

</style>