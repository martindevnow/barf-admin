<template>
    <div>
        <admin-packages-creator @saved="cancel()"
                                @updated="cancel()"
                                @cancelled="cancel()"
                                slot="body"
        ></admin-packages-creator>
    </div>
</template>

<script>
    import AdminPackagesCreator from '../../components/Admin/Packages/Creator.vue';
    import * as packageActions from "../../vuex/modules/packages/actionTypes";
    export default {
        components: {
            AdminPackagesCreator
        },
        data() {
            return {};
        },
        methods: {
            cancel() {
                this.$store.dispatch('packages/' + packageActions.CANCEL);
                this.$router.push({ name: 'Packages' });
            }
        }
    }
</script>

<style>

</style>