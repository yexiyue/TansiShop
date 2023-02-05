import { defineStore } from 'pinia';
import { ref } from 'vue';


export const useTouristStore=defineStore('tourist',()=>{
    const favoriteList=ref<number[]>(JSON.parse(localStorage.getItem('favoriteList') ?? '[]'))

    const addFavorite=(id:number)=>{
        favoriteList.value.push(id)
        localStorage.setItem('favoriteList',JSON.stringify(favoriteList.value))
    }

    const removeFavorite=(id:number)=>{
        favoriteList.value.splice(favoriteList.value.findIndex(item=>item===id),1)
        localStorage.setItem('favoriteList',JSON.stringify(favoriteList.value))
    }
    return {
        favoriteList,
        addFavorite,
        removeFavorite
    }
})