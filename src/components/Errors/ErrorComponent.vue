<template>
    <div v-if="loadedErrors.has(input)" class="alert-error">
        <span class="help-block">{{ loadedErrors.first(input) }}</span>
    
    </div>
</template>
<script>
    import FormErrors from '../../models/FormErrors';

    export default {

        props: ['input', 'errors'],

        data(){
            return {
                loadedErrors: new FormErrors(),
            }
        },

        methods: {},
 
        computed: {},

        watch: {},

        mounted(){
            this.loadedErrors = this.errors;
        },
    }

</script>

<style>
.help-block {
    color: red;
}
</style>