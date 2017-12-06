<template>
    <div>
        <admin-users-creator @saved="cancel()"
                             @updated="cancel()"
                             @cancelled="cancel()"
                             slot="body"
        ></admin-users-creator>
    </div>
</template>

<script>
    import AdminUsersCreator from '../../components/Admin/Users/Creator.vue';
    import * as userActions from "../../vuex/modules/users/actionTypes";

    export default {
        components: {
            AdminUsersCreator
        },
        data() {
            return {};
        },
        methods: {
            cancel() {
                this.$store.dispatch('users/' + userActions.CANCEL);
                this.$router.push({ name: 'Users' });
            }
        }
    }
</script>

<style>

</style>