<template>
	<view class="">
		<view class="" style="height: 80rpx;">

		</view>
		<view class="manberCode">
			<view class="manberCode-top display-f p-r">
				<view class="user-pic">
					<image :src="userInfo.avatar" mode=""></image>
				</view>
				<view class="">
					<view class="">
						{{userInfo.nickname}}
					</view>
					<view class="m-top20">
						{{userInfo.mobile.substr(0, 3)}}****{{userInfo.mobile.substr(7)}}
					</view>
				</view>
				<view class="p-a rule">
					使用规则
				</view>
			</view>
			<view class="manberCode-botton">
				<view class="qrcode_img">
					<image :src="qrcodeURL" mode="aspectFit"></image>
				</view>
			</view>
			<!-- <view class="btn-top" @click="sumbit">
			<tui-button height="90rpx" :size="34" type="green" shape="circle">注册会员</tui-button>
		</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: "",
				qrcodeURL: "",
				userInfo: {
					mobile: "18888888888"
				}
			}
		},
		onLoad() {
			this.getUserInfo()
		},
		onShow() {},
		methods: {
			sumbit() {
				uni.redirectTo({
					url: "/pages/my/register/register"
				})
			},
			getUserInfo() {
				this.tui.request("/user/center", "GET", {

				}).then((res) => {
					console.log("11111111", res)
					if (res.code == 1) {
						this.userInfo = res.data
						// #ifdef MP-WEIXIN
						this.qrcodeURL = res.data.distribution_mnp_qr_code
						// #endif
						// #ifdef APP-PLUS
						this.qrcodeURL = res.data.distribution_h5_qr_code
						// #endif
						// #ifdef H5
						this.qrcodeURL = res.data.distribution_h5_qr_code
						// #endif
					} else if (res.code == -1) {
						this.tui.setIsLogin(false)
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
			}
		}
	}
</script>
<style>
	page {
		background-color: #FAFAFA;
	}
</style>
<style lang="scss" scoped>
	.qrcode_img {
		width: 500rpx;
		height: 600rpx;
		display: flex;
		justify-content: center;
		margin: 0 auto;
				image {
			width: 500rpx;
			height: 500rpx;
		}
	}

	.manberCode {
		width: 90%;
		margin: auto;
		background-color: #fff;

		.manberCode-botton {
			border: 0 0 20rpx 20rpx;
			margin: 100rpx 0;
		}

		.manberCode-top {
			border-radius: 20rpx 20rpx 0 0;
			background-color: #F73037;
			color: #FFFFFF;
			padding: 40rpx 20rpx;
			font-size: 34rpx;

			.rule {
				background-color: #539660;
				padding: 8rpx 14rpx;
				font-size: 24rpx;
				border-radius: 100rpx;
				right: 20rpx;
				font-weight: 200;
			}

			.user-pic {
				width: 120rpx;
				height: 120rpx;
				overflow: hidden;
				border-radius: 100rpx;
				background-color: #fff;
				margin-right: 20rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
