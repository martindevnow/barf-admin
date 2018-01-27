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
        this.$store.dispatch('logout', this).then(response => {
            vm.$router.push('/login')
        });
    }

}
</script>

<style>

</style>