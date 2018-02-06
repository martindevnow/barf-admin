<template>
  <v-app id="inspire">
    <navigation></navigation>
    <v-content>
      <v-container fluid fill-height>
        <v-layout
          justify-center
          align-center
        >

          <router-view/>

        </v-layout>
      </v-container>
    </v-content>
    <v-footer color="primary" app>
      <span class="white--text">Copyright &copy; 2018 BARFBento</span>
    </v-footer>
  </v-app>
</template>

<script>
  import VContent from "vuetify/es5/components/VGrid/VContent";
  import Navigation from './components/Layout/Navigation.vue';

  export default {
    components: {VContent, Navigation},
    name: 'app',
    computed: {},
    created() {
      console.log('App created');
      this.$store.dispatch('ping');
    },
  }
</script>

<style>
  .input-group__details:after {
    background-color: rgba(255, 255, 255, 0.32) !important;
  }
</style>
