<template>
      <v-layout row wrap>
        <v-flex xs12 sm6 offset-sm3 md6 offset-md3>
          <v-card>
            <!--<v-toolbar color="red" dark>-->
              <!--<v-toolbar-title>Login</v-toolbar-title>-->
            <!--</v-toolbar>-->
            <v-card-text>

              <page-loading v-if="loading"></page-loading>

              <form @submit.prevent="login()" :disabled="loading">
                <span class="title">Login Info</span>
                <v-text-field
                  label="Email"
                  class="mt-2"
                  v-model="email"
                  :rules="[() => email.length > 0 || 'This field is required']"
                  required
                ></v-text-field>

                <v-text-field
                  type="password"
                  label="Password"
                  v-model="password"
                  :rules="[() => password.length > 0 || 'This field is required']"
                  required
                  @keyup.13="login()"
                ></v-text-field>
                <small>* indicates required field</small>
                <div>
                  <v-btn color="primary" @click.prevent="login()">Login</v-btn>
                </div>
              </form>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>



</template>

<script>
import swal from "sweetalert2";
import { mapState } from "vuex";

export default {
  props: ["cart_hash"],
  data() {
    return {
      user: {},
      loading: false,
      name: "",
      email: "",
      password: ""
    };
  },
  computed: {
    ...mapState(["auth"])
  },
  methods: {
    loadUser(user) {
      this.user = user;
    },
    login() {
      this.loading = true;
      let vm = this;
      let user = {
        username: this.email,
        password: this.password
      };
      this.$store
        .dispatch("login", { user, app: this })
        .then(response => {
          vm.$router.push("/");
          vm.loading = false;
        })
        .catch(error => {
          vm.loading = false;
        });
    }
  }
};
</script>

<style>



</style>
