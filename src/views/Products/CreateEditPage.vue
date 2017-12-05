<template>
    <div>
        <admin-products-creator @saved="cancel()"
                                @updated="cancel()"
                                @cancelled="cancel()"
        ></admin-products-creator>
    </div>
</template>

<script>
    import AdminProductsCreator from '../../components/Admin/Products/Creator.vue';
    import * as productActions from "../../vuex/modules/products/actionTypes";
export default {
    components: {
        AdminProductsCreator
    },
    data() {
        return {};
    },
    methods: {
        cancel() {
            this.$store.dispatch('products/' + productActions.CANCEL);
            this.$router.push({ name: 'Products' });
        }
    }
}
</script>

<style>

</style>