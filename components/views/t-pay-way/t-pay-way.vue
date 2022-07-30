<template>
	<view>

		<tui-bottom-popup :price="price" :show="show" @close="close">
			<tui-list-cell unlined class="text-center p-r" :hover="false">
				<tui-icon class="p-a shut" name="shut" :size="20" @click='close'></tui-icon>
				确认支付
				<!-- <view class="tui-pay-item__title">
					<view>请选择支付方式</view>
					<view>支付金额：<text class="tui-pay-amuont">￥100.00</text></view>
				</view> -->
			</tui-list-cell>
			<view class="price-box">
				￥ {{price}} ≈ {{usdtprice}}usdt
			</view>
			<view unlined class="text-center " :hover="false" style="padding-top: 0;padding-bottom: 0;">
				<label class="tui-pay-item" >
					<text class="price">订单金额</text>

					<view class="tui-recharge">{{usdtprice}} USDT</view>
				</label>
			</view>
			<view unlined class="text-center " arrow :hover="false" @click="visible=true" style="padding-top: 0;padding-bottom: 0;z-index: 99;">
				<label class="tui-pay-item">
					<text class="price">支付方式</text>

					<view class="ml-auto display-f align-items">{{payText}}<tui-icon class="tui-recharge" name="arrowright" :size="20"></tui-icon></view>
					
				</label>
			</view>
			<view unlined class="text-center " v-if="isPayPass"  :hover="false" style="padding-top: 0;padding-bottom: 0;">
				<label class="tui-pay-item">
					<text class="price">密码</text>
				</label>
			</view>
			<view class=" code-box " >
				<view class="code-smallbox " v-if="isPayPass">
					<verification-code-style borderStyle="border:1px solid gray"
						borderCheckStyle="border:1px solid #ff0000;" :latticeNum="6" v-model="payPassword"
						@getInputVerification="getInputVerification"></verification-code-style>
				</view>
				
				
			</view>
			
			<view class="tui-btn-pay">
				<tui-button height="88rpx" type="primary" shadow @click="btnPay">立即付款</tui-button>
			</view>
		</tui-bottom-popup>
		
		<view class="my-mode p-r" v-if="visible" >
			
			<view class="mode-payWay  p-a payWay text-center mode-payWay2">
				<view class=" pay-list" v-for="item in payWay" :key="item.id" @click="change(item)">
					{{item.pay}}
				</view>
			</view>
			<view class="mode-payWay p-a payWay text-center" @click="visible=false">
				<view class=" pay-list" >
					Cancel
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import verificationCodeStyle from '@/components/verification-code-style2/verification-code-style2'
	export default {
		components: {
			verificationCodeStyle
		},
		name: 'tPayWay',
		emits: ['close'],
		
		props: {
			//控制显示
			show: {
				type: Boolean,
				default: false
			},
			price:{
				type:Number,
				default:0
			},
			usdtprice:{
				type:Number,
				default:0
			},
			
		},
		data() {
			return {
				mode:"bottom",
				visible:false,
				payWay:[
					{id:1,pay:"USDT支付"},
				],
				payText:"USDT支付",
				payId:1,
				isPayPass:false,
				payPassword:""
			};
		},
		methods: {
			change(data){
				if(data.id!==3){
					this.isPayPass=false;
				}else{
					this.isPayPass=true;
				}
				this.payText=data.pay
				this.payId=data.id
				this.visible=false
			},
			close() {
				this.payPassword="";
				console.log("=======clonse -----")
				this.$emit("close", {})
			},
			btnPay() {
				if(this.payId==3){
					if(this.payPassword=="" || this.payPassword==undefined || this.payPassword==null){
						this.tui.toast("请输入支付密码")
						return false;
					}else if(this.payPassword.length<6){
						this.tui.toast("请输入六位支付密码")
						return false;
					}
				}
				this.$emit('paySumbitClick', {
					payId: this.payId,
					payName:this.payText,
					payPassword:this.payPassword
				});
				this.payPassword="";
				// this.tui.href("/pages/template/mall/success/success")
			},
			getInputVerification(inputValue) {
		
				this.payPassword=inputValue
			},
			closeDrawer(){
				this.visible=false
			}
			

		}
	}
</script>

<style scoped>
	.content {
	        width: 500rpx;
	        margin: 50rpx auto;
	    }
	.code-smallbox{
		margin-bottom: 160rpx;
	}
	.mode-payWay{
		background-color: rgb(248 248 248 );
		width: 90%;
		left: 5%;
		bottom: 20rpx;
		overflow: hidden;
		border-radius: 30rpx;
	}
	.mode-payWay2{
		bottom: 150rpx;
	}
	.mode-bg{
		background-color: rgb(248 248 248 / 80%);
	}
	.pay-list{
		padding: 30rpx 0;
		border-bottom: 2rpx solid #666666;
	}
	.my-mode{
		background-color: rgba(0, 0, 0, 0.6);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9998;
		width: 100%;
		height: 100%;
		
	}
	.payWay{
		color: #6288d5;
	}
	.price {
		color: #959595;
	}
	
	.price-box{
		font-size: 60rpx;
		text-align: center;
	}
	.shut {
		top: 30rpx;
		left: 20rpx;
	}
	.tui-pay-item__title {
		width: 100%;
		height: 90rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 20rpx;
		box-sizing: border-box;
		font-size: 28rpx;
	}

	.tui-pay-amuont {
		color: #eb0909;
		font-weight: 500;
		font-size: 34rpx;
	}

	.tui-pay-item {
		width: 100%;
		height: 80rpx;
		display: flex;
		align-items: center;
		padding: 0 20rpx;
		box-sizing: border-box;
		font-size: 28rpx;
	}

	.tui-pay-logo {
		width: 48rpx;
		height: 48rpx;
		margin-right: 15rpx;
	}

	.tui-radio {
		margin-left: auto;
		transform: scale(0.8);
		transform-origin: 100% center;
	}

	.tui-btn-pay {
		width: 100%;
		padding: 0rpx 60rpx 50rpx;
		box-sizing: border-box;
	}

	.tui-recharge {
		margin-left: auto;
		padding-left: 12rpx ;
	}
</style>
