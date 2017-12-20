<template>
    <div>

    </div>
</template>

<script>

export default {
    data() {
        return {};
    },
    mounted() {
        let vm = this;
        this.$store.dispatch('logout').then(response => {
            vm.$router.push('/login')
        });
    }

}
</script>

<style>

</style>