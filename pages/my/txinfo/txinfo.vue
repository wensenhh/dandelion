<template>
	<view>
		<view class="fsbox" v-for="item,index in sflist">
			<view class="topbox">
				<view class="fsleft">
					{{item.coin}}
				</view>
				<view class="sfnum">
					{{item.num}}
				</view>
			</view>
			<view class="topbox">
				<view class="time">
					{{item.created_at}}
				</view>
				<view class="state">
					<text v-if="item.status == 1">待通过</text>
					<text v-if="item.status == 2">已通过</text>
					<text v-if="item.status == 3">审核失败</text>
				</view>
			</view>
		</view>
		
		<view class="tui-order-list" v-if="sflist.length==0">
			<view class="none-data-info">
				<image src="/static/images/my/none-data.png" mode=""></image>
				<view class="none-text">
					暂无记录
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sflist: [],
				type: 1
			}
		},
		onLoad() {
			this.getsflist()
			
		},
		methods: {
			
			getsflist(){
				this.$request.post('/withdraw/list',{
					page: 1,
					size: 999
				}).then(res => {
					if(res.code == 1){
						this.sflist = res.data.list
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F4F5F9;
	}
	.tui-order-list {
		margin-top: 80rpx;
	}
	.none-data-info {
		text-align: center;
		margin-top: 180rpx;
	}
	
	.none-data-info image {
		width: 346rpx;
		height: 295rpx;
	}
	
	.none-text {
		color: #999999;
		font-size: 28rpx;
		margin-top: 40rpx;
	
	}
	.fsbox{
		margin: 24rpx;
		background-color: #ffffff;
		border-radius: 8rpx;
		padding: 24rpx;
		box-sizing: border-box;
		.topbox{
			display: flex;
			justify-content: space-between;
			font-size: 28rpx;
			font-weight: 500;
			align-items: center;
			height: 60rpx;
			box-sizing: border-box;
			.sfnum{
				color: #F73037;
			}
			.time{
				font-size: 24rpx;
				color: #999999;
			}
			.state{
				font-size: 24rpx;
				color: #000000;
			}
		}
	}
	
</style>
