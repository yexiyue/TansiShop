<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
document.documentElement.style.fontSize=document.documentElement.clientWidth/37.5+'px'
window.onresize=()=>{
  document.documentElement.style.fontSize=document.documentElement.clientWidth/37.5+'px'
}
</script>

<style scoped>

</style>