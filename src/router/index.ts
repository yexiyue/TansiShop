import {createRouter,createWebHashHistory,RouteRecordRaw} from 'vue-router'
import IndexPageVue from '../pages/index/IndexPgae.vue'
import HomePageVue from '../pages/home/HomePage.vue'
const routes:RouteRecordRaw[]=[
    {
        path:'/',
        component:IndexPageVue
    },
    {
        path:'/home',
        component:HomePageVue
    },
    {
        path:'/admin',
        component:()=>import('../admin/login/LoginPgae.vue')
    },
    {
        path:'/manage',
        component:()=>import('../admin/home/Home.vue')
    },
    {
        path:'/clothe/:id',
        component:()=>import('../components/ClotheItemDetail/ClotheItemDetail.vue')
    },
    {
        path:'/modify/:id',
        component:()=>import('../admin/home/addPage/ModifyClothe.vue')
    },

    {
        path:'/category',
        component:()=>import('../admin/home/setPage/SetCategory.vue')
    }
]

export const routers=createRouter({
    history:createWebHashHistory(),
    routes
})

routers.beforeEach((to,from,next)=>{
    const token=localStorage.getItem('token')
    if(to.path==='/manage'){
        if(!token){
            next('/admin')
        }
        next()
    }
    if(to.path==='/admin' && token){
        next('/manage')
    }
    next()
})