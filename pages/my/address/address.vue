<template>
	<view class="tui-safe-area">
		<view class="tui-address">
			<view class="address-list" v-for="(item,index) in addressList" :key="index">
				<tui-list-cell padding="0">
					<view class="tui-address-flex" @tap.stop="returnOrder" :data-addressId="item.id">
						<view class=" display-f align-items" style="padding: 10rpx 0;">
							<view class="lastName text-center">
								{{ item.name.slice(0,1)}}
							</view>
							<view class="">
								<view class="tui-address-main align-items">
									<view class="tui-address-name tui-ellipsis">{{item.name}}</view>
									<view class="tui-address-tel">{{item.phone}}</view>
									<view class="tui-address-imgbox2" @tap.stop="delAddres(index)">
										<image class="tui-address-img" src="/static/images/sanchu.png" />
									</view>
									<view class="tui-address-imgbox" @tap.stop="editAddr('edit',item.id)" >
										<image class="tui-address-img" src="/static/images/bianji.png" />
									</view>
								</view>
								<view class="tui-address-detail">
									{{item.province}}
									{{item.city}}
									{{item.district}}
									{{item.address}}
								</view>


							</view>
							<view class="tui-address-detail">
								<!-- <view class="tui-address-label" v-if="index===0">默认</view>
								<view class="tui-address-label" v-if="index!=2">{{["公司","住宅","其它"][index]}}</view> -->
							</view>
						</view>

					</view>
				</tui-list-cell>
			</view>
		</view>
		<!-- 新增地址 -->
		<view class="tui-address-new">
			<tui-button shadow shape="circle" type="green" height="88rpx" @click="editAddr('add')">+ 新增收货地址</tui-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isOrder: false,
				addressList: []
			}
		},
		onLoad: function(options) {
			if (options.isOrder != undefined) {
				this.isOrder = options.isOrder
			}
			
		},
		onShow: function() {
			let wsf_islogin = this.tui.isLogin();
			if (wsf_islogin) {
			this.getAddressList()
			} else {
				this.tui.toast("请登录。")
			}
		},
		methods: {
			getAddressList(){
				this.$request.post("/address/list", {
				}).then((res) => {
					console.log(res, res.code == 1,this.tui.getToken())
					if (res.code == 1) {
							this.addressList=res.data
					} else {
						if (res.show == 1) {
							this.tui.toast(res.msg);
							
						}
					}
				}).catch((res) => {})
			},
			returnOrder(e) {

				if (this.isOrder) {
					let pages = getCurrentPages();  //获取所有页面栈实例列表
					let nowPage = pages[ pages.length - 1];  //当前页页面实例
					let prevPage = pages[ pages.length - 2 ];  //上一页页面实例
					prevPage.$vm.isAddress = true;   //修改上一页data里面的searchVal参数值为1211
					prevPage.$vm.addressId = e.currentTarget.dataset.addressid;   //修改上一页data里面的searchVal参数值为1211
					uni.navigateBack({
						delta: 1
					});
				}
			},
			delAddres(index) {
				this.$request.post("/address/destroy", {id:this.addressList[index].id
				}).then((res) => {
					console.log(res, res.code == 1)
					if (res.code == 1) {
						this.tui.toast(res.msg);
						this.getAddressList()
					} else {
						if (res.show == 1) {
							this.tui.toast(res.msg);
							
						}
					}
				}).catch((res) => {})
			},
			editAddr(addressType,addressId) {
				console.log("=addressType=",addressType,addressId)
				if(addressType=='edit'){
					uni.navigateTo({
						url: "/pages/my/editAddress/editAddress?addressType=edit&addressId=" +addressId 
					})
				}else{
				uni.navigateTo({
					url: "/pages/my/editAddress/editAddress?addressType=" + addressType
				})
				}
			}
		}
	}
</script>

<style>
	.lastName {
		background-color: #F73037;
		border-radius: 100rpx;
		color: #FFFFFF;
		width: 80rpx;
		height: 80rpx;
		line-height: 80rpx;
		margin: 30rpx;
	}

	.address-list {
		margin: 10px;
		border-radius: 10px;
	}

	.tui-address {
		width: 100%;
		padding-top: 20rpx;
		padding-bottom: 160rpx;
	}

	.tui-address-flex {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.tui-address-main {
		width: 600rpx;
		height: 70rpx;
		display: flex;
		font-size: 30rpx;
		line-height: 86rpx;
	}

	.tui-address-name {
		width: 120rpx;
		font-weight: 800;
		font-size: 30rpx;
	}

	.tui-address-tel {
		margin-left: 12rpx;
		color: #999999;
		font-size: 24rpx
	}

	.tui-address-detail {
		font-size: 26rpx;
		word-break: break-all;
		color: #434343;
		padding-bottom: 25rpx;
	}

	.tui-address-label {
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

	.tui-address-imgbox {
		width: 80rpx;
		height: 100rpx;
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		right: 10rpx;
	}

	.tui-address-imgbox2 {
		width: 80rpx;
		height: 100rpx;
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		right: 90rpx;
	}

	/* .tui-address-imgbox image{
		margin-left: 20rpx;
	} */

	.tui-address-img {
		width: 36rpx;
		height: 36rpx;
	}

	.tui-address-new {
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
