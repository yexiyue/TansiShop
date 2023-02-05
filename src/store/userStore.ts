import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const token = ref(localStorage.getItem('token') ?? '');
  const username = ref("");

  const setToken = (value: string) => {
    token.value = value;
    localStorage.setItem("token", token.value);
  };

  const clearToken = () => {
    localStorage.removeItem("token");
  };

  const adminPageIndex=ref(+localStorage.getItem('adminPageIndex')! ?? 0)

  const setAdminPageIndex=(value:number)=>{
    adminPageIndex.value=value
    localStorage.setItem('adminPageIndex',adminPageIndex.value+'')
  }

  const order=ref(localStorage.getItem('order')==='true'?true:false)

  const setOrder=(desc:boolean)=>{
    order.value=desc
    localStorage.setItem('order',String(order.value))
  }
  return {
    token,
    username,
    setToken,
    clearToken,
    adminPageIndex,
    setAdminPageIndex,
    order,
    setOrder
  };
});
