<template>
    <div>
        <admin-meals-creator @saved="cancel()"
                             @updated="cancel()"
                             @cancelled="cancel()"
                             slot="body"
        ></admin-meals-creator>
    </div>
</template>

<script>
    import AdminMealsCreator from '../../components/Admin/Meals/Creator.vue';
    import * as mealActions from "../../vuex/modules/meals/actionTypes";

    export default {
        components: {
            AdminMealsCreator
        },
        data() {
            return {};
        },
        methods: {
            cancel() {
                this.$store.dispatch('meals/' + mealActions.CANCEL);
                this.$router.push({ name: 'Meals' });
            }
        }
    }
</script>

<style>

</style>