<template>
		<view class="toolbox">
			<view class="title">
				提取{{type == 1 ? 'USDT' : 'LVY'}}
			</view>
			<view class="title" style="margin-top: 44rpx;">
				提取数量
			</view>
			<tui-input type="number" v-model="withdrawnum" :value="withdrawnum" :marginTop="24" borderTop trim :lineLeft="false" placeholder="请输入提取数量"></tui-input>
			<tui-input type="password" v-model="zjpwd" :value="zjpwd" :marginTop="24" borderTop password trim :lineLeft="false" placeholder="请输入资金安全密码"></tui-input>
			<view class="contlist" v-if="type==2">
				<view class="title">冻结LVY</view>
				<view class="num">{{djlvx}}</view>
			</view>
			<!-- <view class="contlist" v-if="type=2">
				<view class="title">可提LVY</view>
				<view class="num">{{userinfo.coin_money}}</view>
			</view> -->
			<view class="contlist">
				<view class="title">{{type == 1 ? 'USDT' : 'LVY'}}</view>
				<view class="num">{{balance}}</view>
			</view>
			<view class="contlist">
				<view class="title">手续费</view>
				<view class="num">{{withdrawconfig.withdraw_fee}}</view>
			</view>
			<view class="qdbtn" @tap="withdraw">
				确定
			</view>
			<view class="jlbox" @tap="gotoinfo">
				<!-- <view class="text">
					提现记录
				</view> -->
				<image src="../../../static/images/my/jilu.png" mode=""></image>
			</view>
		</view>
</template>

<script>
	export default {
		data() {
			return {
				withdrawnum: 0,
				zjpwd: '',
				type: 1,
				balance: 0,
				withdrawconfig: {},
				djlvx: 0
			}
		},
		onLoad(e) {
			if(e && e.type){
				this.type = e.type
				this.getnoweee()
				this.getconfig()
			}
			
		},
		methods: {
			async getnoweee(){
				this.$request.post('/user/userInfo').then(res => {
					if(res.code == 1){
						if(this.type == 1)this.balance = res.data.amount
						if(this.type == 2){
							this.balance = res.data.coin_money;
							this.djlvx = res.data.freeze_coin
						}
					}
				})
			},
			async getconfig(){
				this.$request.post('/basic/withdrawConfig').then(res => {
					if(res.code == 1){
						this.withdrawconfig = res.data
					}
				})
			},
			gotoinfo(){
				console.log(222)
				uni.navigateTo({
					url: '/pages/my/txinfo/txinfo?type=' + this.type
				})
			},
			withdraw(){
				this.withdrawnum = Number(this.withdrawnum)
				console.log(this.withdrawnum )
				if(this.withdrawnum <= 0){
					uni.showToast({
						title: '请输入正确的提取数量',
						icon:"error"
					})
					return false
				}
				if(this.withdrawnum < Number(this.withdrawconfig.min_withdraw)){
					uni.showToast({
						title: '最小提取数量为' + this.withdrawconfig.min_withdraw,
						icon:"error"
					})
					return false
				}
				if(this.zjpwd == ''){
					uni.showToast({
						title: '请输入资金密码',
						icon:"error"
					})
					return false
				}
				this.$request.post('/withdraw/index', {
					num: this.withdrawnum.toFixed(2),
					type: this.type,
					pwd: this.zjpwd
				}).then(res => {
					if(res.code == 1){
						uni.showToast({
							title: '提取成功'
						})
						this.withdrawnum = ''
						this.zjpwd = ''
						this.getnoweee()
						this.getconfig()
					}else{
						uni.showToast({
							title: res.msg,
							icon:"error"
						})
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F4F5F9;
		padding: 24rpx 30rpx;
	}
		.toolbox{
			background-color: #ffffff;
			padding: 24rpx;
			box-sizing: border-box;
			position: relative;
			.title{
				font-size: 32rpx;
				color: #000000;
				font-weight: 500;
			}
			.contlist{
				display: flex;
				justify-content: space-between;
				margin-top: 20rpx;
				.title{
					color: #666666;
					font-size: 24rpx;
				}
				.num{
					color: #000000;
					font-size: 24rpx;
				}
			}
			.qdbtn{
				width: 100%;
				height: 72rpx;
				border-radius: 40rpx;
				background-color: #F73037;
				display: flex;
				color: #ffffff;
				font-size: 26rpx;
				justify-content: center;
				align-items: center;
				margin-top: 50rpx;
			}
			.jlbox{
				position: absolute;
				right: 20rpx;
				top: 20rpx;
				text-align: center;
				display: flex;
				justify-content: center;
				align-items: center;
				image{
					width: 50rpx;
					height: 50rpx;
					margin:  0 auto;
				}
				text{
					text-align: center;
					box-shadow: 0 0 20rpx #f00;
					font-weight: 500;
				}
			}
		}
</style>
