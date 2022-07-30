<template>
	<view class="container">
		<view class="feed-box">
			<view class="tui-cells">
				<textarea class="tui-textarea" placeholder="我希望加入XXXX功能，因为XX情况下，会出现XX异常" maxlength="500" placeholder-class="phcolor"
				 v-model="desc" />
				<view class="textarea-counter">{{descNum}}/100</view>
				<!-- <view class="uploadPictures">
					<view class="default"></view>
				
					<view class="img">
						<image
							src="https://img1.baidu.com/it/u=3532463853,3238262059&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
							mode="aspectFit"></image>
						<view class="imgeDetelet"></view>
					</view>
				</view> -->
					<tui-upload :value="value" :serverUrl="serverUrl" @complete="result" @remove="remove"></tui-upload>
			</view> 
		</view>
	   <!--  <view class="tui-ptop">
			 <tui-button type="danger" shadow height="88rpx" shape="circle" @click="submit">提交反馈</tui-button>
	    </view> -->
		<view class="btnSure" @click="submit">
			<tui-button 	 height="90rpx" :size="34" type="green" shape="circle" >提交</tui-button>
			
		</view>
	</view>

</template>

<script>
	import form from "@/components/common/tui-validation/tui-validation.js"
	export default {
		computed:{
			descNum:function(){
				return this.desc.length
			}
		},
		onLoad(options) {
			
		},
		data() {
			return {
				imageData: [],
				//上传接口地址
				// serverUrl: "https://api.thorui.cn/",
				serverUrl: "https://xcx.wsy668.com/api/file/formimage",
				value:[], //初始化图片,
				desc:""
			}
		},
		methods: {
			result: function(e) {
				console.log(e)
				this.imageData = e.imgArr;
			},
			remove: function(e) {
				//移除图片
				console.log(e)
				let index = e.index
			},
			submit(){
				let rules = [{
					name: "desc",
					rule: ["required", "minLength:8", "maxLength:100"],
					msg: ["请输入问题描述", "问题描述必须8个或以上字符", "问题描述不能超过100个字符"]
				}, ];
				let formData = {
					desc:this.desc,
				}
				console.log("value",this.value)
				let checkRes = form.validation(formData, rules);
				if (!checkRes) {
							this.tui.toast('提交成功');
					this.tui.request("/user/edit","POST",{
						imgage: this.imageData,
						content: this.desc
					}).then((res)=>{
						console.log(res)
						if (res.code == 1) {
							this.tui.toast('提交成功');
						} else {
						if (res.show == 1) {
							this.tui.toast(res.msg);
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
		background-color: #F5F5F5
	}

.container {
/*  background-color: #fff;
  margin-top: 22rpx;
  padding: 30rpx;
  box-sizing: border-box;
  padding-bottom: 162rpx */
	padding: 20rpx 30rpx;
}

.title {
  font-size: 30rpx;
  color: #666;
  padding-bottom: 32rpx;
}

.tui-cells {
  /* border: 1rpx solid #e6e6e6; */
  /* border-radius: 4rpx; */
  box-sizing: border-box;
  /* padding: 20rpx 20rpx 0 20rpx; */
}

.feed-box{
		border-radius: 20rpx;
		background-color: #FFFFFF;
		padding: 15rpx;
}

.tui-textarea {
  height: 310rpx;
  width: 100%;
  color: #666;
  font-size: 28rpx;
}

.pholder {
  color: #ccc;
}

.textarea-counter {
  font-size: 24rpx;
  color: #999;
  text-align: right;
  height: 40rpx;
  line-height: 40rpx;
  padding-top: 4rpx;
}

.top64 {
  margin-top: 64rpx;
}

.tui-input {
  font-size: 30rpx;
  height: 88rpx;
  border: 1rpx solid #e6e6e6;
  border-radius: 4rpx;
  padding: 0 25rpx;
  box-sizing: border-box;
}
.tui-ptop{
	padding-top: 80rpx;
}
.uploadPictures {
		display: flex;
		width: 100%;
		padding-right: 35rpx;
		margin-top: 40rpx;
	}

	.uploadPictures .img {
		position: relative;
	}

	.uploadPictures .img image {
		width: 210rpx;
		height: 210rpx;
		padding-left: 42rpx;
	}

	.imgeDetelet {
		width: 33rpx;
		height: 33rpx;
		background-image: url(../../../static/images/my/deleteImage.png);
		position: absolute;
		right: 0;
		top: -10rpx;
		background-size: 100% 100%;
	}

	.uploadPictures .default {
		width: 210rpx;
		height: 210rpx;
		background: url(../../../static/images/my/addimages.png);
		background-size: 100% auto;
		background-repeat: no-repeat;
	}
	
	.btnSure {
		position: fixed;
		bottom: 64rpx;
		width: 90%;
	}
</style>
