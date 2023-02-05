import axios from 'axios'
import {  showFailToast, showSuccessToast,} from 'vant';
axios.defaults.baseURL='http://43.138.16.164:3000/';

export const baseUrl='http://43.138.16.164:3000/'

axios.interceptors.request.use((config)=>{
    const token=localStorage.getItem('token')
    if(token){
        config.headers.Authorization=token
    }
    return config
},(error)=>{
    showFailToast(error.toString());
    return Promise.reject(error)
})

axios.interceptors.response.use((res)=>{
    showSuccessToast('加载成功')
    return res
},(error)=>{
    showFailToast(error.toString());
    return Promise.reject(error)
})
export  {axios}