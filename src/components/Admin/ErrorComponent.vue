<template>
    <div v-if="errors.has(input)" class="alert-error">
        <span class="help-block">{{ errors.first(input) }}</span>
    
    </div>
</template>
<script>

    export default {

        props: ['input', 'errors'],

        data(){
            return {}
        },

        methods: {},
 
        computed: {},

        watch: {},

        mounted(){}
    }

</script>

<style>
.help-block {
    color: red;
}
</style>