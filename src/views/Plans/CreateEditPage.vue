<template>
    <div>
        <admin-plans-creator @saved="cancel()"
                                @updated="cancel()"
                                @cancelled="cancel()"
        ></admin-plans-creator>
    </div>
</template>

<script>
    import AdminPlansCreator from '../../components/Admin/Plans/Creator.vue';
    import * as planActions from "../../vuex/modules/plans/actionTypes";
    export default {
        components: {
            AdminPlansCreator
        },
        data() {
            return {};
        },
        methods: {
            cancel() {
                this.$store.dispatch('plans/' + planActions.CANCEL);
                this.$router.push({ name: 'Plans' });
            }
        }
    }
</script>

<style>

</style>