<template>
    <div>
        <admin-users-creator @saved="cancel()"
                             @updated="cancel()"
                             @cancelled="cancel()"
                             :showAddresses="mode === 'EDIT'"
        ></admin-users-creator>
    </div>
</template>

<script>
    import AdminUsersCreator from '../../components/Admin/Users/Creator.vue';
    import * as userActions from "../../vuex/modules/users/actionTypes";
    import {mapState} from "vuex";

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
        },
        computed: {
            ...mapState('users', [
                'mode',
            ])
        }
    }
</script>

<style>

</style>