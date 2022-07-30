<template>
	<view class="container">
	<view class="container-content">
		<mp-html :content="html" />
	<!-- 	<view class="m-b-40">
					特别提示：
				</view>
				<view class="m-b-40">
					我们深知个人信息对用户（以下简称用户或您）的重要性，并会尽全力保护您的个人信息安全可靠。根据法律法规、国家标准等规定，制定以下《站酷隐私政策》（以下简称本政策或本隐私政策）。
				</view>
				<view class="m-b-40">
					 本政策要点如下： 
				</view>
				
				<view class="m-b-40">
					1.为便于您注册成为站酷用户并使用站酷的产品或服务，您需要提供相关个人信息，我们将逐项列举说明，您有权拒绝或撤回授权。
				</view>
				
				<view class="m-b-40">
					2.您可以查询、修改、删除您的个人信息，改变您同意授权的范围，注销您的账号，我们为您提供行使上述权利的途径。
				</view>
				
				<view class="m-b-40">
					3.我们将努力采取各种安全保护措施以保护您提供的个人信息，防止数据泄漏。 
				</view>
				
				<view class="m-b-40">
					4.请确认您为18周岁以上成年人。
				</view>
				
				<view class="m-b-40">
					为了满足法律法规的要求及特定业务功能所必需，某些业务功能（例如注册成为站酷用户）需要您提供某些个人敏感信息（例如手机号码），我们将在本隐私政策中逐项列明，并做特别标注。
					个人敏感信息的定义可参考本隐私政策第11部分。特别提示，您向我们提供个人敏感信息前请慎重考虑后再提供。
				</view>
				
				<view class="m-b-40">
					 您可以根据以下索引阅读相应章节，以了解本政策的详细内容：
				</view>
				
				<view class="m-b-40">
					1.我们如何收集您的个人信息
				</view>
				
				<view class="m-b-40">
					 2.我们如何使用Cookie和同类技术 
				</view>
				
				<view class="m-b-40">
					3.我们如何使用收集的信息
				</view>
				
				<view class="m-b-40">
					 4.我们如何共享、转让、公开披露您的个人信息 
				</view>
				
				<view class="m-b-40">
					5.信息的存储 6.我们如何保护您的个人信息
				</view>
				
				<view class="m-b-40">
					6.我们如何保护您的个人信息
				</view>
				
				<view class="m-b-40">
				7.您的权利
				</view>
				
				<view class="m-b-40">
		8.我们如何处理未成年人的个人信息
				</view>
				
				<view class="m-b-40">
		9.本政策如何更新
				</view> -->
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
	   html: '<div>Hello World!</div>'
			}
		},
		onLoad() {
			this.getPrivacy()
		},
		methods: {
			getPrivacy(){
				this.tui.request("/policy/privacy", "POST", {}).then((res) => {
					if (res.code == 1) {
						this.html=res.data
					} else {
						if (res.show == 1) {
							this.tui.toast(res.msg);
						
						}
					}
				}).catch((res) => {})
			}
		}
	}
</script>

<style>

.container{
	padding: 20rpx;
}
.container-content{
	background-color: #FFFFFF;
	padding:50rpx 30rpx;
	border-radius: 30rpx;
	font-size: 28rpx;
}
.m-b-40{
	margin-bottom: 40rpx;
}
</style>
