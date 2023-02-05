<template>
    <van-nav-bar :fixed="true" :placeholder="true" :safe-area-inset-top="true" title="Tansi天熙" />
    <keep-alive>
        <MainPageVue v-if="active === 0"></MainPageVue>
        <AddPageVue v-else-if="active === 1"></AddPageVue>
        <SetPageVue v-else></SetPageVue>
    </keep-alive>
    
    <van-tabbar :placeholder="true" v-model="active" @change="onChange">
        <van-tabbar-item icon="home-o">列表</van-tabbar-item>
        <van-tabbar-item icon="add-o">添加</van-tabbar-item>
        <van-tabbar-item icon="setting-o">设置</van-tabbar-item>
    </van-tabbar>
    
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MainPageVue from './mainPage/MainPage.vue'
import AddPageVue from './addPage/AddPage.vue'
import SetPageVue from './setPage/SetPage.vue'
import { useUserStore } from '../../store/userStore';
const store=useUserStore()
const active = ref(store.adminPageIndex);
const onChange=(index:number)=>{
    store.setAdminPageIndex(index)
}
</script>

<style scoped>

</style>