<template>
    <div>
        <admin-notes-creator @saved="cancel()"
                                @updated="cancel()"
                                @cancelled="cancel()"
        ></admin-notes-creator>
    </div>
</template>

<script>
    import { mapGetters, mapState, mapActions, mapMutations } from "vuex";
    import AdminNotesCreator from '../../components/Admin/Notes/Creator.vue';
    import * as planActions from "../../vuex/modules/plans/actionTypes";
    import * as noteMutations from "../../vuex/modules/notes/mutationTypes";

    export default {
        components: {
            AdminNotesCreator
        },
        data() {
            return {};
        },
        methods: {
            cancel() {
                this.$store.dispatch('plans/' + planActions.CANCEL);
                this.$router.go(-1);
            }
        },
          computed: {
            ...mapState("notes", ["targeted"])
        },
        mounted() {
            console.log(this.$router.params);
            this.$store.dispatch("plans/" + planActions.FETCH_PLAN_NOTES, this.targeted.model.id)
            .then(response => {
                this.$store.commit('notes/' + noteMutations.ATTACH_TO_TARGETED, response);
            });
        },
    }
</script>

<style>

</style>