// import './assets/main.css'
import './index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

// createApp(App).mount('#app')

const app = createApp(App)
app.use(createPinia())
app.mount('#app')
