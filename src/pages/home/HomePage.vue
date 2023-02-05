<template>
    <van-nav-bar :fixed="true" :placeholder="true" :safe-area-inset-top="true" title="Tansi天熙" />
    <MainPage v-if="active === 0"></MainPage>
    <HeartPage v-else-if="active === 1"></HeartPage>
    <Contact v-else></Contact>
    
    <van-tabbar :placeholder="true" v-model="active">
        <van-tabbar-item icon="home-o">列表</van-tabbar-item>
        <van-tabbar-item icon="shop-collect-o">收藏</van-tabbar-item>
        <van-tabbar-item icon="phone-circle-o">联系我们</van-tabbar-item>
    </van-tabbar>
    
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MainPage from './main/MainPage.vue';
import HeartPage from './heart/HeartPage.vue';
import Contact from './contact/Contact.vue';
const active = ref(0);

</script>

<style scoped>

</style>