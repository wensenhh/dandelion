<template>
	<view>
		<view class="fslist" v-for="item,index in sflist">
			<view class="fsleft">
				<text v-if="item.amount_type == 1">USDT释放 </text>
				<text v-if="item.amount_type == 2">LVY释放 </text>
				<text>   &nbsp;</text>
				<text> {{item.created_at}}</text>
			</view>
			<view class="sfnum">
				{{item.total}}
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
				sflist: []
			}
		},
		onLoad() {
			this.getsflist()
		},
		methods: {
			getsflist(){
				this.$request.post('/user/incomeLog',{
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
	.fslist{
		display: flex;
		justify-content: space-between;
		font-size: 28rpx;
		font-weight: 500;
		align-items: center;
		height: 80rpx;
		border-bottom: 1px solid #F1F1F1;
		padding:  0 30rpx;
		box-sizing: border-box;
		.fsleft{
			text{
				color: #000000;
			}
		}
		.sfnum{
			color: #F73037;
		}
	}
</style>
