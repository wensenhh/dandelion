import axios from '../js_sdk/xtshadow-axios/axios.min'
import store from '../store'
import {
	paramsToStr,
	currentPage,
	tabbarList,
	acountList
} from './tools'
import Cache from './cache'
import {
	TOKEN,
	BACK_URL
} from '../config/cachekey'
import {
	baseURL
} from '../config/app'
import {
	getWxCode,
	toLogin,
	wxMnpLogin
} from './login'

let index = 0;

function checkParams(params) {
	if (typeof params != 'object') return params
	for (let key in params) {
		const value = params[key];
		if (value === null || value === undefined || value === "") {
			delete params[key];
		}
	}
	return params;
}



const service = axios.create({
	baseURL: `${baseURL}/api`,
	timeout: 10000,
	header: {
		'content-type': 'application/json'
	},

});


// request拦截器
service.interceptors.request.use(
	config => {
		config.data = checkParams(config.data)
		config.params = checkParams(config.params)
		if (config.method == 'GET') {
			config.url += paramsToStr(config.params)
		}
		// config.header.token = uni.getStorageSync("my_token")
		config.header.Authorization = uni.getStorageSync("my_token")
		return config
	},
	error => {
		// Do something with request error
		console.log(error) // for debug
		Promise.reject(error)
	}
)

// response 拦截器
service.interceptors.response.use(
	async (response) => {
			if (response.data) {
				const {
					code,
					show,
					msg
				} = response.data;
				const {
					route,
					options
				} = currentPage()
				console.log("request 拦截器===",code,show,msg)
				if (code == 0 && msg) {
					uni.showToast({
						title: msg,
						icon: "none"
					})
				} else if (code == -1) {
					// store.commit('LOGOUT')
			
					//#ifdef H5 || APP-PLUS
					if (route && !tabbarList.includes(route)) {
						toLogin()
					}
					// #endif
					//#ifdef H5 
					if (!acountList.includes(route)) {
						Cache.set(BACK_URL, `/${route}${paramsToStr(options)}`)
					}
					// #endif
				}
			}
			console.log(response.data)
			return Promise.resolve(response.data)
		},
		error => {
			// tryHideFullScreenLoading()
			console.log(error)
			console.log('err' + error) // for debug
			return Promise.reject(error)
		}
)

export default service
