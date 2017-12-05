<template>
    <div>
        <h1>Replace meals in this pet's meal plan</h1>
        <admin-plans-meal-replacement @cancelled="closeMealReplacementModal()"
                                      slot="body"
        >
        </admin-plans-meal-replacement>
    </div>
</template>

<script>
    import AdminPlansMealReplacement from '../../components/Admin/Plans/MealReplacement.vue';
    import * as planActions from "../../vuex/modules/plans/actionTypes";
    export default {
        components: {
            AdminPlansMealReplacement,
        },
        data() {
            return {};
        },
        methods: {
            closeMealReplacementModal() {
                this.$store.dispatch('plans/' + planActions.CLOSE_MEAL_REPLACEMENT_CREATOR);
                this.$router.go(-1);
            },
        }
    }
</script>

<style>

</style>