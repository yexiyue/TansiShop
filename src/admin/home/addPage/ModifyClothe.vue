<template>
    <van-nav-bar fixed placeholder title="编辑商品" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-form class="container" @submit="onSubmit">
        <van-field v-model="values.name" name="name" label="名称" placeholder="名称"
            :rules="[{ required: true, message: '请填写名称' }]" />
        <van-field v-model="values.articleNo" name="articleNo" label="货号" placeholder="#001" />

        <!-- 上传图片 -->
        <van-field name="uploader" label="主轮播图(最多5张)">
            <template #input>
                <van-uploader @delete="(_,{index})=>deleteImg(index,values.banners)" v-model="fileList" :max-count="5" :after-read="(value) => {
                    afterRead(value, values.banners)
                }" multiple />
            </template>
        </van-field>

        <van-field v-model="values.fabric" name="fabric" label="面料" placeholder="丝光棉" />

        <van-field v-model="values.price" type="number" name="price" label="价格" placeholder="价格" />

        <van-field v-model="values.category" @click="showPicker = true" readonly is-link
            :rules="[{ required: true, message: '请选择分类' }]" name="category" label="分类" placeholder="连衣裙" />
        <van-popup v-model:show="showPicker" position="bottom">
            <van-picker :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
        </van-popup>


        <van-field name="uploader2" label="货款前图">
            <template #input>
                <van-uploader @delete="(_,{index})=>deleteImg(index,values.frontImg)" v-model="fileList1" :max-count="1" :after-read="(value) => {
                    afterRead(value, values.frontImg)
                }" multiple />
            </template>
        </van-field>

        <van-field name="uploader2" label="货款后图">
            <template #input>
                <van-uploader @delete="(_,{index})=>deleteImg(index,values.backImg)" v-model="fileList2" :max-count="1" :after-read="(value) => {
                    afterRead(value, values.backImg)
                }" multiple />
            </template>
        </van-field>
        <van-button @click="onAddColorCount" square type="primary" size="small">添加颜色数量</van-button>
        <template v-for="item in values.colorCount">
            <van-field v-model="item.color" name="color" label="颜色" placeholder="砖红色" />
            <van-field v-model="item.count" type="number" name="count" label="数量" placeholder="100" />
        </template>
        
        <van-button  class="my-button" round type="primary" block native-type="submit">
            修改新商品
        </van-button>
    </van-form>

</template>

<script setup lang="ts">
import { UploaderFileListItem } from 'vant/lib/uploader/types';
import { onMounted, reactive, ref } from 'vue';
import { Clothe, updateClothe, uploadImage } from '../../../api/clothe'
import { getCategories } from '../../../api/category'
import { createClothe,getClotheDetail } from '../../../api/clothe'
import {  showNotify, } from 'vant';
import { useRoute, useRouter } from 'vue-router';
import { baseUrl } from '../../../api';

const router=useRouter()
const route=useRoute()

const id=route.params.id


const values = reactive({
    name: '',
    articleNo: '',
    banners: <string[]>[],
    fabric: '',
    price: 0,
    category: '',
    frontImg: <string[]>[],
    backImg: <string[]>[],
    colorCount:<{color:string,count:number}[]>[
       
    ]
})

const fileList = ref<{url:string}[]>([])

const fileList1 = ref<{url:string}[]>([])
const fileList2 = ref<{url:string}[]>([])

onMounted(async ()=>{
    const res=(await getClotheDetail(id as string)).data  as Clothe
    values.name=res.name
    values.articleNo=res.articleNo
    values.banners=res.banners.map(item=>item.imgUrl)
    values.fabric=res.fabric
    values.price=res.price
    values.category=res.category
    values.frontImg=[res.frontImg]
    values.backImg=[res.backImg]
    values.colorCount=res.colorCount

    fileList.value=res.banners.map(item=>({
        url:`${baseUrl}${item.imgUrl}`
    }))

    fileList1.value=[{
        url:`${baseUrl}${res.frontImg}`
    }]

    fileList2.value=[{
        url:`${baseUrl}${res.backImg}`
    }]
})

const onClickLeft = () => {
    router.back()
}



//上传图片
const afterRead = async (file: UploaderFileListItem | UploaderFileListItem[], arr: string[]) => {

    if (file instanceof Array) {
        for (let i of file) {
            i.status = 'uploading'
            const res = await uploadImage(i.file!)
            if (res.status === 201) {
                i.status = 'done'
                arr.push(res.data)
            }
        }
    } else {
        file.status = 'uploading'
        const res = await uploadImage(file.file!)
        if (res.status === 201) {
            file.status = 'done'
            arr.push(res.data)
        }
    }
}

//删除图片
const deleteImg=(index:number,arr:string[])=>{
    arr.splice(index,1)
}
//提交表单
const onSubmit = async (value: any) => {
    const data = { ...values, backImg: values.backImg[0], frontImg: values.frontImg[0], price: +values.price }
    const res = (await updateClothe(id as string,data))
    console.log(res)
    if (res.status !== 200) {
        showNotify({ type: 'danger', message: '修改失败',lockScroll:true });
    } else {
        // 成功通知
        showNotify({ type: 'success', message: '修改成功',lockScroll:true });
        router.back()
        //重置数据
        values.name = ''
        values.articleNo = ''
        values.banners = <string[]>[]
        values.fabric = ''
        values.price = 0
        values.category = ''
        values.frontImg = <string[]>[]
        values.backImg = <string[]>[]
        values.colorCount=[]

        fileList.value=[]
        fileList1.value=[]
        fileList2.value=[]
    }

}

//展示选择器
const showPicker = ref(false);
const columns = ref<{ text: string, value: string }[]>([])

onMounted(async () => {
    const res = await getCategories()
    columns.value.push(...(res.data as { id: number, value: string }[]).map(item => ({
        text: item.value,
        value: item.value
    })))
})

//@ts-ignore
const onConfirm = ({ selectedOptions }) => {
    values.category = selectedOptions[0]?.text;
    showPicker.value = false;
};

const onAddColorCount=()=>{
    values.colorCount.push({
        color:'黑色',
        count:100
    })
}

</script>

<style scoped>
.my-button {
    width: 60%;
    margin: 2rem auto;
    
}
</style>