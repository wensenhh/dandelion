<template>
	<view class="">
		<view class="text-center success display-f">
			<image class="tui-bg-success" src="../../static/images/paycg.png" mode=""></image>支付成功
		</view>
		<view class="display-f justify-content">
			<view class="button-operate text-center" @click="open(1)">
				返回首页
			</view>
			<view class="button-operate text-center" @click="open(2)">
				查看订单
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				findWholesale:0,
				}},
		onLoad(option) {
			this.findWholesale=option.findWholesale
		},
		methods:{
			open(n){
				
				if(n==1){
					uni.switchTab({
						url:"/pages/tabbar/index/index"
					})
					return false
				}
				if(n==2){
					if(this.findWholesale==1){
						uni.redirectTo({
							url:"/pages/my/warehouse/warehouse"
						})
					}else{
						uni.redirectTo({
							url:"/pages/my/myOrder/myOrder"
						})
					}
					
					return false
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.button-operate{
		border-radius: 100rpx;
		width: 150rpx;
		border:  2rpx solid #BFBFBF;
		color: #707070;
		margin: 60rpx 30rpx;
		font-size: 24rpx;
		padding: 6rpx 0;
	}
	.success{
		font-size: 50rpx;
		justify-content: center;
		align-items: center;
		margin-top: 40rpx;
	}
	.tui-bg-success{
		width: 60rpx;
		height: 60rpx;
		margin-right: 20rpx;
	}
</style>
