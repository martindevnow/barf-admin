<template>
  <div>
    <v-navigation-drawer
      fixed
      clipped
      temporary
      floating
      v-model="drawer"
      app
    >
      <v-list dense>


        <v-list-tile v-for="nl in default_nav_links"
                     :key="nl.title"
                     @click="navigateTo(nl.url)">
          <v-list-tile-action>
            <v-icon>{{ nl.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ nl.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-if="auth.isAuthenticated"
                     v-for="nl in auth_nav_links"
                     :key="nl.title"
                     @click="navigateTo(nl.url)">
          <v-list-tile-action>
            <v-icon>{{ nl.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ nl.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-if="! auth.isAuthenticated"
                     v-for="nl in guest_nav_links"
                     :key="nl.title"
                     @click="navigateTo(nl.url)">
          <v-list-tile-action>
            <v-icon>{{ nl.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ nl.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="primary" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>BARFBento</v-toolbar-title>
    </v-toolbar>
  </div>
</template>

<script>
  import VToolbar from "vuetify/es5/components/VToolbar/VToolbar";
  import {mapState} from "vuex";

  export default {
    components: {VToolbar},
    computed: {
      ...mapState([
        'auth'
      ]),
    },
    data() {
      return {
        drawer: null,
        default_nav_links: [
          {
            title: 'Home',
            icon: 'home',
            url: '/',
          }
        ],
        guest_nav_links: [
          {
            title: 'Login',
            icon: 'fa-sign-in',
            url: '/login',
          }
        ],
        auth_nav_links: [
          {
            title: 'Logout',
            icon: 'fa-sign-out',
            url: '/logout',
          },
          {
            title: 'Meals',
            icon: 'fa-cutlery',
            url: '/meals',
          },
          {
            title: 'Meats',
            icon: 'fa-apple',
            url: '/meats',
          },
          {
            title: 'Orders',
            icon: 'fa-first-order',
            url: '/orders',
          },
          {
            title: 'Packages',
            icon: 'fa-truck',
            url: '/packages',
          },
          {
            title: 'Pets',
            icon: 'pets',
            url: '/pets',
          },
          {
            title: 'Plans',
            icon: 'fa-th-list',
            url: '/plans',
          },
          {
            title: 'Products',
            icon: 'fa-shopping-bag',
            url: '/products',
          },
          {
            title: 'Purchase Orders',
            icon: 'move_to_inbox',
            url: '/purchase-orders',
          },
          {
            title: 'Users',
            icon: 'people',
            url: '/users',
          },
        ]
      }
    },
    methods: {
      navigateTo(url) {
          this.$router.push(url);
      }
    }
  }
</script>

<style>

</style>
