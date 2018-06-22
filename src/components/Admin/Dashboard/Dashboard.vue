<template>
    <div>
      <page-loading v-if="loading"></page-loading>
        <h1>BARFBento Admin Area</h1>
        <hr>
        <p v-if="auth.user.name">Welcome back, {{ auth.user.name }}</p>
        <router-link
          tag="button"
          to="/login"
          class="btn btn-block btn-primary" v-if="!auth.user.name"
        >
          Login</router-link>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    export default {
        data() {
            return {
              loading: false,
            };
        },
        computed: {
            ...mapState([
                'auth'
            ]),
        },
        methods: {
        }
    }
</script>

<style>

</style>
