import {
	silentLogin,
	mnplogin
} from '@/api/app';
import {
	isWeixinClient,
	currentPage,
	trottle,
	tabbarList
} from './tools'
import store from '@/store'
import Cache from './cache'
import {
	BACK_URL
} from '@/config/cachekey'
import wechath5 from './wechath5'
import {
	inputInviteCode,
	getUserInfo
} from '@/api/user'


// 获取登录凭证（code）

export function getWxCode() {
	return new Promise((resolve, reject) => {
		uni.login({
			success(res) {
				resolve(res.code);
			},

			fail(res) {
				reject(res);
			}

		});
	});
}
//小程序获取用户信息
export function getUserProfile() {
	return new Promise((resolve, reject) => {
		uni.getUserProfile({
			desc: '获取用户信息，完善用户资料 ',
			success: (res) => {
				resolve(res);
			},
			fail(res) {}

		})
	})

}
export const wxGetUserInfo = trottle(_wxGetUserInfo, 1000)
async function _wxGetUserInfo() {
	const res = await getUserInfo();
	if (res.code == 1) {
		if (res.data.mobile == '') {

		}
	}
}
export const wxSilentLogin = trottle(_wxSilentLogin, 1000)
async function _wxSilentLogin() {
	const code = await getWxCode()
	const {
		code: loginCode,
		data: loginData,
	show,
	msg
	} = await silentLogin({
		code: code
	});

	const {
		options,
		onLoad,
		onShow,
		route
	} = currentPage()
	if (loginCode != 1) return
	if (loginData.token) {
		// store.commit('LOGIN', loginData)
		uni.setStorageSync("wsf_isLogin", true)
		uni.setStorageSync("wsf_token", loginData.token)
		onLoad && onLoad(options)
		onShow && onShow()
		const inviteCode = Cache.get("INVITE_CODE")
		if (inviteCode) {
			Cache.remove("INVITE_CODE")
			inputInviteCode({
				code: inviteCode
			})
		}
	} else {
		uni.setStorageSync("wsf_isLogin", false)
		uni.setStorageSync("wsf_token", "")
	}
}

export const wxMnpLogin = trottle(_wxMnpLogin, 1000)
//小程序静默授权
async function _wxMnpLogin(userId) {
	console.log("userId=======mnp---", userId)
	const code = await getWxCode()

	uni.getUserInfo({
		provider: 'weixin',
		success: async function(infoRes) {
			const {
				code: loginCode,
				data: loginData,
				msg,
				show,
			} = await mnplogin({
				code: code,
				iv: infoRes.iv,
				encrypted_data: infoRes.encryptedData,
				user_id: userId
			});

			const {
				options,
				onLoad,
				onShow,
				route
			} = currentPage()
			if (loginCode != 1) return
			if (loginData.token) {
				uni.setStorageSync("wsf_isLogin", true)
				uni.setStorageSync("wsf_token", loginData.token)
				onLoad && onLoad(options)
				onShow && onShow()
				const inviteCode = Cache.get("INVITE_CODE")
				if (inviteCode) {
					Cache.remove("INVITE_CODE")
					inputInviteCode({
						code: inviteCode
					})
				}
			} else {
				if (!tabbarList.includes(route)) {
					// #ifndef MP-WEIXIN
					uni.navigateTo({
						url: '/pages/tabbar/index/index'
					})
					// #endif
				}
			}
		}
	});

	// const {code:loginCode, data: loginData} = await silentLogin({
	// 	code 
	// })

}

export const toLogin = trottle(_toLogin, 1000)
// 去登录
function _toLogin() {
	uni.navigateTo({
		url: '/pages/login/login'
	});
	//#ifdef  H5
	const pathLogin = 'pages/login/login'
	let path = currentPage().route
	if (path != pathLogin) {
		uni.navigateTo({
			url: '/pages/login/login'
		})
	}
	// #endif
}
