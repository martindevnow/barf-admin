<template>
  <div id="app">
    <ul v-if="auth.isAuthenticated">
      <li><router-link :to="'/'">Home</router-link></li>
      <li><router-link :to="'/meals'">Meals</router-link></li>
      <li><router-link :to="'/meats'">Meats</router-link></li>
      <li><router-link :to="'/orders'">Orders</router-link></li>
      <li><router-link :to="'/packages'">Packages</router-link></li>
      <li><router-link :to="'/pets'">Pets</router-link></li>
      <li><router-link :to="'/plans'">Plans</router-link></li>
      <li><router-link :to="'/products'">Products</router-link></li>
      <li><router-link :to="'/purchase-orders'">POs</router-link></li>
      <li><router-link :to="'/users'">Users</router-link></li>
      <li><router-link :to="'/logout'">Logout</router-link></li>
    </ul>
    <ul v-if="! auth.isAuthenticated">
      <li><router-link :to="'/login'">Login</router-link></li>
    </ul>
    <router-view/>
  </div>
</template>

<script>
    import {mapState} from "vuex";
    export default {
        name: 'app',
        computed: {
            ...mapState([
                'auth'
            ]),
        },
        created() {
          console.log('App created');
          this.$store.commit('loadUser', this);
        }
    }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
