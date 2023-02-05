<template>
    <van-empty v-if="clothes.length===0" description="暂无收藏的商品，赶快去添加吧！" />
    <div class="clotheBox">
        <ClotheItemCard v-for="item in clothes" :clothe="item" ></ClotheItemCard>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useTouristStore } from '../../../store/touristStore';
import {Clothe, getFavoriteList} from '../../../api/clothe'
const store=useTouristStore()
const clothes=ref<Clothe[]>([])
onMounted(async ()=>{
    const res=await getFavoriteList(store.favoriteList)
    clothes.value=res.data
})
store.$subscribe(async()=>{
    const res=await getFavoriteList(store.favoriteList)
    clothes.value=res.data
})
</script>

<style scoped>
.clotheBox{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
</style>