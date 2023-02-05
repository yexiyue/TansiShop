<template>
    <van-list class="clotheBox" v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <ClotheItemCard v-for="item in list" :clothe="item" ></ClotheItemCard>
    </van-list>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Clothe, getClothes, getClothesByCategory, getCount, getCountByCategory } from '../../api/clothe';
import ClotheItemCard from '../ClotheItemCard/ClotheItemCard.vue';
const list = ref(<Clothe[]>[]);
const loading = ref(false);
const finished = ref(false);
let index=0
let count:number
const props=defineProps<{
    default?:boolean,
    category?:string
}>()
onMounted(async ()=>{
    if(props.category){
        count=(await getCountByCategory(props.category,true)).data
    }else{
        count=(await getCount(true)).data
    }
})
const onLoad = async () => {
    // 异步更新数据
    // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    if(props.default){
        const res=await getClothes(5,index,true)
        list.value.push(...res.data)
    }

    if(props.category){
        const res=await getClothesByCategory(5,index,true,props.category)
        list.value.push(...res.data)
    }

    loading.value=false
    index+=5
    if(list.value.length>=count){
        finished.value=true
    }
}
</script>

<style scoped lang="less">
.clotheBox{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
</style>