<template>
    <nav class="" id="mainNav">
        <a class="">BARFBento</a>
        <button class="" 
                type="button">
        </button>
        <div class="">
            <ul v-if="! auth.isAuthenticated"
                class=""
            >
                <li class="" data-toggle="tooltip" data-placement="right" title="Dashboard">
                    <router-link class="nav-link" :to="'/auth/login'">
                    <i class="fa fa-fw fa-dashboard"></i>
                    <span class="nav-link-text">Login</span>
                </router-link>
                </li>
            </ul>
            <ul v-if="auth.isAuthenticated"
                class="navbar-nav navbar-sidenav" id="exampleAccordion">
                <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Dashboard">
                    <router-link class="nav-link" :to="'/'">
                        <i class="fa fa-fw fa-dashboard"></i>
                        <span class="nav-link-text">Home</span>
                    </router-link>
                </li>
                <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Charts">
                    <router-link class="nav-link" :to="'meals'">
                        <i class="fa fa-fw fa-area-chart"></i>
                        <span class="nav-link-text">Meals</span>
                    </router-link>
                </li>
                <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Charts">
                    <router-link class="nav-link" :to="'meats'">
                        <i class="fa fa-fw fa-area-chart"></i>
                        <span class="nav-link-text">meats</span>
                    </router-link>
                </li>
                <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Charts">
                    <router-link class="nav-link" :to="'orders'">
                        <i class="fa fa-fw fa-area-chart"></i>
                        <span class="nav-link-text">orders</span>
                    </router-link>
                </li>
                <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Charts">
                    <router-link class="nav-link" :to="'packages'">
                        <i class="fa fa-fw fa-area-chart"></i>
                        <span class="nav-link-text">packages</span>
                    </router-link>
                </li>
                <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Charts">
                    <router-link class="nav-link" :to="'pets'">
                        <i class="fa fa-fw fa-area-chart"></i>
                        <span class="nav-link-text">pets</span>
                    </router-link>
                </li>
                <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Charts">
                    <router-link class="nav-link" :to="'plans'">
                        <i class="fa fa-fw fa-area-chart"></i>
                        <span class="nav-link-text">plans</span>
                    </router-link>
                </li>
                <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Charts">
                    <router-link class="nav-link" :to="'products'">
                        <i class="fa fa-fw fa-area-chart"></i>
                        <span class="nav-link-text">products</span>
                    </router-link>
                </li>
                <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Charts">
                    <router-link class="nav-link" :to="'purchase-orders'">
                        <i class="fa fa-fw fa-area-chart"></i>
                        <span class="nav-link-text">pos</span>
                    </router-link>
                </li>
                <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Charts">
                    <router-link class="nav-link" :to="'users'">
                        <i class="fa fa-fw fa-area-chart"></i>
                        <span class="nav-link-text">users</span>
                    </router-link>
                </li>
            </ul>
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <router-link :to="'/auth/logout'"
                                class="nav-link" data-toggle="modal" data-target="#exampleModal">
                        <i class="fa fa-fw fa-sign-out"></i>Logout
                    </router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>


<script>
    import {mapState} from "vuex";

    export default {
        name: 'navigation',
        data() {
            return {};
        },
        computed: {
            ...mapState([
                'auth'
            ]),
        },
        created() {
            console.log('Created :: Navigation');
        }
    }
</script>


<style>
</style>