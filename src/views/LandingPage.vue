<template>
    <div class="content card mt-5 mx-auto card-login">
        <h1>Welcome</h1>

        <ul>
            <li v-if="! auth.isAuthenticated">
                <router-link :to="'/auth/login'">Login</router-link>
            </li>
            <li v-if="auth.isAuthenticated">
                <router-link :to="'/dash/'">Dashboard</router-link>
            </li>
            <li v-if="auth.isAuthenticated">
                <router-link :to="'/auth/logout'">Logout</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        data() {
            return {};
        },
        computed: {
            ...mapState([
                'auth'
            ]),
        },
    }
</script>

<style></style>