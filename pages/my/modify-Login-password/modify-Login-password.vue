<template>
	<view class="tui-set-box">
	<!-- 	<view class="stylePassword">
			<text>旧密码</text>
			<view class="inputStyle">
				<input type="password" v-model="updatePasswordInfo.old_password" placeholder="输入旧密码" name="oldPwd">
			</view>
		</view> -->
		<view class="stylePassword">
			<text>新密码</text>
			<view class="inputStyle">
				<input type="password"  v-model="updatePasswordInfo.password" placeholder="设置新密码" name="nowPwd">
			</view>
		</view>
		<view class="stylePassword">
			<text>确认密码</text>
			<view class="inputStyle">
				<input type="password"  v-model="updatePasswordInfo.repassword" placeholder="再次输入新密码" name="confirmPwd" >
			</view>
		</view>
		<view class="stylePassword">
			<text>验证码</text>
			<view class="inputStyle-code">
				<input type="number" v-model="updatePasswordInfo.code" placeholder="输入验证码"
					name="code">
			</view>
			<button type="default" v-show="show" @click="getCode">获取验证码</button>
			<button type="default" v-show="!show" @click="getCode">{{count}}s</button>
		
		</view>
	<view class="btnSure" @click="submitForm">
		<tui-button 	 height="90rpx" :size="34" type="green" shape="circle" >提交</tui-button>
		
	</view>
	</view>
</template>

<script>
	import form from "@/components/common/tui-validation/tui-validation.js"
	import {
		getUser,
	} from '@/api/user';
	import {
		forgetPwd,
	} from '@/api/app';
	
	
	export default {
		data() {
			return {
				count: "",
				show: true,
				updatePasswordInfo:{
					password: "",
					repassword:"",
					code:"",
					mobile:""
				}
			}
		},
		async	onLoad() {
				let res = await getUser();
				if (res.code == 1) {
					this.updatePasswordInfo.mobile=res.data.mobile;
					}
			},
		methods: {
		 async	submitForm() {
				let rules = [ {
					name: "password",
					rule: ["required", "minLength:6","maxLength:16"],
					msg: ["请输入新密码", "输入密码最少6位","输入密码最多16位"]
				}, {
					name: "repassword",
					rule: ["required", "minLength:6","maxLength:16"],
					msg: ["请输入确认密码", "输入确认密码最少6位","输入确认密码最多16位"]
				},
				{
					name: "code",
					rule: ["required"],
					msg: ["请输入验证码"]
				}];
				
				let checkRes = form.validation(this.updatePasswordInfo, rules);
				if (!checkRes) {
					if(this.updatePasswordInfo.password!=this.updatePasswordInfo.repassword){
						 this.tui.toast('两次密码不一致哦')
						 return false
					}
					// this.tui.request("/login_password/forget","POST",this.updatePasswordInfo).then((res)=>{
						console.log(res)
					let res=  await forgetPwd(this.updatePasswordInfo)
						if (res.code == 1) {
							this.tui.toast('提交成功');
							this.logout()
						} else {
					if (res.show == 1) {
						this.tui.toast(res.msg);
					} 
						}
					// }).catch((res)=>{})
				} else {
					this.tui.toast(checkRes)
				}
			
			},
			getCode() {
				// let rules = [{
				// 	name: "mobile",
				// 	rule: ["required", "isMobile"],
				// 	msg: ["请输入手机号", "请输入正确的手机号"]
				// }];
			
				// let checkRes = form.validation(this.registerInfo, rules);
				// if (!checkRes) {
				// 	this.tui.toast('提交成功');
					this.tui.request("/sms/send", "POST", {
						mobile: this.updatePasswordInfo.mobile,
						key: "ZHMM"
					}).then((res) => {
						console.log(res, res.code == 1)
						if (res.code == 1) {
							this.codeTime()
							this.tui.toast(res.msg);
						} else {
							if (res.show == 1) {
								this.tui.toast(res.msg);
							}
						}
					}).catch((res) => {})
				// } else {
				// 	this.tui.toast(checkRes)
				// }
			
			},
			codeTime() {
				const TIME_COUNT = 60;
				if (!this.timer) {
					this.count = TIME_COUNT;
					this.show = false;
					this.timer = setInterval(() => {
						if (this.count > 0 && this.count <= TIME_COUNT) {
							this.count--;
						} else {
							this.show = true;
							clearInterval(this.timer);
							this.timer = null;
						}
					}, 1000)
				}
			},
			logout(){
				this.tui.request("/account/logout","POST",{"token":this.tui.getToken()}).then((res)=>{
					console.log(res,res.code==1)
				if(res.code==1){
					this.tui.logout()
						uni.reLaunch({
							url: "/pages/tabbar/my/my"
						})
				}else{
					if (res.show == 1) {
						this.tui.toast(res.msg);
						
					} 
				}
				}).catch((res)=>{
				})
				
			},
		}
	}
</script>

<style>
	page {
		background-color: #FFFFFF;
	}

	.tui-set-box {
		padding: 30rpx;
		color: #333;
	}

	.stylePassword {
		display: flex;
		padding: 25rpx 0rpx;
	}

	.stylePassword text {
		color: #2C2D2C;
		font-size: 32rpx;
		line-height: 100rpx;
		width: 150rpx;
	}
.stylePassword .inputStyle-code {
		width: 296rpx;
		border: #F6F6F6 solid 1rpx;
		margin-left: 24rpx;
		padding: 24rpx;
		background-color: #F6F6F6;
		border-radius: 20rpx;
	}
	.stylePassword button {
		width: 200rpx;
		height: 60rpx;
		line-height: 60rpx;
		background-color: #F73037;
		border-radius: 5rpx;
		font-size: 26rpx;
		color: #FFFFFF;
		margin-top: 20rpx;
	}
	.stylePassword .inputStyle {
		width: 496rpx;
		border: #F6F6F6 solid 1rpx;
		margin-left: 24rpx;
		padding: 24rpx;
		background-color: #F6F6F6;
		border-radius: 20rpx;
	}
	.btnSure {
		position: fixed;
		bottom: 64rpx;
		width: 90%;
	}

</style>
