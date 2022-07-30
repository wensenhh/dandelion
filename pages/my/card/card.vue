<template>
	<view class="tui-safe-area">
		<view class="tui-card">
			<view class="card-list" v-for="(item,index) in cardList" :key="index">
				<tui-list-cell padding="0">
					<view class="tui-card-flex" :data-cardId="item.id">
						<view class=" display-f align-items" style="padding: 10rpx 0;">
							<view class="lastName text-center">
							</view>
							<view class="">
								<view class="tui-card-main align-items">
									<view class="tui-card-name tui-ellipsis">{{item.back_card_type}}</view>
									<view class="tui-card-tel">{{item.sub_branch}}</view>
									<view class="tui-card-imgbox2" @tap.stop="delCard(index)">
										<image class="tui-card-img" src="/static/images/sanchu.png" />
									</view>
								</view>
								<view class="tui-card-detail">
								<text style="text-align: center;">**** **** **** </text>
								<text  style="font-size: 34rpx;margin-left: 14rpx;">{{item.card_number.substr(-4)}}</text>
								</view>


							</view>
							
						</view>

					</view>
				</tui-list-cell>
			</view>
		</view>
		<!-- 新增地址 -->
		<view class="tui-card-new">
			<tui-button shadow shape="circle" type="green" height="88rpx" @click="editAddr()">+ 新增银行卡</tui-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cardList: [
				]
			}
		},
		onLoad: function(options) {
		
			
		},
		onShow: function() {
			let wsf_islogin = this.tui.isLogin();
			if (wsf_islogin) {
			this.getCardList()
			} else {
				this.tui.toast("请登录。")
			}
		},
		methods: {
			getCardList(){
				this.tui.request("/User/cardList", "POST", {
				}).then((res) => {
					if (res.code == 1) {
							this.cardList=res.data.list
							console.log("res.data.list",res.data.list)
					} else {
						if (res.show == 1) {
							this.tui.toast(res.msg);
							
						}
					}
				}).catch((res) => {})
			},
			
			delCard(index) {
				this.tui.request("/User/delCard", "POST", {id:this.cardList[index].id
				}).then((res) => {
					console.log(res, res.code == 1)
					if (res.code == 1) {
						this.getCardList()
						this.tui.toast("删除成功");
					} else {
						if (res.show == 1) {
							this.tui.toast(res.msg);
							
						}
					}
				}).catch((res) => {})
			},
			editAddr() {
				uni.navigateTo({
					url: "/pages/my/addBankCard/addBankCard"
				})
			}
		}
	}
</script>

<style>
	.lastName {
		border-radius: 100rpx;
		color: #FFFFFF;
		width: 40rpx;
		height: 80rpx;
		line-height: 80rpx;
		margin: 30rpx;
	}

	.card-list {
		margin: 10px;
		border-radius: 10px;
	}

	.tui-card {
		width: 100%;
		padding-top: 20rpx;
		padding-bottom: 160rpx;
	}

	.tui-card-flex {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.tui-card-main {
		width: 600rpx;
		height: 70rpx;
		display: flex;
		font-size: 30rpx;
		line-height: 86rpx;
	}

	.tui-card-name {
		width: 120rpx;
		font-weight: 800;
		font-size: 30rpx;
	}

	.tui-card-tel {
		margin-left: 12rpx;
		color: #999999;
		font-size: 24rpx
	}

	.tui-card-detail {
		font-size: 30rpx;
		word-break: break-all;
		color: #434343;
		padding-bottom: 25rpx;
		display: flex;
	}

	.tui-card-label {
		padding: 5rpx 8rpx;
		flex-shrink: 0;
		background: #e41f19;
		border-radius: 6rpx;
		color: #fff;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-size: 25rpx;
		line-height: 25rpx;
		transform: scale(0.8);
		transform-origin: center center;
		margin-right: 6rpx;
	}

	.tui-card-imgbox {
		width: 80rpx;
		height: 100rpx;
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		right: 10rpx;
	}

	.tui-card-imgbox2 {
		width: 80rpx;
		height: 100rpx;
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		right: 20rpx;
	}
	/* .tui-card-imgbox image{
		margin-left: 20rpx;
	} */

	.tui-card-img {
		width: 36rpx;
		height: 36rpx;
	}

	.tui-card-new {
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 999;
		padding: 20rpx 25rpx 30rpx;
		box-sizing: border-box;
		background: #fafafa;
	}

	.tui-safe-area {
		padding-bottom: env(safe-area-inset-bottom);
	}
</style>
