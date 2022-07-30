<template>
	
	<view class="content">
		<video class="tui-video"
		objectFit="fill"
			src="https://xcx.wsy668.com/uploads/video/propaganda.mp4"
			:controls="false" autoplay loop @ended="onend">
			<cover-view class="jump-over" @tap="launchFlag()">
				{{jumpover}}
			</cover-view>
		</video>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: ['color1', 'color2', 'color3'],
				autoplay: false,
				duration: 500,
				jumpover: '跳过',
				experience: '立即体验'
			}
		},
		methods: {
			launchFlag: function(){
				/**
				 * 向本地存储中设置launchFlag的值，即启动标识；
				 */
				uni.setStorage({
						key: 'launchFlag',
						data: true,
				});
				uni.switchTab({
					url: '/pages/tabbar/index/index'
				});
				
			},
			onend: function() {
				this.launchFlag();
			}
		}
	}
</script>
<style>
	page,
	.content{
		/* position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-size: 100% auto ;
		padding: 0; */
	}
	.swiper{
		width: 100%;
		height: 80%;
		background: #FFFFFF;
	}
	.swiper-item {
		width: 100%;
		height: 100%;
		text-align: center;
		position: relative;
		display: flex;
		/* justify-content: center; */
		align-items:flex-end;
		flex-direction:column-reverse
	}
	.swiper-item-img{
		width: 100%;
		height: auto;
		margin: 0 auto;
	}
	.swiper-item-img image{
		width: 80%;
	}
	.uniapp-img{
		height: 20%;
		background: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items:center;
		overflow: hidden;
	}
	.uniapp-img image{
		width: 40%;
	}
	
	.jump-over,.experience{
		position: absolute;
		height: 60upx;
		width:150upx;
		line-height: 60upx;
		padding: 0 40upx;
		border-radius: 30upx;
		font-size: 32upx;
		color: #fff;
		border: 1px solid #fff;
		z-index: 999;
	}
	.jump-over{
		right: 0;
		top: 125upx;
	}
	.experience{
		right: 50%;
		margin-right: -105upx;
		bottom: 0;
	}
	.tui-video {
		width: 100%;
		height: 100vh;
	}
</style>
