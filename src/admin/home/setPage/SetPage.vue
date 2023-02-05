<template>
    <div>
        <van-image src="/Tansi.png" />
    </div>
    <van-cell title="设置分类" is-link to="/category" />
    <van-cell title="默认时间正序">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #default>
            <van-switch @change="store.setOrder" v-model="store.order" />
        </template>
    </van-cell>

    <van-button type="primary" style="width:80%; margin:2rem 10%;" @click="logout">退出登录</van-button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import {useUserStore} from '../../../store/userStore'
const router=useRouter()
const store=useUserStore()

const logout=()=>{
    store.clearToken()
    router.push('/')
}
</script>

<style scoped>

</style>