<template>
    <div class="content">
        <router-view/>    
    </div>
</template>

<script>
    export default {
        data() {
            return {};
        },
        created() {
            console.log('Created :: Auth.Layout');
        }
    }
</script>

<style></style>