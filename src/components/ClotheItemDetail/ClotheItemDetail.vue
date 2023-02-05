<template>
    <div>
        <van-nav-bar fixed placeholder title="商品详情" left-text="返回" left-arrow @click-left="onClickLeft" />
        <van-swipe :autoplay="3000" lazy-render>
            <van-swipe-item v-for="(image,index) in clothe.clothe.banners" :key="image">
                <van-image @click="imgPreview(index)" fit="cover" width="100%" height="40rem" :src="`${baseUrl}${image.imgUrl}`" />
            </van-swipe-item>
        </van-swipe>
        <div class="container">
            <van-cell center title="名称：" :value="clothe.clothe.name" />
            <van-cell center title="货号："  :value="clothe.clothe.articleNo" />
            <van-cell center title="种类："  :value="clothe.clothe.category" />
            <van-cell center title="面料："  :value="clothe.clothe.fabric" />
            <van-cell center title="价格："  :value="`${clothe.clothe.price}￥`" />
            <template v-if="clothe.clothe.frontImg">
                <van-cell title="正面：" />
                <van-image fit="cover" height="25rem" :src="`${baseUrl}${clothe.clothe.frontImg}`" />
            </template>
            
            <template v-if="clothe.clothe.backImg">
                <van-cell title="背面：" />
                <van-image fit="cover" height="25rem" :src="`${baseUrl}${clothe.clothe.backImg}`" />
            </template>
            
            <van-cell v-for="item in clothe.clothe.colorCount" center title="颜色(数量)："  :value="`${item.color}(至少${item.count}件)`" />
            <van-cell title="上传时间：" :value="new Date(clothe.clothe.createTime).toLocaleString('zh-cn')" />
            
        </div>

        <template v-if="route.query.admin">
            <van-submit-bar  placeholder class="submit-bar-class" button-type="primary" button-text="编辑" @submit="onModify" >
            </van-submit-bar>
        </template>

        <template v-else>
            <van-submit-bar  placeholder class="submit-bar-class"  button-text="进货" @submit="onSubmit" >
                <p>厂家直销，质量保证</p>
            </van-submit-bar>
        </template>

        <van-popup v-model:show="showCenter" >
            <p class="add-weixin">加我微信，直接下单</p>
            <van-image src="/weixin.png" />
        </van-popup>
    </div>
</template>

<script setup lang="ts">
import { showImagePreview, showNotify } from 'vant';
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { baseUrl } from '../../api';
import { Clothe, getClotheDetail } from '../../api/clothe'
const route = useRoute()
const router = useRouter()
const clothe = reactive({
    clothe: <Clothe>{}
})

const showCenter=ref(false)
onMounted(async () => {
    try {
        clothe.clothe = (await getClotheDetail(route.params.id as string)).data
    } catch (error: any) {
        showNotify({ type: 'warning', message: error.toString() });
    }

})
const onClickLeft = () => {
    router.back()
}

const imgPreview=(index:number)=>{
    const list=clothe.clothe.banners.map(item=>`${baseUrl}${item.imgUrl}`)

    showImagePreview({
        images:list,
        startPosition:index
    })
}

const onSubmit = () => {
    showCenter.value=true
};

const onModify=()=>{
    router.push('/modify/'+clothe.clothe.id)
}
</script>

<style scoped lang="less">
.image{
    height: 20rem;
    width: 100%;
}

.container{
    padding: 2rem;
}

.submit-bar-class{
    background-color: transparent;
    p{
        position: absolute;
        left: 3rem;
        font-size: 1.6rem;
        color: #F01727;
    }
}
.add-weixin{
    font-size: 1.6rem;
    text-align: center;
    color: #999;
}
</style>