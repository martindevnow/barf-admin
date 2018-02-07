<template>
    <div v-if="has(input)" class="alert-error">
        <span class="help-block">{{ first(input) }}</span>
    
    </div>
</template>
<script>

    export default {

        props: ['input', 'errors'],

        data(){
            return {}
        },

        methods: {
            has(errorKey) {
                return this.errors.has(errorKey);
            },
            first(errorKey) {
                console.log('fuck');
                return this.errors.first(errorKey);
            }
        },
 
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