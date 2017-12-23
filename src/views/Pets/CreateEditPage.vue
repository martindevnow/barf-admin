<template>
    <div>
        <admin-pets-creator @saved="cancel()"
                            @updated="cancel()"
                            @cancelled="cancel()"
                            slot="body"
        ></admin-pets-creator>
    </div>
</template>

<script>
    import AdminPetsCreator from '../../components/Admin/Pets/Creator.vue';
    import * as petActions from "../../vuex/modules/pets/actionTypes";

    export default {
        components: {
            AdminPetsCreator
        },
        data() {
            return {};
        },
        methods: {
            cancel() {
                this.$store.dispatch('pets/' + petActions.CANCEL);
                this.$router.push({ name: 'Pets' });
            }
        }
    }
</script>

<style>

</style>