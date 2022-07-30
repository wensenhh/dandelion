<template>
	<view>
	<view class="tui-center">
	
		<!-- #ifdef MP-WEIXIN -->
		<button open-type="contact" >
		   <tui-button width="200rpx" height="70rpx" :size="28" type="green" shape="circle" >在线客服
		   </tui-button>
		</button>
		<!-- #endif -->
		<!-- #ifndef MP-WEIXIN -->
		<view  >
		   <tui-button width="200rpx" height="70rpx" :size="28" type="green" shape="circle" @click="tipsShow()">在线客服
		   </tui-button>
		</view>
		<!-- #endif -->
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:"http://chat.baiweichu.vip/index/index/home?visiter_id=&visiter_name=&avatar=&business_id=2&groupid=0&special=2"
		}},
		
	onShow() {
		console.log("来了")
		// #ifdef APP-PLUS
		plus.runtime.openURL(this.url)
		// #endif
		// #ifdef H5
		window.open(this.url)
		// #endif
	},
		methods: {
			tipsShow(){
				// #ifdef APP-PLUS
				plus.runtime.openURL(this.url)
				// #endif
				// #ifdef H5
				window.open(this.url)
				// #endif
			}
		}
	}
</script>

<style>
	.tui-center{
		display: flex;
		    justify-content: center;
		    height: 90vh;
		    align-items: center;
	}

</style>
