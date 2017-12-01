<template>
    <div>
        <h1>BARFBento Admin Area</h1>
        <p>use one of the links to view the respective areas you're interested in...</p>

    </div>
</template>

<script>
export default {
    data() {
        return {
            toppings: [],
            address: {},
        };
    },
    methods: {
        addTopping() {
            this.toppings.push({});
        },
        removeTopping(index) {
            this.toppings.splice(index, 1);
        }
    }

}
</script>

<style>

</style>