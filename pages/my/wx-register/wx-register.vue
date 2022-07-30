<template>
	<view class="container">
		<view class="info-box">
			<view class="info-box">
				<view class="info-title">
					填写注册信息
				</view>
				<view class="" style="border-top: 2rpx solid #EEEEEE; ">
					<view class="div_style">
						<view class="available">
							手机号
						</view>
						<input type="number" v-model="registerInfo.mobile" name="mobile" placeholder="请输入手机号" />

					</view>
				</view>
				<view class="" style="border-top: 2rpx solid #EEEEEE; ">
					<view class="div_style">
						<view class="available">
							姓名
						</view>
						<input type="text" v-model="registerInfo.nickname" name="nickname" placeholder="请输入姓名" />
					</view>
				</view>

				<view class="" style="border-top: 2rpx solid #EEEEEE; ">
					<view class="div_style">
						<view class="available">
							登录密码
						</view>
						<input type="password" v-model="registerInfo.password" name="password" placeholder="请输入登录密码" />

					</view>
				</view>

				<view class="" style="border-top: 2rpx solid #EEEEEE; ">
					<view class="div_style">
						<view class="available">
							支付密码
						</view>
						<input type="password" v-model="registerInfo.pay_password" name="pay_password"
							placeholder="请设置支付密码" />

					</view>
				</view>

				<view class="withdrawalStyle" style="border-bottom: 2rpx solid #EEEEEE; ">
					<view class="div_style">
						<view class="available">
							验证码
						</view>
						<input type="number" v-model="registerInfo.code" placeholder="请输入手机验证码"
							style="margin-left: 40rpx;" />
						<button type="default" v-show="show" @click="getCode">获取验证码</button>
						<button type="default" v-show="!show" @click="getCode">{{count}}s</button>
					</view>
				</view>
			</view>
		</view>

		<view class="btn-top" @click="sumbit">
			<tui-button height="90rpx" :size="34" type="green" shape="circle">立即注册</tui-button>
		</view>
	</view>
</template>

<script>
	import {
	getUserInfo
	} from '@/api/user';
	import form from "@/components/common/tui-validation/tui-validation.js"
	export default {
		data() {
			return {
				show: true,
				count: '',
				timer: null,
				leaderInfo: {},
				registerInfo: {
					pay_password: "",
					name: "",
					password: "",
					bankCard: "",
					client: 2,
					mobile: "",
					code: "",
				}
			}
		},
		onLoad() {
		},
		methods: {
			
			sumbit() {
				let rules = [{
					name: "mobile",
					rule: ["required", "isMobile"],
					msg: ["请输入手机号", "请输入正确的手机号"]
				}, {
					name: "nickname",
					rule: ["required"],
					msg: ["请输入名字"]
				}, {
					name: "password",
					rule: ["required"],
					msg: ["请输入登录密码"]
				}, {
					name: "pay_password",
					rule: ["required"],
					msg: ["请输入支付密码"]
				}, {
					name: "code",
					rule: ["required"],
					msg: ["请输入验证码"]
				}];
				let checkRes = form.validation(this.registerInfo, rules);
				if (!checkRes) {
					this.tui.toast('提交成功');
					this.tui.request("/account/register", "POST", this.registerInfo).then((res) => {
						console.log(res)
						if (res.code == 1) {
							this.tui.toast('提交成功');
							this.tui.setToken(res.data)
							this.tui.setIsLogin(true)
							uni.reLaunch({
								url: "/pages/tabbar/my/my"
							})
						} else {
							if (res.show == 1) {
								this.tui.toast(res.msg);
							}
						}
					}).catch((res) => {})
				} else {
					this.tui.toast(checkRes)
				}
			},
			getCode() {
				let rules = [{
					name: "mobile",
					rule: ["required", "isMobile"],
					msg: ["请输入手机号", "请输入正确的手机号"]
				}];

				let checkRes = form.validation(this.registerInfo, rules);
				if (!checkRes) {
					this.tui.toast('提交成功');
					this.tui.request("/sms/send", "POST", {
						mobile: this.registerInfo.mobile,
						key: "ZCYZ"
					}).then((res) => {
						console.log(res, res.code == 1)
						if (res.code == 1) {
							this.tui.toast(res.msg);
						} else {
							if (res.show == 1) {
								this.tui.toast(res.msg);
							}
						}
					}).catch((res) => {})
					this.codeTime()
				} else {
					this.tui.toast(checkRes)
				}

			},
			codeTime() {
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
		font-size: 26rpx;
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
		font-size: 26rpx;
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

	.bank-title {
		text-align: center;
		font-size: 38rpx;
		font-weight: bolder;
		margin: 20rpx 0rpx;
	}

	.bank-desc {
		text-align: center;
		font-size: 32rpx;
		margin-bottom: 80rpx;
	}

	.info-box {
		font-size: 34rpx;
		color: #2C2D2C;
	}

	.info-title {
		margin: 40rpx 0rpx;
		text-align: center;
		font-size: 44rpx;
		font-weight: bolder;
	}
</style>
