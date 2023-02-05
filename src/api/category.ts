import {axios} from './index'

export const getCategories=async ()=>{
    return (await axios.get('/category')).data
}

export const changeCategory=async(id:number,value:string)=>{
    return (await axios.patch('/category/'+id,{
        value
    })).data
}

export const createCategory=async (value:string)=>{
    return (await axios.post('/category',{
        value
    })).data
}

export const deleteCategory=async(id:number)=>{
    return (await axios.delete('/category/'+id)).data
}