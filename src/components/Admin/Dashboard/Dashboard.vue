<template>
    <div>
        <h1>BARFBento Admin Area</h1>
        <p>use one of the links to view the respective areas you're interested in...</p>
        <hr>
        <p>Welcome back, {{ auth.user.name }}</p>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    export default {
        data() {
            return {
                toppings: [],
                address: {},
                token: '',
            };
        },
        computed: {
            ...mapState([
                'auth'
            ]),
        },
        methods: {
            login() {
                let username = 'benm@barfbento.com';
                let password = '123456';
                let user = {
                    username, password,
                };
                this.$store.dispatch('login', {user});
            },
        }
    }
</script>

<style>

</style>