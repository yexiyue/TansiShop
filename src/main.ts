import { routers } from './router/index';
import {createPinia} from 'pinia'
import { createApp } from 'vue'
import 'vant/lib/index.css';
import 'vant/es/toast/style';
import 'vant/es/dialog/style';
import 'vant/es/notify/style';
import 'vant/es/image-preview/style';
import './style.css'
import App from './App.vue'
import { Lazyload } from 'vant';

const app=createApp(App)

app.use(routers)
app.use(createPinia())

app.use(Lazyload,{
    lazyComponent: true,
})
app.mount('#app')
