<template>
  <div class="loading-component">
    <div class="backdrop"></div>
    <v-progress-circular
      indeterminate color="primary"

    ></v-progress-circular>
  </div>
</template>

<script>
export default {}
</script>

<style>
.backdrop {
  background: #e9e9e9;
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  z-index: 1;
}
.progress-circular {
  height: 64px;
  width: 64px;
  z-index: 2;
  position: fixed;
  left: 50%;
  top: 50%;
  margin-top: -32px;
  margin-left: -32px;
}
</style>
