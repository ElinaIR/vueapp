import { createApp } from 'vue'
import App from './App.vue'
import router from './routes.js'
import 'bootstrap/dist/css/bootstrap.min.css' 
import 'bootstrap/dist/js/bootstrap.min.js'
import store from './store'

const app = createApp(App)
app.use(router).use(store)
app.mount('#app')

