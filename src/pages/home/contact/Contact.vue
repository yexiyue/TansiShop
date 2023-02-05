<template>
    <van-image src="/Tansi.png" />
    <p class="description">产品是基础，服务是灵魂，销售打天下，服务定江山。一次合作终身服务，成交只是开始，服务永无止境</p>
    <van-cell class="name" title="微信名片" @click="showCenter=true" is-link />

    <van-popup v-model:show="showCenter" round >
        <van-image src="/weixin.png" />
    </van-popup>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const showCenter=ref(false)
</script>

<style scoped lang="less">
.description{
    width: 80%;
    margin: 0 auto;
    font-size: 1.7rem;
    color: #999;
}

.name{
    width: 90%;
    margin: 2rem auto;
}
</style>