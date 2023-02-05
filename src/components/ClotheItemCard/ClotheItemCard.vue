<template>
    <div class="container" @click="clickHandle(clothe.id)" >
        <van-image width="18.5rem" height="25rem" fit="cover"
            :src="`${baseUrl}${clothe.banners[0]?clothe.banners[0].imgUrl:''}`" />
        <div class="content">
            <p>{{ clothe.name }}</p>
            <p class="price">{{ clothe.price }}</p>
            <van-tag color="#7232dd" size="medium" plain>{{ clothe.fabric }}</van-tag>
            <van-tag color="#5dbaf0" size="medium" plain>{{ clothe.category }}</van-tag>
            <van-icon v-if="store.favoriteList.includes(clothe.id)" size="1.7rem" color="red" name="like" @click="(e:MouseEvent)=>{
                e.stopPropagation()
                store.removeFavorite(clothe.id)
            }"  />
            <van-icon v-else size="1.7rem" color="red" name="like-o" @click="(e:MouseEvent)=>{
                e.stopPropagation()
                favoriteClick(clothe.id)
            }"  />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { baseUrl } from '../../api';
import { Clothe } from '../../api/clothe';
import { useTouristStore } from '../../store/touristStore';
const router=useRouter()
const store=useTouristStore()
defineProps<{
    clothe: Clothe
}>()

const clickHandle=(id:number)=>{
    router.push('/clothe/'+id)
}

const favoriteClick=(id:number)=>{
    store.addFavorite(id)
}
</script>

<style scoped lang="less">
.container{
    width: 50%;
    background-color: #f2f2f2;
    margin-bottom: 0.5rem;
    padding-bottom: 1rem;
    .content{
        width: 100%;
        position: relative;
        p{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding:0 0.5rem;
            
        }
        .price{
            color: rgb(218, 28, 28);
            padding-left: 1rem;
        }
        .price::after{
            content: '￥';
            font-size: 1.2rem;
        }
        .van-tag{
            margin: 0 0.3rem;
        }
        .van-icon{
            position: absolute;
            right: 1.5rem;
        }
    }
}
</style>