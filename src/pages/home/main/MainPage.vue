<template>
    <van-tabs v-model:active="active" sticky>
        <van-tab title="推荐">
            <Clothes default></Clothes>
        </van-tab>
        <van-tab v-for="item in categories" :key="item.id" :title="item.value">
            <Clothes :category="item.value"></Clothes>
        </van-tab>
    </van-tabs>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getCategories } from '../../../api/category';
import Clothes from '../../../components/Clothes/Clothes.vue';
const active = ref(0)
const categories=ref(<{id:number,value:string}[]>[])
onMounted(async () => {
    const res=await getCategories()
    if(res.status==200){
        categories.value=res.data
    }
})
</script>

<style scoped>

</style>