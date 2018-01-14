<template>
<div class="container">
    <div class="overlay" v-show="loading">
        <div id="loading-img"></div>
    </div>

    <div class="card card-login mx-auto mt-5">
      <div class="card-header">Login</div>
      <div class="card-body">
        <form lpformnum="1" v-show="showForm">
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input class="form-control" 
                    id="exampleInputEmail1" 
                    type="email" 
                    v-model="email"
                    aria-describedby="emailHelp" 
                    placeholder="Enter email" 
                    autocomplete="off">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input class="form-control" 
                    id="exampleInputPassword1" 
                    type="password" 
                    v-model="password"
                    placeholder="Password" 
                    autocomplete="off">
          </div>
          <div class="form-group">
            <div class="form-check">
              <label class="form-check-label">
                <input class="form-check-input" type="checkbox"> Remember Password</label>
            </div>
          </div>
          <a class="btn btn-primary btn-block" 
                @click.prevent="login()">Login</a>
        </form>
        <div class="text-center">
          <a class="d-block small mt-3" href="register.html">Register an Account</a>
          <a class="d-block small" href="forgot-password.html">Forgot Password?</a>
        </div>
      </div>
    </div>
  </div>

        


</template>

<script>
import eventBus from '../../events/eventBus';
import swal from 'sweetalert2'
import {mapState} from "vuex";

export default {
    props: ['cart_hash'],
    data() {
        return {
            user: {},
            loading: false,
            name: "",
            email: "",
            password: "",
            showForm: true,
        }
    },
    computed: {
        ...mapState([
            'auth'
        ]),
    },
    methods: {
        loadUser(user) {
            this.user = user;
            this.showForm = false;
        },
        login() {
            this.loading = true;
            let vm = this;
            let user = {
                username: this.email,
                password: this.password,
            };
            this.$store.dispatch('login', {user, app: this}).then(response => {
                vm.$router.push('/');
            });
            this.loading = false;
        },
    },
}
</script>

<style>
    #loading-img {
        background: url(http://preloaders.net/preloaders/360/Velocity.gif) center center no-repeat;
        height: 100%;
        z-index: 20;
    }

    .overlay {
        background: #e9e9e9;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        opacity: 0.5;
    }
</style>
