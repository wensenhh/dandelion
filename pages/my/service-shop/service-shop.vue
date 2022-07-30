<template>
	<view class="container">
		<view class="info-box">
			<view class="info-title">
				分享客信息
			</view>
			<view class="withdrawalStyle">
				<view class="div_style">
					<view class="available">
						姓名
					</view>
					<!-- <input type="number" v-model="bankInfo.cardholder" name="cardholder" placeholder="请输入持卡人姓名" /> -->
					<view class="" v-if="distribution.user.real_name=='' || distribution.user.real_name==undefined">
						{{distribution.user.nickname}}
					</view>
					<view class="" v-else>
						{{distribution.user.real_name}}
					</view>
				</view>
				<view class="" style="border-top: 2rpx solid #EEEEEE; ">
					<view class="div_style">
						<view class="available">
							账户
						</view>
						<view class="">
					{{distribution.user.mobile}}
						</view>
					</view>
				</view>

				<view class="withdrawalStyle" style="border-bottom: 2rpx solid #EEEEEE; ">
					<view class="div_style">
						<view class="available">
							手机号
						</view>
						<view class="">
						{{distribution.user.mobile}}
						</view>
					</view>
				</view>
			</view>
			<view class="info-box">
				<view class="info-title">
					服务商信息
				</view>
				<view class="" style="border-top: 2rpx solid #EEEEEE; ">
					<view class="div_style">
						<view class="available">
							姓名
						</view>
						<view class="" v-if="distribution.leader.real_name==''  || distribution.leader.real_name==undefined">
							{{distribution.leader.nickname}}
						</view>
	<view class="" v-else >
							{{distribution.leader.real_name}}
						</view>
					</view>
				</view>

				<view class="" style="border-top: 2rpx solid #EEEEEE; ">
					<view class="div_style">
						<view class="available">
							账户
						</view>
						<view class="">
							{{distribution.leader.mobile}}
						</view>

					</view>
				</view>

				<view class="" style="border-top: 2rpx solid #EEEEEE; ">
					<view class="div_style">
						<view class="available">
							手机号
						</view>
						<view class="">
							{{distribution.leader.mobile}}
						</view>

					</view>
				</view>
			</view>
			<view class="info-box">
				<view class="info-title">
					上月渠道业绩收益
				</view>
				<view class="withdrawalStyle" style="border-bottom: 2rpx solid #EEEEEE; ">
					<view class="div_style">
						<view class="w-260" style="margin-right: 40rpx;">
							上月团队收入
						</view>
						<view class="">
							{{distribution.history_earnings}}
						</view>

					</view>
				</view>

			</view>
		</view>

		<view class="btn-top" @click="sumbit">
			<tui-button height="90rpx" :size="34" type="green" shape="circle">申请成为服务商</tui-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				distribution:{}
			}
		},
		onLoad() {
			this.getDistribution()
		},
		methods: {
			sumbit() {

				this.tui.toast("您的资质暂未达标")
			},
			getDistribution(){
				this.tui.request("/distribution/index", "POST", {
				
				}).then((res) => {
					if (res.code == 1) {
						// this.tui.toast(res.msg);
							this.distribution=res.data
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
		font-size: 12rpx;
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
