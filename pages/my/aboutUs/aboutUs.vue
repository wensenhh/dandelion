<template>
	<view>
		<view class="log_veiw">
			<image src="/static/images/my/logo@2x.png" mode=""></image>
		</view>
		<view class="edition">
			<view class="edition_row">
				<text>当前版本</text>
				<text>2.0</text>
			</view>
			
			<view class="edition_row">
				<text>最新版本</text>
				<text>2.0</text>
			</view>
		</view>
		<view class="log_veiw">
			<image :src="url" mode=""></image>
		</view>
	</view>
</template>

<script>
	import {
		downLine,
	} from '@/api/app';
	import {
		isAndroid,
	} from '@/utils/tools';
	export default {
		data() {
			return {
				url:""
			}
		},
		async onLoad() {
			let client=4;
			// #ifdef H5
			if(isAndroid()==false){
				client=3
			}
			// #endif
			
			// #ifdef APP-PLUS || MP-WEIXIN
			uni.getSystemInfo({
				success: res => {
					client = res.platform == 'ios' ? 3 : 4;
				},
				fail: res => {
					client = 3
				}
			})
			// #endif
			let res = await downLine(client);
			console.log("res",res)
			if(res.code==1){
				this.url=res.data.qr_code
			}
		},
		methods: {

		}
	}
</script>

<style>
	.log_veiw {
		width: 100%;
		text-align: center;
		margin-top: 40rpx;
	}

	.log_veiw image {
		width: 307rpx;
		height: 317rpx;
	}
	.edition{padding: 12rpx 54rpx;}
	.edition_row{display: flex;justify-content: space-between;border-bottom: 1rpx solid #EEEEEE;}
	.edition_row text{color: #2C2D2C;font-size: 28rpx;font-weight: bold;padding: 32rpx 0;}
</style>
