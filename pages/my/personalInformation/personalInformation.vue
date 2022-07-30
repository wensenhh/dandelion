<template>
	<view class="tui-set-box">
		<view class="stylePassword" v-if="realName!=''">
			<text>昵称</text>
			<view class="inputStyle">
			{{realName}}
			</view>
		</view>
		<view class="stylePassword">
			<text>真实姓名</text>
			<view class="inputStyle">
				<input type="text" v-model="userInfo.real_name" placeholder="输入真实姓名" name="name">
			</view>
		</view>
		<view class="stylePassword">
			<text>身份证号</text>
			<view class="inputStyle">
				<input type="text" v-model="userInfo.identity_number" placeholder="请输入身份证号码" name="cardId">
			</view>
		</view>
		<view class="stylePassword">
			<text>手机号</text>
			<view class="stylePhone">
				{{mobile}}
				<!-- <input type="number" v-model="userInfo.phone" placeholder="请输入手机号" name="phone"> -->
			</view>
		</view>
		<!-- 上传身份证 -->
		<view class="uploadIdcard">
			<view class="remarks">
				<text>*</text>
				<view class="">
					请上传身份证正反面
				</view>
			</view>
			<view class="idCar" >
				<view class="myId">
				<tui-upload-card :value="value1" :limit="1"  :backdrop="cardImage1" :serverUrl="serverUrl" @complete="result1" @remove="remove1"></tui-upload-card>
			</view>
			
			<view class="myId" >
				<tui-upload-card :value="value2" :limit="1"   :backdrop="cardImage2" :serverUrl="serverUrl" @complete="result2" @remove="remove2"></tui-upload-card>
			</view>
			</view>
			
		</view>
		<view class="stylePassword">
			<text>验证码</text>
			<view class="inputStyle-code">
				<input type="number" v-model="userInfo.code" placeholder="输入验证码"
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

	export default {
		data() {
			return {
					show: true,
				count: "",
				cardImage1:"/static/images/my/myid.png",
				cardImage2:"/static/images/my/myid2.png",
				value1:[], //初始化图片,
				value2:[], //初始化图片,
				imageData1: [],
				imageData2: [],
				realName:"",
				mobile:"",
					serverUrl: "https://xcx.wsy668.com/api/file/formimage",
				userInfo:{
					real_name:"",
					identity_number:"",
					national_emblem_surface:"",
					portrait_face:""
				}
			}
		},
		onLoad() {
			this.getUserInfo()
		},
		methods: {
			getUserInfo() {
				this.tui.request("/user/info", "POST", this.loginInfo).then((res) => {
					if (res.code == 1) {
						this.mobile = res.data.mobile
						this.realName = res.data.real_name
					} else {
						if (res.show == 1) {
							this.tui.toast(res.msg);
							// this.loginInfo.account="";
							// this.loginInfo.password="";
						}
					}
				}).catch((res) => {})
			
			},
			result1: function(e) {
				console.log(e)
				this.imageData1 = e.imgArr;
				this.userInfo.portrait_face=e.imgArr[0]
			},
			remove1: function(e) {
				//移除图片
				console.log(e)
				let index = e.index
			},
			result2: function(e) {
				console.log(e)
				this.imageData2 = e.imgArr;
				this.userInfo.national_emblem_surface=e.imgArr[0]
			},
			remove2: function(e) {
				//移除图片
				console.log(e)
				let index = e.index
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
					mobile: this.mobile,
					key: "ZHZFMM"
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
submitForm(e){
	let rules = [{
		name: "real_name",
		rule: ["required"],
		msg: ["请输入真实名字"]
	}, {
		name: "identity_number",
		rule: ["required", "isIdCard"],
		msg: ["请输入身份证", "请输入正确的身份证号"]
	},{
		name:"portrait_face",
		rule: ["required"],
		msg: ["请上传身份证人像面"]
	},{
		name:"national_emblem_surface",
		rule: ["required"],
		msg: ["请上传身份证国徽面"]
	},{
		name:"code",
		rule: ["required"],
		msg: ["请输入验证码"]
	}];
	let formData = {
		real_name:this.userInfo.real_name,
		identity_number:this.userInfo.identity_number,
		national_emblem_surface:this.userInfo.national_emblem_surface,
		portrait_face:this.userInfo.portrait_face,
		code:this.userInfo.code,
		mobile:this.mobile
	}
	let checkRes = form.validation(formData, rules);
	if (!checkRes) {
		this.tui.toast('提交成功');
		this.tui.request("/user/edit","POST",formData).then((res)=>{
			console.log(res)
			if (res.code == 1) {
				this.tui.toast('提交成功');
			uni.navigateBack({
				delta:1
			})
			} else {
			if (res.show == 1) {
				this.tui.toast(res.msg);
				// this.loginInfo.account="";
				// this.loginInfo.password="";
			}
			}
		}).catch((res)=>{})
	} else {
		this.tui.toast(checkRes)
	}
}
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
		padding: 20rpx 0rpx;
	}

	.stylePassword text {
		color: #2C2D2C;
		font-size: 32rpx;
		line-height: 100rpx;
		width: 150rpx;
	}

	.stylePassword .inputStyle {
		width: 496rpx;
		border: #F6F6F6 solid 1rpx;
		margin-left: 24rpx;
		padding: 24rpx;
		background-color: #F6F6F6;
		border-radius: 20rpx;
		color:#959595 ;
		font-size: 28rpx;
	}

	.stylePhone{
		width: 496rpx;
		margin-left: 24rpx;
		padding: 24rpx;
		color:#959595 ;
		/* font-size: 28rpx; */
	}

.btnSure {
		bottom: 64rpx;
		width: 100%;
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

	.uploadIdcard .remarks {font-size: 34rpx;color: #1B1B1B;display: flex;margin-top: 40rpx;}
	.uploadIdcard .remarks text{color: #FF0000;margin-top: 14rpx;}
	.uploadIdcard .myId{padding:16rpx 60rpx;}
	.uploadIdcard .myId image{width: 100%;height: 310rpx;}
	.idCar{padding: 44rpx 0rpx;}
</style>
