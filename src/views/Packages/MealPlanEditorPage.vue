<template>
    <div>
        <h1>Set the meals for this specific package</h1>
        <admin-meal-plan-editor @saved="cancel()"
                                @updated="cancel()"
                                @cancelled="cancel()"
                                slot="body"
        ></admin-meal-plan-editor>
    </div>
</template>

<script>
    import AdminMealPlanEditor from '../../components/Admin/Packages/MealPlanEditor.vue';
    import * as packageActions from "../../vuex/modules/packages/actionTypes";
    export default {
        components: {
            AdminMealPlanEditor,
        },
        data() {
            return {};
        },
        methods: {
            cancel() {
                this.$store.dispatch('packages/' + packageActions.DESELECT);
                this.$router.go(-1);
            },
        }
    }
</script>

<style>

</style>