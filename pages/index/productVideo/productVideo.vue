<template>
	<view class="container">
		<video class="tui-video"
			:src="videoUrl"
			enable-danmu controls autoplay>
		</video>
<!-- 		<view class="video-info display-f ">
			<view class="user-pic m-top20">
				<image src="/static/images/address.png" mode=""></image>
			</view>
			<view class="user-name ">
				大白兔
			</view>
			<view class="user-data m-top20 ml-auto display-f">
				<view class="">
					<view class="">
						<tui-icon name="like-fill" color="#CDCDCD" :size="26"></tui-icon>
					</view>
					<view class="user-name great ">
						2.5万
					</view>
				</view>
				<view class="">
					<view  style="width: 20rpx;"></view>
				</view>
				
			</view>
			
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				videoUrl:""
			}
		},
		onLoad(option) {
			let url='https://1251542705.vod2.myqcloud.com/4a8d9c67vodtransgzp1251542705/f7b5199b5285890805797463637/v.f100820.mp4'
			this.videoUrl=option.videoUrl || url
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.user-data{
		
	}
	.user-name{
		color: #CDCDCD;
		font-size: 26rpx;
		margin-top: 40rpx;
	}
	.great{
		margin-top: 10rpx;
		font-size: 24rpx;
	}
	
	.user-pic{
		width: 100rpx;
		height: 100rpx;
		border-radius: 100rpx;
		overflow: hidden;
		margin-left: 20rpx;
		margin-right: 20rpx;
		image{
			width: 100%;
			height: 100%;
		}
	}
	page,
	.container {
		height: 100%;
		background-color: #000000;
	}

	.container {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-video {
		width: 100%;
		height: 88vh;
	}
	.video-info{
		width: 100%;
		height: 12vh;
		// background-color: red;
	}
</style>
