<template>
	<view class="tui-set-box">
		<!-- <tui-list-cell padding="0" :lineLeft="false" :arrow="true" @click="href(1)">
			<view class="tui-list-cell tui-info-box">
				<image src="/static/images/my/mine_def_touxiang_3x.png" class="tui-avatar"></image>
				<view class="">
					个人资料
				</view>
				<view class="m-r-30">{{nickname}}</view>
			</view>
		</tui-list-cell> -->
		<tui-list-cell padding="0" :lineLeft="false" :unlined="true">
			<view class="tui-list-cell tui-info-box">
				<!-- <image src="/static/images/my/mine_def_touxiang_3x.png" class="tui-avatar"></image> -->
				<view class="">
					注册时间
				</view>
				<view class="m-r-30">{{createTime}}</view>
			</view>
		</tui-list-cell>
		<!-- <tui-list-cell padding="0" :lineLeft="false" :arrow="true" @click="href(2)">
			<view class="tui-list-cell">
				我的收货地址
			</view>
		</tui-list-cell> -->
		<view class="tui-mtop">
			<!-- <tui-list-cell padding="0" :lineLeft="false" :arrow="true" @click="href(8)">
				<view class="tui-list-cell tui-info-box">

					<view class="">
						账户与安全
					</view>
					<view class="m-r-30">密码/支付等管理</view>
				</view>
			</tui-list-cell>
			<tui-list-cell padding="0" :lineLeft="false" :arrow="true" @click="href(9)">
				<view class="tui-list-cell">
					我的银行卡

				</view>
			</tui-list-cell> -->
			<tui-list-cell padding="0" :lineLeft="false" :arrow="true" @click="href(6)">
				<view class="tui-list-cell">
					服务协议
				</view>
			</tui-list-cell>
			<tui-list-cell padding="0" :lineLeft="false" :arrow="true" @click="href(7)">
				<view class="tui-list-cell">
					隐私政策
				</view>
			</tui-list-cell>
		</view>
		<!-- <view class="tui-mtop">
			<tui-list-cell padding="0" :lineLeft="false" :arrow="true" @click="href(5)">
				<view class="tui-list-cell">
					意见反馈
				</view>
			</tui-list-cell>
			<tui-list-cell padding="0" :lineLeft="false" :arrow="true" @click="href(4)">
				<view class="tui-list-cell">
					关于我们
				</view>
			</tui-list-cell>

		</view> -->

		<view class="tui-exit" @click="logout">
			<tui-button shape="circle" shadow type="white" height="88rpx">退出登录</tui-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nickname: "hello",
				createTime: ""
			}
		},
		onShow() {
			let wsf_islogin = this.tui.isLogin();
			if (wsf_islogin) {
				this.nickname = this.tui.getNickname();
				this.createTime = uni.getStorageSync("wsf_createTime")
			}
		},
		methods: {
			logout() {
				this.tui.logout()
				uni.reLaunch({
					url: "/pages/tabbar/my/my"
				})
				// this.tui.request("/account/logout", "POST", {
				// 	"token": this.tui.getToken()
				// }).then((res) => {
				// 	console.log(res, res.code == 1)
				// 	if (res.code == 1) {
				// 		this.tui.logout()
				// 		uni.reLaunch({
				// 			url: "/pages/tabbar/my/my"
				// 		})
				// 	} else {
				// 		if (res.show == 1) {
				// 			this.tui.toast(res.msg);

				// 		}
				// 	}
				// }).catch((res) => {})

			},
			href(page) {
				let url = "";
				switch (page) {
					case 1:
						// url = "/pages/my/userInfo/userInfo"
						url = "/pages/my/personalInformation/personalInformation"
						break;
					case 2:
						url = "/pages/my/address/address"
						break;
					case 3:
						url = "/pages/my/notice/notice"
						break;
					case 4:
						url = "/pages/my/aboutUs/aboutUs"
						break;
					case 5:
						url = "/pages/my/feedback/feedback?page=mall"
						break;
					case 6:
						url = "/pages/my/service-agreement/service-agreement?type=3"
						break
					case 7:
						url = "/pages/my/service-agreement/service-agreement?type=2"
						break
					case 8:
						url = "/pages/my/account-security/account-security"
						break
					case 9:
						url = "/pages/my/card/card"
						break

					default:
						break;
				}
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style>
	.tui-set-box {
		padding-bottom: 20rpx;
		color: #333;
	}

	.tui-list-cell {
		align-items: center;
		padding: 24rpx 30rpx;
		font-size: 30rpx;
	}

	.tui-info-box {
		display: flex;
		justify-content: space-between;
	}

	.tui-avatar {
		width: 140rpx;
		height: 140rpx;
		margin-right: 20rpx;
	}

	.tui-mtop {
		margin-top: 20rpx;
	}

	.tui-exit {

		padding: 0rpx 80rpx;

		width: 80%;

		position: fixed;

		left: 0;

		bottom: 100rpx;

	}

	.m-r-30 {
		margin-right: 30rpx;
	}
</style>
