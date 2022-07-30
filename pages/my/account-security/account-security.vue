<template>
	<view class="tui-set-box">

		<view class="tui-mtop">
			<tui-list-cell padding="0" :lineLeft="false" :arrow="true" @click="href(1)">
				<view class="tui-list-cell">
					登录密码修改
				</view>
			</tui-list-cell>
			<tui-list-cell padding="0" :lineLeft="false" :arrow="true" @click="href(2)">
				<view class="tui-list-cell">
					支付密码修改
				</view>
			</tui-list-cell>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			href(page) {
				let url = "";
				switch (page) {
					case 1:
						url = "/pages/my/modify-Login-password/modify-Login-password"
						break;
					case 2:
						url = "/pages/my/changePassword/changePassword"
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
		display: flex;
		align-items: center;
		padding: 24rpx 30rpx;
		font-size: 30rpx;
	}

	.tui-info-box {
		font-size: 34rpx;
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
		padding: 100rpx 24rpx;
	}
</style>
