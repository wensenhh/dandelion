<template>
	<view class="container">
		<tui-tabs :tabs="tabs" :isFixed="scrollTop>=0" :currentTab="currentTab" selectedColor="#FF5555"
			sliderBgColor="#FF5555" @change="change" itemWidth="20%"></tui-tabs>
		<!--选项卡逻辑自己实现即可，此处未做处理-->
		<view class="tui-order-list" v-if="orderList.length==0">
			<view class="none-data-info">
				<image src="/static/images/my/none-data.png" mode=""></image>
				<view class="none-text">
					暂无订单
				</view>
			</view>
		</view>
		<view :class="{'tui-order-list':scrollTop>=0}" v-else>
			<view class="tui-order-item" v-for="(item,index) in orderList" :key="index">

				<tui-list-cell :hover="false" :lineLeft="false" :unlined="true">
					<view class="tui-goods-title">
						<view class="item-title-center">
							<!-- <image src="/static/images/my/order_item_shop.png" class="icon-order-item" mode=""></image>
							<text></text> -->
						</view>
						<view class="tui-order-status">{{changestatustext(item.order_status)}}</view>
					</view>
				</tui-list-cell>
				<block v-for="(goodsItem,goodsIndex) in item.detaillist" :key="goodsIndex">
					<tui-list-cell padding="0" @click="detail(item.id)" :unlined="true">
						<view class="tui-goods-item">
							<!-- <view class="ye" v-if="item.activity_type_id!=0">
								<view class="ye-text">
									{{item.activity_type}}
								</view>
							</view> -->
							<image :src="goodsItem.product_img_path" class="tui-goods-img"></image>
							<view class="tui-goods-center">
								<view class="tui-goods-name">{{goodsItem.product_name}}</view>
								<!-- <view class="tui-goods-attr">{{goodsItem.spec_value}}</view> -->
								<view class="left-right tui-color-red ">
									<view>￥ {{goodsItem.order_price}}</view>
									<view>x{{goodsItem.product_count}}</view>
								</view>
							</view>

						</view>
					</tui-list-cell>
					<tui-list-cell :hover="false" unlined>
						<view class="tui-goods-price">
							<view class="tui-size-28 color-999">共{{goodsItem.goods_num || 1}}件，</view>
							<view class="tui-size-28">小计：</view>
							<view class="tui-price-large">￥{{item.order_money}}</view>
						</view>
					</tui-list-cell>
				</block>

				<view class="tui-order-btn">
					<view class="tui-btn-ml" v-if="item.order_status==0?true:false">
						<tui-button type="black" plain width="152rpx" height="56rpx" :size="26" shape="circle"
							@click="cancelOrder(item.id)">取消订单</tui-button>
					</view>

					<view class="tui-btn-ml" v-if="item.order_status==0?true:false">
						<tui-button type="danger" plain width="152rpx" height="56rpx" :size="26" shape="circle"
							@click="gobtnPay(index)">去支付</tui-button>
					</view>
					<view class="tui-btn-ml" v-if="item.order_status==1?true:false">
						<tui-button type="black" plain width="152rpx" height="56rpx" :size="26" shape="circle"
							@click="detail(item.id)">查看详情</tui-button>
					</view>
					<!-- <view class="tui-btn-ml" v-if="item.order_status_desc=='待评价'?true:false"> -->
					<view class="tui-btn-ml" v-if="item.order_status==2&&item.activity_type!='批'?true:false">
						<tui-button type="black" plain width="152rpx" height="56rpx" @click="finishOrder(item.id)"
							:size="26" shape="circle">确认收货
						</tui-button>
					</view>
					<view class="tui-btn-ml" v-if="item.order_status==4?true:false">
						<tui-button type="black" plain width="152rpx" height="56rpx" @click="deleteOrder(item.id)"
							:size="26" shape="circle">删除订单
						</tui-button>
					</view>
				</view>
			</view>
		</view>

		<!-- <view class="" v-else>
			hello111
		</view> -->
		<!-- 			

		</view>
		<!--加载loadding-->
		<tui-loadmore v-if="loadding" :index="3" type="red"></tui-loadmore>
		<tui-nomore v-if="!pullUpOn" backgroundColor="#fafafa"></tui-nomore>
		<!--加载loadding-->
		<t-pay-way :price="price" :usdtprice="usdtprice" :show="show" @paySumbitClick="paySubmitClick" @close="popupClose"></t-pay-way>
		<loading-view v-if="showLoading" background-color="transparent" :size="50"></loading-view>
	</view>
</template>

<script>
	import {
		loadingFun
	} from '@/utils/tools'
	import {
		getOrderList,
		confirmOrder,
		delOrder
	} from '@/api/order';
	import {
		wxpay,
		alipay
	} from '@/utils/pay'
	import {
		prepay,
		getPayway
	} from '@/api/app'
	import {
		orderType,
		loadingType
	} from '@/utils/type';
	import {
		usdtCoin,
		rechargeCoin
	} from '@/contract/contract.js'
	import tPayWay from "@/components/views/t-pay-way/t-pay-way"
	export default {
		components: {
			tPayWay,
		},
		data() {
			return {
				active: orderType.ALL,
				orderIndex: 0,
				show: false,
				price: 5.55,
				usdtprice: 0,
				tabs: [{
					name: "全部",
					type: orderType.ALL,
					isShow: false
				}, {
					name: "待付款",
					type: orderType.PAY,
					isShow: false
				}, {
					name: "待发货",
					type: orderType.DELIVERY,
					isShow: false
				}, {
					name: "待收货",
					type: orderType.RECEIVE,
					isShow: false
				}, {
					name: "售后中",
					type: orderType.FINISH,
					isShow: false
				}],
				orderList: [],
				currentTab: 0,
				pageIndex: 1,
				loadding: false,
				pullUpOn: true,
				scrollTop: 0,
				payInfo: {},
				page: 1,
				showLoading: false
			}

		},
		onLoad: function(options) {
		 const {
				tabs
			} = this
			let type = options.type || orderType.ALL;
			let index = tabs.findIndex(item => item.type == type)
			this.changeShow(index);
			// this.getOrderList("all")
			this.reflesh()
		},


		computed: {
			getOrderStatus() {
				return (status) => {
					let text = ''
					switch (status) {
						case 0:
							text = '待支付';
							break;
						case 1:
							text = '待发货';
							break;
						case 2:
							text = '待收货';
							break;
						case 3:
							text = '已完成';
							break;
						case 4:
							text = '订单已关闭';
							break;
					}
					return text
				}
			},
		},

		beforeMount: function() {
			console.log("beforeMount")
			// this.getOrderListFun();
		},
		destroyed: function() {
			uni.$off(['payment', 'refreshorder'])
		},
		methods: {

			reflesh() {
				this.page = 1
				this.orderList = []
				this.status = loadingType.LOADING
				this.type = 0
				this.getOrderListFun();
			},
			reload() {
				this.status = loadingType.LOADING
				this.getOrderListFun();
			},

			async getOrderListFun() {
				let {
					page,
					active,
					orderList,
					status
				} = this;
				const data = await loadingFun(getOrderList, page, orderList, status, {
					status: active,
					size: 999
				})
				if (!data) return
				console.log("data.page", data.page, data.dataList.length)
				console.log(data)
				this.page = data.page
				this.orderList = data.dataList
				this.status = data.status
			},
			changestatustext(status){
				switch (status){
					case 0:
						return '待付款'
						break;
					case 1:
						return '订单待发货'
						break;
					case 2:
						return '待收货'
						break;
					case 3:
						return '待评价'
						break;
					case 4:
						return '订单已取消'
						break;
					default:
						break;
				}
			},
			changeShow(index) {
				if (index != -1) {
					this.currentTab = index
					this.tabs[index].isShow = true
				}
			},
			popupClose() {
				this.show = false
			},
			async btnPay() {
				// if (this.addressId != "" && this.addressId != 0 && this.addressId != undefined) {
				// 	this.show = true
				// } else {
				// 	this.tui.toast("请新增地址或选择地址")
				// }
				console.log('支付u数量：',this.usdtprice)
				let remark = this.orderList[this.orderIndex].id + '-' + String(Date.now()) + Math.floor(Math.random() * 100)
				const params = {
					...usdtCoin,
					amount: this.usdtprice,
					remarks: remark, // todo 这个问后台要传什么
				}
				const res = await rechargeCoin(params)
				console.log('res===>', res)
				if(res){
					uni.$emit('payment', {
						result: true,
						order_id: this.orderList[that.orderIndex].id
					});
					this.reflesh()
					uni.showToast({
						title: '支付成功！'
					})
					this.show = false
					// this.payorder(res,remark)
				}
			},
			payorder(hash,remark) {
				// let remark = this.orderInfo.orderId + '-' + String(Date.now()) + Math.floor(Math.random() * 100)
				console.log(remark)
				let that = this
				this.$request.post('/orders/payorder', {
					order_id: this.orderList[that.orderIndex].id,
					num: this.usdtprice,
					hash: hash,
					remarks: remark
				}).then(res => {
					if (res.code == 200) {
						uni.$emit('payment', {
							result: true,
							order_id: this.orderList[that.orderIndex].id
						});
						this.reflesh()
						uni.showToast({
							title: '支付成功！'
						})
						this.show = false
					}
				})
			},
			paySubmitClick(e) {
				this.btnPay()
				return false
				let that = this;
				that.payInfo = e
				prepay({
					from: "order",
					order_id: Number(that.orderList[that.orderIndex].id),
					pay_way: Number(e.payId),
				}).then((res) => {
					console.log("prepay===", res)
					if (res.code == 20001 || res.code == 1 || res.code == 10001) {
						switch (res.code) {
							case 1:
								this.handleWechatPay(res.data);
								break;
							case 10001:
								this.handleAlipayPay(res.data);
								break;
							case 20001:
								this.handleWalletPay();
								break;
						}
						this.show = false;
					} else if (res.code == -1) {
						this.tui.toast(res.msg);
						this.tui.isLogin(false);
						this.tui.setToken("")
						uni.redirectTo({
							url: "/pages/tabbar/index/index"
						})
					} else {
						if (res.show == 1) {
							that.tui.toast(res.msg);
							// this.close();
						}
					}
				}).catch((res) => {})
			},
			// 微信支付
			handleWechatPay(data) {
				console.log("handleWechatPay", data)
				wxpay(data).then(res => {
					console.log(res)
					this.handPayResult(res)
				})
			},
			// 支付宝支付
			handleAlipayPay(data) {
				alipay(data).then(res => {
					console.log(res)
					this.handPayResult(res)
				})
			},
			// 钱包余额支付
			handleWalletPay() {
				console.log('支付成功')
				//余额支付成功
				this.handPayResult('success')
			},
			// 支付后处理
			handPayResult(result) {
				switch (result) {
					case 'success':
						uni.$emit('payment', {
							result: true,
							order_id: this.order_id
						});
						this.reflesh()
						break;

					case 'fail':
					default:
						uni.$emit('payment', {
							result: false,
							order_id: this.order_id
						})
				}
				// 页面出栈
				// uni.navigateBack()
			},
			// 获取微信授权
			authWechatMessage() {
				return new Promise((resolve, reject) => {
					getMnpNotice({
						scene: 1
					}).then(({
						code,
						data,
						msg
					}) => {
						if (code != 1) throw new Error(msg)
						return data
					}).then(data => {
						if (!data.length) return reject()
						uni.requestSubscribeMessage({
							tmplIds: data,
							success(res) {
								resolve(res)
							},
							fail(err) {
								reject(err)
							},
						})
					}).catch(err => {
						reject(err)
					})
				})
			},
			cancelOrderApi(orderId) {
				this.tui.request("/orders/cancel", "POST", {
					order_id: orderId
				}).then((res) => {
					if (res.code == 1) {
						this.tui.toast("取消成功");
						// this.getOrderList("all")
						this.reflesh()
					} else if (res.code == -1) {
						this.tui.toast(res.msg);
						this.tui.isLogin(false);
						uni.redirectTo({
							url: "/pages/tabbar/index/index"
						})
					} else {
						if (res.show == 1) {
							this.tui.toast(res.msg);

							// this.close();
						}
					}
				}).catch((res) => {})
			},
			async finishOrderApi(orderId) {
				let res = await confirmOrder(orderId)
				if (res.code == 1) {
					this.tui.toast("确认收货成功");
					// this.getOrderList("all")
					this.reflesh()
				} else if (res.code == -1) {
					this.tui.toast(res.msg);
					this.tui.isLogin(false);
					uni.redirectTo({
						url: "/pages/tabbar/index/index"
					})
				} else {
					if (res.show == 1) {
						this.tui.toast(res.msg);

						// this.close();
					}
				}
			},


			async deleteOrderApi(orderId) {
				let res = await delOrder(orderId)
				if (res.code == 1) {
					this.tui.toast("删除成功");
					// this.getOrderList("all")
					this.reflesh()
				} else if (res.code == -1) {
					this.tui.toast(res.msg);
					this.tui.isLogin(false);
					uni.redirectTo({
						url: "/pages/tabbar/index/index"
					})
				} else {
					if (res.show == 1) {
						this.tui.toast(res.msg);

						// this.close();
					}
				}

			},

			gobtnPay(index) {
				this.orderIndex = index
				this.price = this.orderList[index].order_money
				console.log(this.price)
				this.usdtprice = Number(this.orderList[index].order_usdt)
				this.show = true
			},
			cancelOrder(orderId) {
				let that = this;
				uni.showModal({
					title: '提示',
					content: '确定删除此订单？',
					success: function(res) {
						if (res.confirm) {
							that.cancelOrderApi(orderId)
							// that.getOrderList("all")
							// this.reflesh()
						} else if (res.cancel) {}
					}
				});

			},
			finishOrder(orderId) {
				let that = this;
				uni.showModal({
					title: '提示',
					content: '确定收货此订单？',
					success: function(res) {
						if (res.confirm) {
							that.finishOrderApi(orderId)
							// that.getOrderList("all")
							// this.reflesh()
						} else if (res.cancel) {}
					}
				});

			},
			deleteOrder(orderId) {
				let that = this;
				uni.showModal({
					title: '提示',
					content: '删除此订单？',
					success: function(res) {
						if (res.confirm) {
							that.deleteOrderApi(orderId)
							// that.getOrderList("all")
							// this.reflesh()
						} else if (res.cancel) {}
					}
				});

			},
			// getOrderList(type) {
			// 	this.tui.request("/order/lists", "GET", {
			// 		type: type
			// 	}).then((res) => {
			// 		// console.log(res, res.code == 1)
			// 		if (res.code == 1) {
			// 			// if(res.data.length!=0){
			// 			this.orderGoods = res.data.list
			// 			// }
			// 		} else if (res.code == -1) {
			// 			this.tui.toast(res.msg);
			// 			this.tui.isLogin(false);
			// 			uni.redirectTo({
			// 				url: "/pages/tabbar/index/index"
			// 			})
			// 		}else {
			// 			if (res.show == 1) {
			// 				this.tui.toast(res.msg);

			// 			}
			// 		}
			// 	}).catch((res) => {})
			// },
			change(e) {
				this.currentTab = e.index
				this.active = this.tabs[e.index].type;
				// this.getOrderList(this.tabs[e.index].type)
				this.reflesh()
			},
			detail(orderId) {
				uni.navigateTo({
					url: '/pages/my/orderDetail/orderDetail?orderId=' + orderId
				})
			},
			invoiceDetail() {
				this.tui.href('/pages/my/invoiceDetail/invoiceDetail')
			},
			addEvaluate() {
				this.tui.href('/pages/my/addEvaluate/addEvaluate')
			}
		},
		onPullDownRefresh() {
			this.reflesh()
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 200);
		},
		onReachBottom() {
			//只是测试效果，逻辑以实际数据为准
			this.loadding = true
			this.pullUpOn = true
			this.getOrderListFun()
			setTimeout(() => {
				this.loadding = false
				this.pullUpOn = false
			}, 1000)
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		}
	}
</script>

<style>
	.container {
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-order-list {
		margin-top: 80rpx;
	}
.ye {
		/*   width: 55rpx;
        height: 55rpx; */
		padding: 10rpx;
		border-radius: 50% 0;
		background: #F73037;
		color: #FFFFFF;
		position: absolute;
		z-index: 99;

	}

	.ye-text {
		margin-top: 5rpx;
		text-align: center;
	}
	.tui-order-item {
		margin-top: 20rpx;
		border-radius: 10rpx;
		overflow: hidden;
	}

	.tui-goods-title {
		width: 100%;
		font-size: 28rpx;
		display: flex;
		align-items: center;
		text-align: center;
		justify-content: space-between;
	}

	.tui-order-status {
		color: #FF5555;
		font-size: 26rpx;
	}

	.tui-goods-item {
		width: 100%;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
	}

	.tui-goods-img {
		width: 180rpx;
		height: 180rpx;
		display: block;
		flex-shrink: 0;
		margin-right: 20rpx;
	}

	.tui-goods-center {
		flex: 1;
		padding: 20rpx 8rpx;
		box-sizing: border-box;
	}

	.tui-goods-name {
		max-width: 610rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		font-size: 26rpx;
		line-height: 32rpx;
	}

	.tui-goods-attr {
		font-size: 22rpx;
		color: #888888;
		line-height: 32rpx;
		padding-top: 20rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.tui-price-right {
		text-align: right;
		font-size: 24rpx;
		color: #888888;
		line-height: 30rpx;
		padding-top: 20rpx;
	}

	.tui-color-red {
		color: #FF5555;
		font-size: 34rpx;
		margin-top: 10rpx;
	}

	.tui-goods-price {
		width: 100%;
		display: flex;
		align-items: flex-end;
		justify-content: flex-end;
		font-size: 24rpx;
	}

	.tui-size-28 {
		font-size: 28rpx;
		line-height: 28rpx;
	}

	.tui-price-large {
		font-size: 34rpx;
		line-height: 30rpx;
		font-weight: 500;
		color: #FF5555;
	}

	.tui-order-btn {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		background: #fff;
		padding: 10rpx 30rpx 20rpx;
		box-sizing: border-box;
	}

	.tui-btn-ml {
		margin-left: 20rpx;
	}

	.color-999 {
		color: #999999;
	}

	.left-right {
		display: flex;
		justify-content: space-between;
	}

	.none-data-info {
		text-align: center;
		margin-top: 180rpx;
	}

	.none-data-info image {
		width: 346rpx;
		height: 295rpx;
	}

	.none-text {
		color: #999999;
		font-size: 28rpx;
		margin-top: 40rpx;

	}

	.icon-order-item {
		width: 55rpx;
		height: 55rpx;
	}

	.item-title-center {
		display: flex;
		align-items: center;
	}

	.tui-list-cell {
		width: 100%;
		position: relative;
		display: flex;
		align-items: center;
		font-size: 26rpx;
		line-height: 26rpx;
		padding: 26rpx 20rpx;
		box-sizing: border-box;
	}

	.tui-list-cell::after {
		content: '';
		position: absolute;
		border-bottom: 1rpx solid #eaeef1;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		bottom: 0;
		right: 0;
		left: 126rpx;
	}
</style>
