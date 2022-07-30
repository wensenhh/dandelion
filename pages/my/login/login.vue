<template>
	<view class="container">

		<view class="h-80">
			<view class="info-box">
				<view class="info-title">
					使用密码登录
				</view>
				<view class="info-desc">
					未注册用户请通过手机验证码直接登录
				</view>
				<view class="">
					<view class="div_style">

						<input type="number" v-model="loginInfo.account" name="account" placeholder="请输入账户" />

					</view>
				</view>
				<view class="withdrawalStyle" style="border-bottom: 2rpx solid #EEEEEE; ">
					<view class="div_style">
						<input type="password" v-model="loginInfo.password" name="password" placeholder="请输入登录密码" />

					</view>
				</view>

			</view>

			<view class="hrea-center" @click="href(3)">
				手机快捷登录
			</view>
		</view>


		<view class="bottom-service">
			<view class="btn-top" @click="sumbit">
				<tui-button height="90rpx" :size="34" type="green" shape="circle">登录</tui-button>
			</view>

			<view class="bottom-center">

				<label>
					<checkbox style="transform:scale(0.7)" :checked="checkbox" @tap.stop="checkBoxClick" />
				</label>
				<view class="">
					你同意蒲公英
				</view>
				<view class="color-blue" @click="href(1)">
					《服务协议》
				</view>
				与
				<view class="color-blue" @click="href(2)">
					《隐私政策》
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import form from "@/components/common/tui-validation/tui-validation.js"
	import {accountLogin} from "@/api/app.js"
	
	export default {
		data() {
			return {
				show: true,
				count: '',
				code: "",
				timer: null,
				checkbox: false,
				loginInfo: {
					password: "",
					account: "",
				},
			}
		},
		onLoad() {
			this.loginInfo.account=uni.getStorageSync("wsf_account")
		},
		methods: {
			href(page) {
				//未登录状态下应跳转至登录页面，此处未作处理
				let url = '';
				switch (page) {
					case 1:
						url = "/pages/my/service-agreement/service-agreement"
						break
					case 2:
						url = "/pages/my/privacy-policy/privacy-policy"
						break
					case 3:
						url = "/pages/my/login-mobile/login-mobile"
						break
					default:
						break;
				}
				// if (url) {
				if (page == 3) {
					uni.redirectTo({
						url: url
					})
				} else {
					this.tui.href(url);
				}
				// } else {
				// 	this.tui.toast('功能尚未完善~');
				// }
			},
			checkBoxClick() {

				if (this.checkbox) {
					this.checkbox = false
				} else {
					this.checkbox = true
				}
			},
			async sumbit() {
				let rules = [{
					name: "account",
					rule: ["required"],
					msg: ["请输入账户"]
				}, {
					name: "password",
					rule: ["required"],
					msg: ["请输入密码"]
				}];

				let checkRes = form.validation(this.loginInfo, rules);
				if (!checkRes) {
					if (!this.checkbox) {
						this.tui.toast("请打勾同意")
						return false
					}
					// uni.switchTab({
					// 	url: "/pages/tabbar/my/my"
					// })
					// uni.setStorageSync('islogin', true);
					// this.tui.toast('提交成功');
						const res = await accountLogin(this.loginInfo)
						if (res.code == 1) {
							uni.setStorageSync("wsf_account",this.loginInfo.account)
							this.tui.toast(res.msg);
							this.tui.setToken(res.data.token)
							this.tui.setIsLogin(true)
							uni.reLaunch({
								url: "/pages/tabbar/my/my"
							})
						} else {
							if (res.show == 1) {
								this.tui.toast(res.msg);
								// this.loginInfo.account="";
								// this.loginInfo.password="";
							}
						}
				} else {
					this.tui.toast(checkRes)
				}
			},
			getCode() {
				if (!this.checkbox) {
					this.tui.toast("请打勾同意")
					return false
				}
				const TIME_COUNT = 60;
				if (!this.timer) {
					this.count = TIME_COUNT;
					this.show = false;
					this.timer = setInterval(() => {
						if (this.count > 0 && this.count <= TIME_COUNT) {
							this.count--;
						} else {
							this.show = true;
							clearInterval(this.timer);
							this.timer = null;
						}
					}, 1000)
				}
			}
		}
	}
</script>

<style>
	.h-80 {
		height: 80%;
	}

	.container {
		padding: 30rpx 50rpx 30rpx;
	}

	.withdrawalStyle {
		border-top: 2rpx solid #EEEEEE;
		margin: auto;
	}

	.div_style {
		display: flex;
		padding: 28rpx 0rpx;
		position: relative;
	}

	.div_style .available {
		width: 180rpx;
	}

	.div_style .serviceCharge {
		margin-left: 28rpx;
	}

	.div_style .serviceCharge {
		position: absolute;
		right: 0;
		width: 200rpx;
	}

	.div_style button {
		width: 237rpx;
		background-color: #F73037;
		border-radius: 5rpx;
		font-size: 28rpx;
		color: #FFFFFF;
	}

	.btnSure {
		position: fixed;
		bottom: 64rpx;
		width: 100%;
	}

	.btnSure button {
		width: 95%;
		border-radius: 60rpx;
		background-color: #F73037;
		color: #FFFFFF;
		font-size: 24rpx;
		padding: 18rpx;
	}

	.div_style .money {
		color: #FF5555;
	}

	.div_style .choice {
		color: #F73037;
	}

	.sczm image {
		width: 165rpx;
		height: 165rpx;
	}

	.btn-top {
		margin-top: 60rpx;
	}



	.info-box {
		font-size: 34rpx;
		color: #2C2D2C;
	}

	.info-title {
		margin: 40rpx 0rpx;
		font-size: 44rpx;
		font-weight: bolder;
	}

	.bottom-service {}

	.info-desc {
		font-size: 28rpx;
		color: #999999;
		margin-bottom: 40rpx;
	}

	.hrea-center {
		font-size: 32rpx;
		text-align: center;
		margin-top: 60rpx;
		font-weight: bolder;
	}

	.bottom-center {
		display: flex;
		text-align: center;
		font-size: 28rpx;
		margin-top: 40rpx;
		align-items: center;
	}

	.bottom-service {
		position: fixed;
		bottom: 60rpx;
		z-index: 999;
		width: 87%;
	}

	.color-blue {
		color: #003CE9;
	}
</style>
