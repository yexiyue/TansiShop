<template>
    <div>
        <van-tabs v-model:active="active" @change="onChange" sticky>
            <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                <van-tab title="未上架">
                    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                        <GoodsItem :onLoad="() => active = 1" :clothes="clothes"></GoodsItem>
                    </van-list>
                </van-tab>
                <van-tab title="已上架">
                    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                            <GoodsItem :onLoad="() => active = 0" :clothes="clothes"></GoodsItem>
                        </van-list>
                    </van-pull-refresh>
                </van-tab>
            </van-pull-refresh>
        </van-tabs>
        <van-back-top right="12vw" bottom="18vw" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import GoodsItem from './GoodsItem.vue';
import { Clothe, getClothes, getCount } from '../../../api/clothe'

const active = ref(0);
const publish = ref(false);
let index = 0
const clothes = ref<Clothe[]>([])
let count = 0;
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const onRefresh = () => {
    // 清空列表数据
    finished.value = false;

    // 重新加载数据
    // 将 loading 设置为 true，表示处于加载状态
    loading.value = true;
    onLoad();
};

onMounted(async () => {
    count = (await getCount(publish.value)).data
})

watch(active, async (newValue) => {

    await onChange(newValue)
})

const onChange = async (value: number) => {

    //清空数组
    clothes.value = []
    //重置索引
    index = 0
    //设置重新刷新为true
    refreshing.value = true
    if (value === 1) {
        publish.value = true
    } else {
        publish.value = false
    }
    count = (await getCount(publish.value)).data
    //设置没有加载完
    finished.value = false
}

const onLoad = async () => {

    //下拉刷新
    if (refreshing.value) {
        clothes.value = []
        index = 0
        refreshing.value = false
    }
    //触底加载
    const res = await getClothes(5, index, publish.value)
    clothes.value.push(...res.data)
    index += 5
    loading.value = false
    //最大后显示没有了
    if (clothes.value.length >= count) {
        finished.value = true
    }
};


</script>

<style scoped>

</style>