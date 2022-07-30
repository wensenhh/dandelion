<script>
	import {
		wxMnpLogin,
		wxSilentLogin
	} from '@/utils/login.js'

	import {
		isWeixinClient
	} from '@/utils/tools.js'
	export default {
		onLaunch: function() {
			let that = this;
			// #ifdef MP-WEIXIN
			if (wx.canIUse('getUpdateManager')) {
				const updateManager = wx.getUpdateManager();
				updateManager.onCheckForUpdate(function(res) {
					// 请求完新版本信息的回调
					if (res.hasUpdate) {
						updateManager.onUpdateReady(function() {
							that.tui.modal('更新提示', '新版本已经上线啦~，为了获得更好的体验，建议立即更新', false, res => {
								// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
								updateManager.applyUpdate();
							});
						});
						updateManager.onUpdateFailed(function() {
							// 新的版本下载失败
							that.tui.modal('更新失败', '新版本更新失败，为了获得更好的体验，请您删除当前小程序，重新搜索打开', false,
								res => {});
						});
					}
				});
			}
			// wxSilentLogin()
			// that.checkSession()
			// #endif
		},
		onShow: function() {
			// #ifdef MP-WEIXIN
			if (uni.getStorageSync("wsf_isLogin") == true) {
				console.log("来来来wxSilentLogin", )
				wxSilentLogin()
			}
			// that.checkSession()
			// #endif

			// #ifdef H5
			let isWx = isWeixinClient()
			if (uni.getStorageSync("wsf_isLogin") == true) {
				if (isWx) {
					wxSilentLogin()
				}
			}
			// #endif
		},
		onHide: function() {
			//console.log('App Hide')
		},
		methods: {
			checkSession: function() {
				var that = this;
				uni.checkSession({
					success: function() {
						console.log("来判断是否登录中", uni.getStorageSync('wxCode'), !uni.getStorageSync(
								'wxCode') == "" || uni.getStorageSync('wxCode') == undefined,
							"hhhhhhhhh");
						if (uni.getStorageSync('wxCode') == "" || uni.getStorageSync('wxCode') ==
							undefined) {
							that.login();
						} else {
							wxMnpLogin();

						}
					},
					fail: function() {
						that.login();
					}
				})
			},
			login: function() {
				// wx.showLoading({
				//   title: '登录中...',
				// })
				uni.login({
					provider: 'weixin',
					success: function(res) {
						console.log("login=========", res);
						console.log("res:", res)
						uni.setStorageSync('wxCode', res.code)
						wxMnpLogin();

					}
				})
			},
			getSetting() {
				uni.getSetting({
					success(res) {
						if (!res.authSetting['scope.userInfo']) {
							wx.authorize({
								scope: 'scope.userInfo',
								success() {
									// 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
									this.getUserInfo()
								}
							})
						}
					}
				})
			},
			getUserInfo() {
				uni.getUserInfo({
					success: function(res) {
						var userInfo = res.userInfo
					}
				})
			}
		},
		onError: function(err) {
			//全局错误监听
			// #ifdef APP-PLUS
			plus.runtime.getProperty(plus.runtime.appid, widgetInfo => {
				const res = uni.getSystemInfoSync();
				let errMsg =
					`手机品牌：${res.brand}；手机型号：${res.model}；操作系统版本：${res.system}；客户端平台：${res.platform}；错误描述：${err}`;
				console.log('发生错误：' + errMsg);
			});
			// #endif
		}
	};
</script>

<style>
	@import './common/app.css';

	.p-a {
		position: absolute;
	}

	.p-r {
		position: relative;
	}

	.text-center {
		text-align: center;
	}

	.display-f {
		display: flex;
	}

	.align-items {
		align-items: center
	}

	.justify-content {
		justify-content: center
	}

	.ml-auto {
		margin-left: auto;
	}

	.m-top20 {
		margin-top: 20rpx;
	}
</style>
