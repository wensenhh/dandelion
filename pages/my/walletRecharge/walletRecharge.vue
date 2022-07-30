<template>
	<view class="container">

		<view class="withdrawalStyle">
			<view class="div_style">
				<view class="available">
					可用资金
				</view>
				<view class="money">
					￥{{availableFunds}}
				</view>

			</view>
			<view class="" style="border-top: 2rpx solid #EEEEEE; ">
				<view class="div_style">
					<view class="available">
						充值金额
					</view>
					<input type="number" v-model="rechargeForm.money" placeholder="请输入充值金额" />
				</view>
			</view>

			<view class="" style="border-top: 2rpx solid #EEEEEE; ">
				<view class="div_style">
					<view class="available">
						充值方式
					</view>
					<view class="choice">
						银行汇款
					</view>
				</view>
			</view>

			<view class="" style="border-top: 2rpx solid #EEEEEE; ">
				<view class="div_style">
					<view class="available">
						银行名称
					</view>
					<input v-model="rechargeForm.bank" placeholder="请输入银行名称" />
				</view>
			</view>

			<view class="" style="border-top: 2rpx solid #EEEEEE; ">
				<view class="div_style">
					<view class="available">
						卡号
					</view>
					<input type="text" v-model="rechargeForm.account" placeholder="请输入卡号" />
				</view>
			</view>
			<view class="" style="border-top: 2rpx solid #EEEEEE; ">
				<view class="div_style">
					<view class="available">
						开户名
					</view>
					<input type="text" v-model="rechargeForm.real_name" placeholder="请输入开户名" />
				</view>
			</view>
			<view class="" style="border-top: 2rpx solid #EEEEEE; ">
				<view class="div_style">
					<view class="available">
						支付密码
					</view>
					<input type="password" v-model="rechargeForm.pay_password" placeholder="请输入支付密码" />
				</view>
			</view>
			<view class="" style="border-top: 2rpx solid #EEEEEE; ">
				<view class="div_style">
					<view class="available">
						验证码
					</view>
					<input type="text" v-model="rechargeForm.code" placeholder="请输入手机验证码" style="margin-left: 40rpx;" />
					<button type="default" v-show="show" @click="getCode">获取验证码</button>
					<button type="default" v-show="!show" @click="getCode">{{count}}s</button>
				</view>
			</view>
			<!-- 上传证明 -->
			<view class="" style="border-top: 2rpx solid #EEEEEE; ">
				<view class="div_style">
					<view class="available">
						上传证明
						<!-- {{0>0?true:false}} -->
					</view>
					<view class="sczm">
						<tui-upload :value="value" :limit="1" :serverUrl="serverUrl"
							@complete="result" @remove="remove"></tui-upload>
					</view>
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
				imageData: [],
				//上传接口地址
				// serverUrl: "https://api.thorui.cn/",
				serverUrl: "https://xcx.wsy668.com/api/file/formimage",
				value: [], //初始化图片,
				rechargeForm: {

					code: "",
					pay_password: "",
					account: "",
					real_name: "",
					bank: "",
					money: "",
					transfer_voucher: ""
				},
				availableFunds:0.00,
				show: true,
				count: '',
				timer: null,
				mobile:""
			}
		},
		onLoad(options) {
			console.log(options)
					this.availableFunds=options.amount;
			this.getUserInfo()
		},
		methods: {
			getUserInfo() {
				this.tui.request("/user/info", "POST", this.loginInfo).then((res) => {
					if (res.code == 1) {
						this.mobile = res.data.mobile
					} else {
						if (res.show == 1) {
							this.tui.toast(res.msg);
							// this.loginInfo.account="";
							// this.loginInfo.password="";
						}
					}
				}).catch((res) => {})

			},
			result: function(e) {
			
				this.imageData = e.imgArr;
				this.rechargeForm.transfer_voucher=e.imgArr[0]
				
			},
			remove: function(e) {
				//移除图片
				console.log(e)
				console.log("value",this.value)
				let index = e.index
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
				console.log("-----",this.rechargeForm,this.tui.getToken())
				let checkRes = form.validation(this.rechargeForm, rules);
				if (!checkRes) {
					this.tui.request("/withdraw/recharge", "POST", this.rechargeForm).then((res) => {
					console.log("res",res)
						if (res.code == 1) {
							// this.tui.toast(res.msg);
							this.tui.toast("提交成功");
							uni.navigateBack({
								delta:1
							})
							
						} else if (res.code == -1) {
						this.tui.toast(res.msg);
						this.tui.isLogin(false);
						this.tui.setToken("")
					uni.redirectTo({
						url: "/pages/tabbar/index/index"
					})
					}else {
							if (res.show == 1) {
								this.tui.toast(res.msg);
								// this.loginInfo.account="";
								// this.loginInfo.password="";
							}
						}
					}).catch((res) => {})
				} else {
					this.tui.toast(checkRes)
				}
			},
		getCode() {
			this.tui.request("/sms/send", "POST", {
				mobile: this.mobile,
				key: "CZ"
			}).then((res) => {
				if (res.code == 1) {
					this.tui.toast(res.msg);
						this.codeTime()
				} else if(res.code==-1){
					this.tui.setIsLogin(false)
					uni.redirectTo({
						url:"/pages/tabbar/index/index"
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
</style>
