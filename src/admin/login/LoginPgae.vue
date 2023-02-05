<template>
    <div class="container">
        <van-image width="100%" src="/Tansi.png" />

        <van-form @submit="onSubmit" class="form">
            <van-cell-group inset>
                <van-field v-model="username" name="username" label="用户名" placeholder="用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]" />
                <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]" />
            </van-cell-group>
            <van-button round type="primary" native-type="submit">
                登录
            </van-button>
        </van-form>

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { login } from '../../api/user';
import {useUserStore} from '../../store/userStore'
import { showSuccessToast, showFailToast } from 'vant';
import {useRouter} from 'vue-router'
const username = ref()
const password = ref()
const store=useUserStore()
const router=useRouter()

const onSubmit = async (values:any) => {
    try {
        const res=await login(values)
        if(res.status==201){
            store.setToken(res.data.token)
            store.username=res.username
            showSuccessToast('登录成功')
            router.push('/manage')
        }else{
            showFailToast('账号密码错误')
        }
    } catch (error) {
        showFailToast('账号密码错误')
    }
}
</script>

<style scoped lang="less">
.container {
    height: 100%;
    background-color: #f2f5f5;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.form {
    width: 90%;
    display: flex;
    flex-direction: column;

    .van-button {
        width: 70%;
        margin: 3rem auto;
    }
}
</style>