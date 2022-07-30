<template>
	<view class="container">
		<view class="tui-wallet__box">
			<view class="tui-content__box">
				<view class="tui-my__assets">
					<text>总佣金</text>
					<!-- <image @tap="toggle" mode="widthFix" :src="'/static/images/mall/wallet/'+(isShow?'img_show_3x.png':'img_hide_3x.png')"></image> -->
				</view>
				<view class="tui-assets__center">
					{{walletInfo.sum_money}}
				</view>
				<!-- #ifdef MP -->

				<!-- #endif -->
			</view>
			<tui-collapse :animation="false" :index="1" :current="walletIndex" :disabled="false" :arrow="false"
				@click="change">
				<template v-slot:title>
					<view class="tui-list-cell">
						<view class="tui-amount__box">
							<view class="tui-amount__title m-b20-t40">可用余额</view>
							<view class="tui-amount__title">{{walletInfo.user_money}}</view>
							<!-- <tui-button type="danger" width="142rpx" height="50rpx" shape="circle" :size="24" @click="recharge">立即充值</tui-button> -->
						</view>
						<view class="tui-amount__box">
							<view class="tui-amount__desc">由收益转换</view>
							<view class="tui-amount">--</view>
						</view>
					</view>
				</template>
				<template v-slot:content>
					<view class="tui-content">

						<view class="m-l-r-20">
							<tui-button type="primary-wallet" class="content-btn" width="150rpx" height="50rpx"
								shape="circle" :size="24" @click="recharge(3,1)">佣金</tui-button>
						</view>
						<view class="m-l-r-20">
							<tui-button type="primary-wallet" class="content-btn" width="150rpx" height="50rpx"
								shape="circle" :size="24" @click="recharge(2)">去购物</tui-button>
						</view>
						<view class="m-l-r-20">
							<tui-button type="primary-wallet" class="content-btn" width="150rpx" height="50rpx"
								shape="circle" :size="24" @click="recharge(1,1)">明细</tui-button>
						</view>
					</view>
				</template>
			</tui-collapse>
			<image src="/static/images/my/line.png" class="icon-line" mode=""></image>
			<tui-collapse :animation="false" :index="2" :current="walletIndex" :disabled="false" :arrow="false"
				@click="change">
				<template v-slot:title>
					<view class="tui-list-cell">
						<view class="tui-amount__box">
							<view class="tui-amount__title m-b20-t40">电子积分</view>
							<view class="tui-amount__title">{{walletInfo.earnings}}</view>
							<!-- <tui-button type="danger" width="142rpx" height="50rpx" shape="circle" :size="24" @click="recharge">立即充值</tui-button> -->
						</view>
						<view class="tui-amount__box">
							<view class="tui-amount__desc">在线储值</view>
							<view class="tui-amount">--</view>
						</view>
					</view>
				</template>
				<template v-slot:content>
					<view class="tui-content">
						<view class="m-l-r-20">
							<tui-button type="primary-wallet" class="content-btn" width="150rpx" height="50rpx"
								shape="circle" :size="24" @click="applyBalanceShow(2)">转入余额</tui-button>
						</view>
						<view class="m-l-r-20">
							<tui-button type="primary-wallet" class="content-btn" width="150rpx" height="50rpx"
								shape="circle" :size="24" @click="recharge(4)">充值</tui-button>
						</view>
						<view class="m-l-r-20">
							<tui-button type="primary-wallet" class="content-btn" width="150rpx" height="50rpx"
								shape="circle" :size="24" @click="recharge(3,2)">佣金</tui-button>
						</view>
						<view class="m-l-r-20">
							<tui-button type="primary-wallet" class="content-btn" width="150rpx" height="50rpx"
								shape="circle" :size="24" @click="recharge(1,4)">明细</tui-button>
						</view>
					</view>
				</template>
			</tui-collapse>
			<image src="/static/images/my/line.png" class="icon-line" mode=""></image>
			<tui-collapse :animation="false" :index="3" :current="walletIndex" :disabled="false" :arrow="false"
				@click="change">
				<template v-slot:title>
					<view class="tui-list-cell">
						<view class="tui-amount__box">
							<view class="tui-amount__title m-b20-t40">农批卷</view>
							<view class="tui-amount__title">{{walletInfo.user_integral}}</view>
							<!-- <tui-button type="danger" width="142rpx" height="50rpx" shape="circle" :size="24" @click="recharge">立即充值</tui-button> -->
						</view>
						<view class="tui-amount__box">
							<view class="tui-amount__desc">活动区活动赠送</view>
							<view class="tui-amount">--</view>
						</view>
					</view>
				</template>
				<template v-slot:content>
					<view class="tui-content">
						<!-- <view class="m-l-r-20">
							<tui-button type="primary-wallet" class="content-btn" width="150rpx" height="50rpx"
								shape="circle" :size="24" @click="recharge(2)">去购物</tui-button>
						</view> -->
						<view class="m-l-r-20">
							<tui-button type="primary-wallet" class="content-btn" width="150rpx" height="50rpx"
								shape="circle" :size="24" @click="recharge(1,2)">明细</tui-button>
						</view>
					</view>
				</template>
			</tui-collapse>
			<image src="/static/images/my/line.png" class="icon-line" mode=""></image>
			<tui-collapse :animation="false" :index="4" :current="walletIndex" :disabled="false" :arrow="false"
				@click="change">
				<template v-slot:title>
					<view class="tui-list-cell">
						<view class="tui-amount__box">
							<view class="tui-amount__title m-b20-t40">收益</view>
							<view class="tui-amount__title">{{walletInfo.user_growth}}</view>
							<!-- <tui-button type="danger" width="142rpx" height="50rpx" shape="circle" :size="24" @click="recharge">立即充值</tui-button> -->
						</view>
						<view class="tui-amount__box">
							<view class="tui-amount__desc">销售分润</view>
							<view class="tui-amount">其中{{walletInfo.expire_user_growth}}可转入余额</view>
						</view>
					</view>
				</template>
				<template v-slot:content>
					<view class="tui-content">

						<view class="m-l-r-20">
							<tui-button type="primary-wallet" class="content-btn" width="150rpx" height="50rpx"
								shape="circle" :size="24"  @click="applyBalanceShow(3)">转入余额</tui-button>
						</view>
						<view class="m-l-r-20">
							<tui-button type="primary-wallet" class="content-btn" width="150rpx" height="50rpx"
								shape="circle" :size="24" @click="recharge(3,3)">佣金</tui-button>
						</view>
						<view class="m-l-r-20">
							<tui-button type="primary-wallet" class="content-btn" width="150rpx" height="50rpx"
								shape="circle" :size="24" @click="recharge(1,3)">明细</tui-button>
						</view>
					</view>
				</template>
			</tui-collapse>
			<image src="/static/images/my/line.png" class="icon-line" mode=""></image>
			<tui-collapse :animation="false" :index="5" :current="walletIndex" :disabled="false" :arrow="false"
				@click="change">
				<template v-slot:title>
					<view class="tui-list-cell">
						<view class="tui-amount__box">
							<view class="tui-amount__title m-b20-t40">农豆</view>
							<view class="tui-amount__title">0.00</view>
							<!-- <tui-button type="danger" width="142rpx" height="50rpx" shape="circle" :size="24" @click="recharge">立即充值</tui-button> -->
						</view>
						<view class="tui-amount__box">
							<view class="tui-amount__desc">消费赠送</view>
							<view class="tui-amount">--</view>
						</view>
					</view>
				</template>
				<template v-slot:content>
					<view class="tui-content">
						<view class="m-l-r-20">
							<tui-button type="primary-wallet" class="content-btn" width="150rpx" height="50rpx"
								shape="circle" :size="24" @click="recharge(1,5)">明细</tui-button>
						</view>
					</view>
				</template>
			</tui-collapse>

			<image src="/static/images/my/line.png" class="icon-line" mode=""></image>
			<tui-modal :show="applyBalanceModal" @cancel="applyBalanceHide" style="z-index:3" :custom="true" fadeIn>
				<view class="tui-modal-custom">
					<view class="model-title">
						<view class="tui-prompt-title">申请转入余额</view>

						<image src="/static/images/my/close.png" class="model-close" @click="applyBalanceHide" mode="">
						</image>
					</view>
					<view class="modal-desc">
						可转入金额：{{amount}}元
					</view>
					<view class="input-border">
						<input placeholder="请输入金额" class="tui-modal-input" name="money"
							:class="{'tui-hidden-input':!applyBalanceModal}" v-model="applyForm.money" />
					</view>
					<view class="input-border">
						<input placeholder="请输入交易密码" type="password" class="tui-modal-input" name="pay_password"
							:class="{'tui-hidden-input':!applyBalanceModal}" v-model="applyForm.pay_password" />
					</view>
					<view class="model-btn">
						<tui-button height="82rpx" type="modal-cancel" width="220rpx" :size="32" shape="circle"
							@click="applyBalanceHide">取消</tui-button>
						<tui-button height="82rpx" type="modal-primary" width="220rpx" :size="32" shape="circle"
							@click="applyBalanceHandleClick">确认</tui-button>
					</view>
				</view>
			</tui-modal>

			<tui-modal :show="applyBalanceSuccessModal" @cancel="applyBalanceSuccessHide" style="z-index:3"
				:custom="true" fadeIn>
				<view class="tui-modal-custom">
					<view class="model-title">
						<view class="tui-prompt-title">提交成功</view>

						<image src="/static/images/my/close.png" class="model-close" @click="applyBalanceSuccessHide"
							mode=""></image>
					</view>
					<image src="/static/images/my/submit-success.png" class="modal-submit-success" mode=""></image>
					<view class="modal-text-center">
						转入{{applyForm.money}}元到余额成功！
					</view>
					<view >
						<tui-button height="82rpx" type="modal-primary"  shape="circle"
							@click="applyBalanceSuccessHandleClick">确认</tui-button>
					</view>
				</view>
			</tui-modal>
		</view>
	</view>
</template>

<script>
	import form from "@/components/common/tui-validation/tui-validation.js"
	export default {
		data() {
			return {
				applyBalanceModal: false,
				applyBalanceSuccessModal: false,
				email: '',
				payPassword: "",
				balance: "",
				walletInfo: {},
				amount:0.00,
				walletIndex: 1,
				type:1,
				applyForm:{
					type:1,
					money:"",
					pay_password:""
				}
			}
		},
		onShow() {
			this.getWallet()
		},
		methods: {
			getWallet() {
				this.tui.request("/user/wallet", "POST", {}).then((res) => {
					console.log(res, res.code == 1)
					if (res.code == 1) {
						this.walletInfo = res.data
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

						}
					}
				}).catch((res) => {})
			},
			apply(type){
				this.type=type
			
			},
			recharge(n, type) {
				let url = ""
				switch (n) {
					case 1:
						uni.navigateTo({
							url: "/pages/my/records/records?source="+type
						})
						break
					case 2:
						uni.switchTab({
							url: "/pages/tabbar/index/index"
						})
						break
					case 3:
						console.log("type", type)
						let amount = 0.00
						let typeName="earnings"
						if (type == 1) {
							amount = this.walletInfo.user_money
							typeName="user_money"
						} else if (type == 2) {
							amount = this.walletInfo.earnings
							typeName="earnings"
						} else if (type == 3) {
							amount = this.walletInfo.user_growth
							typeName="user_growth"
						}
						uni.navigateTo({
							url: "/pages/my/withDrawal/withDrawal?type=" + typeName + "&amount=" + amount
						})
						break
					case 4:
						// if (type == 1) {
						// 	amount = this.walletInfo.user_money
						// } else if (type == 2) {
						// 	amount = this.walletInfo.earnings
						// } else if (type == 3) {
						// 	amount = this.walletInfo.user_growth
						// }
						// uni.navigateTo({
						// 	url: "/pages/my/walletRecharge/walletRecharge?amount=" + this.walletInfo.earnings
						// })
						this.tui.toast("充值通道已关闭")
						break

				}

			},
			applyBalanceShow(type) {
				let amount = 0.00;
				this.type=type
				if(type==2){
					amount = this.walletInfo.earnings
				}else if(type==3){
					amount = this.walletInfo.expire_user_growth
				}
				this.amount=amount
				this.applyBalanceModal = true;
			},

			applyBalanceHide() {
				this.applyBalanceModal = false;
				this.applyForm={
					type:1,
					money:"",
					pay_password:""
				}
			},
			applyBalanceSuccessShow() {
				this.applyBalanceSuccessModal = true;
			},

			applyBalanceSuccessHide() {
				
				this.applyBalanceSuccessModal = false;
				this.applyForm={
					type:1,
					money:"",
					pay_password:""
				}
			},

			applyBalanceSuccessHandleClick() {
				this.applyBalanceSuccessHide();
			},
			applyBalanceHandleClick() {
				let rules = [{
					name: "money",
					rule: ["required"],
					msg: ["请输入金额"]
				}, {
					name: "pay_password",
					rule: ["required"],
					msg: ["请输入交易密码"]
				}];
				let typeName="earnings"
				if(this.type==2){
					typeName="earnings"
				}else if(this.type==3){
					typeName="user_growth"
				}
				this.applyForm.apply_type=typeName
				console.log("typeName",typeName,"typeId",this.type,this.applyForm.apply_type)
				let checkRes = form.validation(this.applyForm, rules);
				if (!checkRes) {
					
				this.tui.request("/withdraw/apply", "POST", this.applyForm).then((res) => {
					console.log(res, res.code == 1)
					if (res.code == 1) {
					this.applyBalanceHide();
					this.applyBalanceSuccessShow()
					this.getWallet()
					} else if (res.code == -1) {
						this.tui.toast(res.msg);
						this.tui.isLogin(false);
						uni.redirectTo({
							url: "/pages/tabbar/index/index"
						})
					}else {
						if (res.show == 1) {
							this.tui.toast(res.msg);
				
						}
					}
				}).catch((res) => {})
				} else {
					this.tui.toast(checkRes)
				}
			
			},
			change(e) {
				let index = e.index;
				this.walletIndex = index
			},

		}
	}
</script>

<style>
	.container {
		box-sizing: border-box;
	}

	.tui-title {
		padding: 40rpx 30rpx 20rpx;
		box-sizing: border-box;
		font-size: 32rpx;
	}

	.tui-content {
		display: flex;
		background-color: #fff;
		color: #555;
		font-size: 26rpx;
		justify-content: flex-end;
	}

	.tui-wallet__box {
		width: 100%;
		/* 		padding: 0 30rpx; */
		box-sizing: border-box;
	}

	.tui-content__box {
		width: 100%;
		height: 300rpx;
		/* border-radius: 24rpx; */
		/* padding: 0 30rpx; */
		box-sizing: border-box;
		background: #F73037;
		/* position: relative; */
		/* box-shadow: 0 3rpx 20rpx rgba(235, 9, 9, 0.2); */
	}

	.tui-my__assets {
		width: 100%;
		color: #eeeeee;
		font-size: 28rpx;
		font-weight: bold;
		padding: 60rpx 0 50rpx;
		box-sizing: border-box;
		text-align: center;

	}

	.tui-assets__center,
	.tui-assets__bottom {
		width: 100%;
		font-size: 78rpx;
		text-align: center;
		color: #FFFFFF;
		box-sizing: border-box;
	}

	.tui-item__box {
		width: 33.3333%;
		text-align: center;
		color: #fff;
		font-size: 26rpx;
		flex-shrink: 0;
	}

	.tui-amount__box {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}






	.tui-list-cell {
		width: 100%;
		height: 160rpx;
		padding: 0 30rpx 30rpx;
		box-sizing: border-box;
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		position: relative;
	}

	/* .content-btn {
		padding: 0rpx 20rpx;
	} */

	.m-l-r-20 {
		margin: 0rpx 20rpx 20rpx;
	}

	.btn-bg-color {
		background-color: #5B9AF3;
	}

	.tui-amount__title {
		font-size: 34rpx;
		font-weight: bolder;
	}

	.tui-amount__desc,
	.tui-amount {
		color: #999999;
		font-size: 24rpx;
		font-weight: 400;
	}

	.icon-line {
		width: 100%;
		height: 4rpx;
		display: block;
	}

	.tui-modal-custom {
		text-align: center;
	}

	.tui-tips-img {
		width: 80rpx;
		height: 80rpx;
		margin-top: 20rpx;
	}





	.model-btn {
		display: flex;
		justify-content: space-between;
	}

	.model-close {
		width: 36rpx;
		height: 36rpx;
		margin-top: -20rpx;
		/* position: absolute; */
		margin-right: -40rpx;
	}

	.model-title {
		display: flex;


	}

	.tui-prompt-title {
		padding-bottom: 40rpx;
		font-size: 34rpx;
		text-align: center;
		width: 100%;
	}

	.modal-desc {
		color: #FF5555;
		margin: 20rpx 0rpx;

	}

	.tui-modal-input {
		/* width: 80%; */
		margin: 10rpx 10rpx;
		/* padding-bottom: 20rpx; */
		font-size: 28rpx;
		text-align: left;
	}

	.tui-hidden-input {
		/* #ifdef MP-WEIXIN */
		width: 0;
		/* #endif */
	}

	.input-border {
		border: #D2D2D2 1rpx solid;
		border-radius: 20rpx;
		padding: 20rpx;
		background-color: #F5F5F5;
		margin-bottom: 40rpx;
	}

	.modal-submit-success {
		width: 373rpx;
		height: 243rpx;
		text-align: center;
		margin: 40rpx 0rpx 20rpx;
	}

	.modal-text-center {
		text-align: center;
		margin-bottom: 80rpx;
	}

	.m-b20-t40 {
		margin-bottom: 20rpx;
		margin-top: 40rpx;
	}
</style>
