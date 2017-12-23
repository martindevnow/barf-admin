<template>
    <div>
        <admin-meats-creator @saved="cancel()"
                             @updated="cancel()"
                             @cancelled="cancel()"
                             slot="body"
        ></admin-meats-creator>
    </div>
</template>

<script>
    import AdminMeatsCreator from '../../components/Admin/Meats/Creator.vue';
    import * as meatActions from "../../vuex/modules/meats/actionTypes";

    export default {
        components: {
            AdminMeatsCreator
        },
        data() {
            return {};
        },
        methods: {
            cancel() {
                this.$store.dispatch('meats/' + meatActions.CANCEL);
                this.$router.push({ name: 'Meats' });
            }
        }
    }
</script>

<style>

</style>