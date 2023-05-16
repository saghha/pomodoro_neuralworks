import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import RadialProgressBar from "vue3-radial-progress";
import BootstrapVue3 from 'bootstrap-vue-3'
import VueNumberInput from '@chenfengyuan/vue-number-input';
import ModalPlugin  from "bootstrap-vue-3";

import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const app = createApp(App);

app.use(ModalPlugin);
app.use(BootstrapVue3)
app.use(RadialProgressBar)

app.component(VueNumberInput.name, VueNumberInput);

app.use(store)
app.use(router)
app.mount('#app')
