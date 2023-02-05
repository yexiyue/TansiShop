<template>
    <lazy-component>
        <van-card @click="onClick(item.id)" v-for="item in clothes" :price="item.price" :desc="item.articleNo"
            :title="item.name" :thumb="`${baseUrl}${item.banners.length ? item.banners.at(0).imgUrl : ''}`">
            <template #tags>
                <van-tag plain v-if="item.fabric" type="primary">{{ item.fabric }}</van-tag>
                <van-tag plain type="primary">{{ item.category }}</van-tag>
            </template>
            <template #footer>

                <div v-if="!item.publish" class="my-button">
                    <van-button @click="(e: MouseEvent) => {
                        e.stopPropagation()
                        changePublish(item.id, !item.publish)
                    }" type="primary" size="mini">上架</van-button>

                    <van-button @click="(e: MouseEvent) => {
                        e.stopPropagation()
                        changePublish(item.id, !item.publish,true)
                    }" type="danger" size="mini">删除</van-button>
                </div>

                <van-button class="my-button" @click="(e: MouseEvent) => {
                    e.stopPropagation()
                    changePublish(item.id, !item.publish)
                }" type="danger" v-else size="mini">下架</van-button>
            </template>
        </van-card>
    </lazy-component>
</template>

<script setup lang="ts">
import { Clothe, deleteClothe, updatePublish } from '../../../api/clothe';
import { useRouter } from 'vue-router'
import { baseUrl } from '../../../api';
import { showNotify } from 'vant';
const router = useRouter()

const props = defineProps<{
    clothes: Clothe[],
    onLoad: () => void,
}>()
const onClick = (id: number) => {
    router.push({
        path: `/clothe/${id}`,
        query: <any>{
            admin: true
        }
    })
}

const changePublish = async (id: number, publish: boolean, flag: boolean = false) => {
    let res: any
    if (flag) {
        res=await deleteClothe(id+'')
    } else { 
        res = await updatePublish(id + '', publish) 
    }
    props.onLoad()
    if (res.status === 200) {
        showNotify({ type: 'success', message: '操作成功' });
    } else {
        showNotify({ type: 'danger', message: '操作失败' });
    }
}
</script>

<style scoped>
.my-button {
    position: absolute;
    right: 2rem;
    bottom: 2rem;
}
</style>