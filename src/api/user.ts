import {axios} from './index'

export const login=async (data:{username:string,password:string})=>{
    return (await axios.post('/user/login',data)).data;
}