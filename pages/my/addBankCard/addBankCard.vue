<template>
	<view class="container">
		<view class="bank-title">
			添加银行卡
		</view>
		<view class="bank-desc">
			请绑定持卡人本人的银行卡
		</view>
		<view class="withdrawalStyle">
			<view class="div_style">
				<view class="available">
					持卡人
				</view>
				<input type="text" v-model="bankInfo.card_holder" name="card_holder" placeholder="请输入持卡人姓名" />

			</view>
			<view class="" style="border-top: 2rpx solid #EEEEEE; ">
				<view class="div_style">
					<view class="available">
						开户行
					</view>
					<input type="text" v-model="bankInfo.back_card_type" name="back_card_type" placeholder="请输入开户" />
				</view>
			</view>

			<view class="" style="border-top: 2rpx solid #EEEEEE; ">
				<view class="div_style">
					<view class="available">
						支行
					</view>
					<input type="text" v-model="bankInfo.sub_branch" placeholder="请输入开户支行" />
				</view>
			</view>

			<view class="" style="border-top: 2rpx solid #EEEEEE; ">
				<view class="div_style">
					<view class="available">
						卡号
					</view>
					<input type="text" v-model="bankInfo.card_number" name="card_number" placeholder="请输入持卡人卡号" />
				</view>
			</view>
			<view class="" style="border-top: 2rpx solid #EEEEEE; ">
				<view class="div_style">
					<view class="available">
						绑定手机
					</view>
					<input type="number" name="phone" v-model="bankInfo.phone" placeholder="请输入开户 预留手机号" />
				</view>
			</view>

			<view class="" style="border-top: 2rpx solid #EEEEEE; ">
				<view class="div_style">
					<view class="available">
						验证码
					</view>
					<input type="text" v-model="bankInfo.code" placeholder="请输入手机验证码" style="margin-left: 40rpx;" />
					<button type="default" v-show="show" @click="getCode">获取验证码</button>
					<button type="default" v-show="!show" @click="getCode">{{count}}s</button>
				</view>
			</view>

		</view>

		<view class="btn-top" @click="sumbit">
			<tui-button height="90rpx" :size="34" type="green" shape="circle">绑定</tui-button>
		</view>
	</view>
</template>

<script>
	import form from "@/components/common/tui-validation/tui-validation.js"
	export default {
		data() {
			return {
				show: true,
				count: '',
				timer: null,
				bankInfo: {
					card_holder: "",
					type: 2,
					back_card_type: "",
					sub_branch: "",
					card_number: "",
					phone: "",
					code: ""
				}
			}
		},
		methods: {
			sumbit() {
				let rules = [{
					name: "card_holder",
					rule: ["required"],
					msg: ["请输入持卡人"]
				}, {
					name: "back_card_type",
					rule: ["required"],
					msg: ["请输入开户行"]
				}, {
					name: "sub_branch",
					rule: ["required"],
					msg: ["请输入支行"]
				}, {
					name: "card_number",
					rule: ["required"],
					msg: ["请输入卡号"]
				}, {
					name: "phone",
					rule: ["required", "isMobile"],
					msg: ["请输入手机号", "请输入正确的手机号"]
				}];

				let checkRes = form.validation(this.bankInfo, rules);
				if (!checkRes) {

					this.tui.request("/User/addCard", "POST", this.bankInfo).then((res) => {
						console.log(res)
						if (res.code == 1) {
							this.tui.toast('提交成功');
							uni.navigateBack({
								delta:1
							})
						} else if (res.code == -1) {
							this.tui.setIsLogin(false)
						uni.redirectTo({
							url: "/pages/tabbar/index/index"
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
				this.tui.request("/sms/send", "POST", {
					mobile: this.bankInfo.phone,
					key: "TJYHK"
				}).then((res) => {
					if (res.code == 1) {
						this.tui.toast(res.msg);
						this.codeTime()
					} else if (res.code == -1) {
						this.tui.setIsLogin(false)
						uni.redirectTo({
							url: "/pages/tabbar/index/index"
						})
					} else {
						if (res.show == 1) {
							this.tui.toast(res.msg);
						}
					}
				}).catch((res) => {})

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
		margin-top: 100rpx;
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
</style>
