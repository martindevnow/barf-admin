<template>
  <div class="app">
    <router-view/>
  </div>
</template>

<script>
    import Navigation from './components/Nav/Navigation.vue';
    import {mapState} from "vuex";
    export default {
        name: 'app',
        
        computed: {
            ...mapState([
                'auth'
            ]),
        },
        created() {
          console.log('Created :: App');
          this.$store.commit('loadUser', this);
        }
    }
</script>

<style>

</style>
