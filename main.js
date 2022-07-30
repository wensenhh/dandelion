import App from './App'
import store from './store'
import tui from './common/httpRequest'
import uView from "@/components/uview-ui";
import minxinsApp from '@/mixins/app'
import request from '@/utils/request'
// import Web3 from 'web3'
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
import $comment from './utils/comment.js'
import tools from '@/common/tools.js'
Vue.prototype.$tools = tools
Vue.prototype.$comment = $comment
Vue.prototype.tui = tui
Vue.prototype.$store = store
Vue.prototype.$request = request
// Vue.prototype.Web3 = Web3

App.mpType = 'app'
Vue.use(uView);
Vue.mixin(minxinsApp);
 Vue.config.ignoredElements.push('wx-open-launch-weapp')
const app = new Vue({
	store,
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	app.use(store)
	app.config.globalProperties.tui = tui;
	return {
		app
	}
}
// #endif