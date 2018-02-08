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

        methods: {
            has(errorKey) {
                return this.errors.has(errorKey);
            },
            first(errorKey) {
                console.log('fuck');
                return this.errors.first(errorKey);
            },
            setData() {
                this.loadedErrors = this.errors;
            }
        },
 
        computed: {},

        watch: {
            errors(newVal) {
                console.log('field: '+ this.input);
                console.log('error changed to: ' );
                console.log(newVal);
                this.setData();
            }
        },

        mounted(){
            this.setData();
        },
    }

</script>

<style>
.help-block {
    color: red;
}
</style>