<template>
	<view class="container">

		<view style="margin-top: 70rpx;">
			<view class="div_style">
				<view class="available">
					可用资金
				</view>
				<view class="money">
					￥{{availableFunds}}
				</view>
				<view class="serviceCharge">
					手续费：5%
				</view>
			</view>
			<view>
				<view class="div_style">
					<view class="available">
						佣金金额
					</view>
					<input type="number" v-model="cashoutForm.money" placeholder="请输入佣金金额" />
				</view>
			</view>

			<view>
				<view class="div_style">
					<view class="available">
						佣金到
					</view>
					<view class="choice">
						<radio-group @change="radioChange">
							<label>
								<radio value="5" :checked="cashoutForm.type==5?true:false" /><text>银行卡</text>
							</label>
						</radio-group>
					</view>
				</view>
			</view>

			<view>
				<view class="div_style">
					<view class="available">
						银行名称
					</view>
					<input v-model="cashoutForm.bank" placeholder="请输入银行名称" />
				</view>
			</view>
	<view>
				<view class="div_style">
					<view class="available">
						开户支行
					</view>
					<input v-model="cashoutForm.subbank" placeholder="请输入开户支行" />
				</view>
			</view>
			<view>
				<view class="div_style">
					<view class="available">
						卡号
					</view>
					<input type="text" v-model="cashoutForm.account" placeholder="请输入卡号" />
				</view>
			</view>
			<view>
				<view class="div_style">
					<view class="available">
						户名
					</view>
					<input v-model="cashoutForm.real_name" placeholder="请输入开户姓名" />
				</view>
			</view>
			<view>
				<view class="div_style">
					<view class="available">
						支付密码
					</view>
					<input type="password" v-model="cashoutForm.pay_password" placeholder="请输入支付密码" />
				</view>
			</view>
			<view style="border-bottom: 2rpx solid #EEEEEE; ">
				<view class="div_style">
					<view class="available">
						验证码
					</view>
					<input type="text" v-model="cashoutForm.code" placeholder="请输入手机验证码" style="margin-left: 40rpx;" />
					<button type="default" v-show="show" @click="getCode">获取验证码</button>
					<button type="default" v-show="!show" @click="getCode">{{count}}s</button>
				</view>
			</view>
		</view>

		<view class="btn-top">
			<tui-button height="90rpx" :size="34" type="green" shape="circle" @click="submit">提交</tui-button>
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
				mobile: "",
				timer: null,
				type:1,
				availableFunds:0.00,
				cashoutForm: {
					code: "",
					type: 5,
					pay_password: "",
					account: "",
					real_name: "",
					bank:"",
					money: "",
					subbank:""
				},
			}
		},
		onLoad(option) {
			console.log("options",option)
			this.availableFunds=option.amount;
			this.type=option.type;
			this.getUserInfo()
		},
		methods: {
			getUserInfo() {
				this.tui.request("/user/info", "POST",{}).then((res) => {
					if (res.code == 1) {
						this.mobile = res.data.mobile
					}else if (res.code == -1) {
						this.tui.toast(res.msg);
						this.tui.isLogin(false);
						this.tui.setToken("")
					uni.redirectTo({
						url: "/pages/tabbar/index/index"
					})
					} else {
						if (res.show == 1) {
							this.tui.toast(res.msg);
							// this.loginInfo.account="";
							// this.loginInfo.password="";
						}
					}
				}).catch((res) => {})

			},
			submit() {
				let rules = [{
					name: "money",
					rule: ["required"],
					msg: ["请输入提现金额"]
				},  {
					name: "bank",
					rule: ["required"],
					msg: ["请输入银行名称"]
				}, {
					name: "account",
					rule: ["required"],
					msg: ["请输入卡号"]
				}, {
					name: "subbank",
					rule: ["required"],
					msg: ["请输入开户支行"]
				}, {
					name: "real_name",
					rule: ["required"],
					msg: ["请输入开户名"]
				},{
					name: "pay_password",
					rule: ["required"],
					msg: ["请输入支付密码"]
				},{
					name: "code",
					rule: ["required"],
					msg: ["请输入验证码"]
				}];

				let checkRes = form.validation(this.cashoutForm, rules);
				console.log("this.cashoutForm",this.cashoutForm.pay_password)
				if (!checkRes) {
					this.cashoutForm.apply_type=this.type
					this.tui.request("/withdraw/apply", "POST", this.cashoutForm).then((res) => {
						console.log("res",res)
						if (res.code == 1) {
							this.tui.toast("提交成功");
							uni.navigateBack({
								delta:1
							})
						}else if (res.code == -1) {
						this.tui.toast(res.msg);
						this.tui.isLogin(false);
						uni.redirectTo({
							url: "/pages/tabbar/index/index"
						})
					} else {
							if (res.show == 1) {
								this.tui.toast(res.msg);
								// this.loginInfo.account="";
								// this.loginInfo.password="";
							}
						}
					}).catch((res) => {
						console.log("res=========",res)
					})
				} else {
					this.tui.toast(checkRes)
				}
			},
			radioChange(e) {
				this.cashoutForm.cashoutChange = e.detail.value
			},
			getCode() {
				this.tui.request("/sms/send", "POST", {
					mobile: this.mobile,
					key: "TX"
				}).then((res) => {
					if (res.code == 1) {
						this.tui.toast(res.msg);
							this.codeTime()
					} else if(res.code==-1){
						this.tui.setIsLogin(false)
						this.tui.setToken("")
						uni.redirectTo({
							url: "/pages/tabbar/index/index"
						})
					}else {
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
		padding: 30rpx 50rpx;
	}


	.div_style {
		display: flex;
		padding: 28rpx 0rpx;
		position: relative;
		border-top: 2rpx solid #EEEEEE;
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
		/* #ifdef MP-WEIXIN */
		font-size: 26rpx;
		/* #endif */
		/* #ifdef H5 */
		font-size: 26rpx;
		/* #endif */
		/* #ifdef APP-PLUS */
				font-size: 24rpx;
		/* #endif */
		color: #FFFFFF;
	}

	.btn-top {
		margin-top: 160rpx;
	}

	.money {
		color: #FF5555;
	}
</style>
