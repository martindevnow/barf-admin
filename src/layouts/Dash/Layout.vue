<template>
    <div class="app">
        <navigation></navigation>
        <div class="content-wrapper">
            <router-view/>       
        </div>
    </div>

</template>

<script>
    import Navigation from '../../components/Nav/Navigation.vue'

    export default {
        components: {
          Navigation,
        },
        data() {
            return {};
        },
        created() {
            console.log('Created :: Dash.Layout');
        }
    }
</script>

<style scoped>
.content-wrapper {
    background-color: white;
}
</style>