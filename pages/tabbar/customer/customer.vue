<template>
	<view>
	<view class="tui-center">
	<web-view :src="url"></web-view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:"https://chat.baiweichu.vip/index/index/home?visiter_id=&visiter_name=&avatar=&business_id=2&groupid=0&special=2"
		}},
		
	onShow() {
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
