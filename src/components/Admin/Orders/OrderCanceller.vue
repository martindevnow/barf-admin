<template>
    <admin-notes-creator @cancelled="close()"
                         @saved="cancelOrder()"
    >
    </admin-notes-creator>
</template>

<script>
    import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';
    import * as orderActions from "../../../vuex/modules/orders/actionTypes";
    import AdminNotesCreator from '../Notes/Creator.vue';

    export default {
        components: {
            AdminNotesCreator,
        },
        data() {
            return {};
        },
        methods: {
            cancelOrder() {
                let vm = this;

                this.$store.dispatch('orders/' + orderActions.SAVE_CANCELLED
                ).then(response => {
                    vm.close();
                }).catch(failedRequest => {
                    vm.errors.fill(failedRequest);
                });
            },
            close() {
                this.$store.dispatch('orders/' + orderActions.CLOSE_CANCELLED_LOGGER);
                this.$router.push({name: 'Orders'});
            }
        },
        computed: {
            ...mapState('orders', [
                'selected',
            ]),
        }
    }
</script>

<style>

</style>