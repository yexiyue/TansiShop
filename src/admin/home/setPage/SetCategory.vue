<template>
    <div>
        <van-nav-bar fixed placeholder title="设置分类" left-text="返回" left-arrow @click-left="onClickLeft" />
        <van-cell-group inset>
            <van-cell v-for="item in category" :title="item.value">
                <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                <template #default>
                    <van-button type="primary" size="mini" @click="modifyCategory(item.id)">修改</van-button>
                    <van-button type="danger" size="mini" @click="deleteConfirm(item.id)">删除</van-button>
                </template>
            </van-cell>
        </van-cell-group>

        <van-popup v-model:show="modify">
            <template #default>
                <div class="my-popup">
                    <p>修改分类</p>
                    <van-field v-model="value" label="分类：" placeholder="请输入分类" />
                    <van-button type="success" size="small" @click="finishedModify">完成</van-button>
                </div>
            </template>
        </van-popup>

        <van-action-sheet v-model:show="show" cancel-text="取消" title="确定删除吗？">
            <div class="content">
                <p>该操作将会删除对应的商品</p>
                <van-button type="danger" @click="deleteCategoryById">确认删除</van-button>
            </div>
        </van-action-sheet>

        <van-button class="my-button" type="primary" @click="add=true">添加分类</van-button>
        <van-popup v-model:show="add">
            <template #default>
                <div class="my-popup">
                    <p>添加分类</p>
                    <van-field v-model="value" label="分类：" placeholder="请输入分类" />
                    <van-button type="success" size="small" @click="addCategory">完成</van-button>
                </div>
            </template>
        </van-popup>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getCategories, deleteCategory, changeCategory, createCategory } from '../../../api/category';

const router = useRouter()
const category = ref<{ id: number, value: string }[]>([])

const show=ref(false)
const value = ref('')
const modify = ref(false)
const add=ref(false)
onMounted(async () => {
    await load()
})

const load = async () => {
    const res = await getCategories()
    category.value = res.data
}

const onClickLeft = () => {
    router.back()
}
let currentId: number
const modifyCategory = (id: number) => {
    currentId = id
    modify.value = true
}

const finishedModify = async () => {
    await changeCategory(currentId,value.value)
    modify.value=false
    value.value=''
    await load()
    
}

const deleteConfirm=(id:number)=>{
    currentId = id
    show.value=true
}

const deleteCategoryById=async ()=>{
    show.value=false
    await deleteCategory(currentId)
    await load()
}

const addCategory=async ()=>{
    add.value=false
    await createCategory(value.value)
    value.value=''
    await load()
}
</script>

<style scoped lang="less">
.my-button {
    position: absolute;
    margin-top: 2rem;
    left: 50%;
    transform: translate(-50%, 0%);

}

.my-popup {
    width: 100%;
    height: 25rem;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

    p {
        font-size: 1.8rem;
        text-align: center;
        color: #999;
    }

    .van-button {
        width: 50%;
    }
}

.content{
    height: 15rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    p{
        font-size: 2rem;
        color: red;
    }
}
</style>