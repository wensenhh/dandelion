<template>
	<view class="container">
		<!-- 	<view class="tui-order-header" @tap="switchStatus">
			<view class="tui-header-content">
				<view>
					<view class="tui-status-text">{{getStatusText(status)}}</view>
					<view class="tui-reason"><text class="tui-reason-text">{{getReason(status)}}</text>
						<tui-countdown :time="1800" color="rgba(254,254,254,0.75)" colonColor="rgba(254,254,254,0.75)" borderColor="transparent"
						 backgroundColor="transparent" v-if="status===1"></tui-countdown>
					</view>
				</view>
				<image :src="getImg(status)" class="tui-status-img" mode="widthFix"></image>
			</view>
		</view> -->
		<!-- 		<tui-list-cell arrow backgroundColor="#fefefe" @click="logistics">
			<view class="tui-flex-box">
				<image :src="webURL+'img_order_logistics3x.png'" class="tui-icon-img"></image>
				<view class="tui-logistics">
					<view class="tui-logistics-text">快递已到收货点，请注意查收哦! 投递员: echo. 联系电话: 17788849992</view>
					<view class="tui-logistics-time">2019-06-03 12:02</view>
				</view>
			</view>
		</tui-list-cell> -->
		<tui-list-cell unlined :hover="false" backgroundColor="#F73037">
			<view class="tui-flex-box">
				<image src="/static/images/my/img_order_address.png" class="tui-icon-img"></image>
				<view class="tui-addr">
					<view class="tui-addr-userinfo">{{goodsDetail.getaddress.name}}<text
							class="tui-addr-tel">{{goodsDetail.getaddress.phone}}</text></view>
					<view class="tui-addr-text">{{goodsDetail.getaddress.province + goodsDetail.getaddress.city + goodsDetail.getaddress.district + goodsDetail.getaddress.address}}</view>
				</view>
			</view>
		</tui-list-cell>


		<view class="tui-order-item">
			<tui-list-cell :hover="false" :lineLeft="false" :unlined="true">
				<view class="item-title-center">
					<image src="/static/images/my/order_item_shop.png" class="icon-order-item" mode=""></image>
					<text>蒲公英商城</text>
				</view>
			</tui-list-cell>
			<block v-for="(item,index) in goodsDetail.order_detail" :key="index">
				<tui-list-cell padding="0" :unlined="true">
					<view class="tui-goods-item">
						<!-- <view class="ye" v-if="goodsDetail.activity_type_id!=0">
							<view class="ye-text" >
								{{goodsDetail.activity_type}}
							</view>
						</view> -->
						<image :src="item.product_img_path" class="tui-goods-img"></image>
						<view class="tui-goods-center">
							<view class="tui-goods-name">{{item.product_name}}</view>
							<!-- <view class="tui-goods-attr">{{item.spec_value}}</view> -->
							<view class="left-right tui-price-large ">
								<view>￥ {{item.order_price}}</view>
								<view>x{{item.product_count}}</view>
							</view>
						</view>

					</view>
				</tui-list-cell>
			</block>
			<view class="tui-goods-info">
				<view class="tui-price-flex tui-size32" v-if="goodsDetail.order_status==0?true:false">

					<view class="tui-goods-price ">
						<view class="tui-fontsize-32">
							需支付：
						</view>
						<view class="tui-price-large ">￥{{goodsDetail.order_money}}</view>
					</view>
				</view>
				<view class="tui-order-btn">
					<view class="tui-btn-ml" v-if="goodsDetail.order_status==0?true:false">
						<tui-button type="black" plain width="152rpx" height="56rpx" :size="26" shape="circle"
							@click="cancelOrderBtn">取消订单</tui-button>
					</view>

					<view class="tui-btn-ml" v-if="goodsDetail.order_status==0?true:false">
						<tui-button type="danger" plain width="152rpx" height="56rpx" :size="26" shape="circle"
							@click="gobtnPay">去支付</tui-button>
					</view>
					<view class="tui-btn-ml"
						v-if="(goodsDetail.order_status==2 ||goodsDetail.order_status==1) && goodsDetail.activity_type!='批'?true:false">
						<tui-button type="danger" plain width="152rpx" height="56rpx" :size="26" shape="circle"
							@click="confirmOrder">确认收货</tui-button>
					</view>
					<view class="tui-btn-ml" v-if="goodsDetail.order_status==4?true:false">
						<tui-button type="black" plain width="152rpx" height="56rpx" :size="26" shape="circle"
							@click="deleteOrder">删除订单</tui-button>
					</view>
				</view>
			</view>
		</view>

		<view class="tui-order-info">
			<tui-list-cell :hover="false" :unlined="true">
				<view class="tui-order-title">
					订单信息
				</view>
			</tui-list-cell>
			<view class="tui-order-content">
				<view class="tui-order-flex">
					<view class="tui-item-title">订单编号:</view>
					<view class="display-f">

						<view class="tui-item-content">
							{{goodsDetail.order_no}}
						</view>
						<view class="order-copy" @click="clipboard">
							复制
						</view>
					</view>
				</view>
				
				<!-- <view class="tui-order-flex">
					<view class="tui-item-title">电子积分:</view>
					<view class="tui-item-content">扣除{{goodsDetail.use_integral}}电子积分</view>
				</view> -->
				<view class="tui-order-flex">
					<view class="tui-item-title">支付方式:</view>
					<view class="tui-item-content">USTD <!-- {{goodsDetail.pay_way==1?'微信支付':goodsDetail.pay_way==2?'支付宝':'余额支付'}} -->
					</view>
				</view>
				<view class="tui-order-flex">
					<view class="tui-item-title">运费:</view>
					<view class="tui-item-content">￥{{goodsDetail.ship_company}}</view>
				</view>
				<view class="tui-order-flex">
					<view class="tui-item-title">商品总价:</view>
					<view class="tui-item-content">￥{{goodsDetail.order_money}}</view>
				</view>
				<view class="tui-order-flex">
					<view class="tui-item-title">支付时间:</view>
					<view class="tui-item-content">{{goodsDetail.created_at}}</view>
				</view>
				<view class="tui-order-flex" v-if="goodsDetail.delivery_btn==1 && goodsDetail.activity_type!='批'?true:false">
									<view class="tui-item-title">快递名称:</view>
									<view class="display-f">
								
										<view class="tui-item-content">
											{{goodsDetail.shipping_name}}
										</view>
									</view>
								</view>
<view class="tui-order-flex" v-if="goodsDetail.delivery_btn==1&& goodsDetail.activity_type!='批'?true:false">
					<view class="tui-item-title">快递单号:</view>
					<view class="display-f">
				
						<view class="tui-item-content">
							{{goodsDetail.invoice_no}}
						</view>
						<view class="order-copy" @click="kdclipboard">
							复制
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="tui-safe-area"></view> -->
		<!-- <view class="tui-tabbar tui-order-btn"> -->
		<!-- <view class="tui-btn-mr">
				<tui-button type="black" :plain="true" width="152rpx" height="56rpx" :size="26" shape="circle">删除订单</tui-button>
			</view> -->
		<!-- 	<view class="tui-btn-mr">
				<tui-button type="black" :plain="true" width="152rpx" height="56rpx" :size="26" shape="circle" @click="refund">申请售后</tui-button>
			</view>
			<view class="tui-btn-mr">
				<tui-button type="danger" :plain="true" width="152rpx" height="56rpx" :size="26" shape="circle" @click="btnPay">立即支付</tui-button>
			</view>
		</view> -->
		<t-pay-way :price="price" :usdtprice="usdtprice" :show="show" @paySumbitClick="paySubmitClick" @close="popupClose"></t-pay-way>
	</view>
</template>

<script>
	import {
		wxpay,
		alipay
	} from '@/utils/pay'
	import {
		getOrderList,
		confirmOrder,
		cancelOrder,
		delOrder
	} from '@/api/order';
	import {
		usdtCoin,
		rechargeCoin
	} from '@/contract/contract.js'
	import { prepay, getPayway } from '@/api/app'
	import tPayWay from "@/components/views/t-pay-way/t-pay-way"
	import thorui from "@/components/common/tui-clipboard/tui-clipboard.js"
	export default {
		components: {
			tPayWay
		},
		data() {
			return {
				webURL: "https://www.thorui.cn/wx/static/images/mall/order/",
				//1-待付款 2-付款成功 3-待收货 4-订单已完成 5-交易关闭
				status: 1,
				// statusName: "待付款",
				// statusName: "待收货",
				statusName: "待收货",
				show: false,
				orderId: 0,
				price: 1.00,
				payInfo: {},
				goodsDetail: {
					id: 1,
					goodsName: "水果 苹果",
					pic: "pitaya.png",
					address: "广东，深圳，宝安，西乡等",
					desc: "偏远地区不包邮",
					rule: "规格默认",
					num: 1,
					itemPrice: "26.00",
					orderPrice: "34.00",
					status: "待付款",
					jifei: 30,
					expressFee: 8.00,
					payTime: "2019-05-26 10:36",
					payType: "微信支付",
					orderNo: "20211222338324"
				}
			}
		},
		onLoad: function(options) { /////页面一打开，就显示设置的标题
			this.orderId = options.orderId
			this.getOrderDetail(options.orderId)


			console.log("orderId=", options.orderId)
		},
		onShow() {
			// this.getOrderDetail(this.orderId)
		},
		methods: {
			payorder(hash,remark) {
				// let remark = this.orderInfo.orderId + '-' + String(Date.now()) + Math.floor(Math.random() * 100)
				console.log(remark)
				let that = this
				this.$request.post('/orders/payorder', {
					order_id: this.goodsDetail.id,
					num: this.usdtprice,
					hash: hash,
					remarks: remark
				}).then(res => {
					if (res.code == 200) {
						uni.$emit('payment', {
							result: true,
							order_id: this.goodsDetail.id
						});
						this.getOrderDetail(this.orderId)
						uni.showToast({
							title: '支付成功！'
						})
						this.show = false
					}
				})
			},
			async btnPay() {
				// if (this.addressId != "" && this.addressId != 0 && this.addressId != undefined) {
				// 	this.show = true
				// } else {
				// 	this.tui.toast("请新增地址或选择地址")
				// }
				console.log('支付u数量：',this.usdtprice)
				let remark = this.goodsDetail.id + '-' + String(Date.now()) + Math.floor(Math.random() * 100)
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
						order_id: this.goodsDetail.id
					});
					this.getOrderDetail(this.orderId)
					uni.showToast({
						title: '支付成功！'
					})
					this.show = false
					// this.payorder(res,remark)
				}
			},
			paySubmitClick(e) {
				this.btnPay()
				return false
				let that = this;
				that.payInfo = e
				prepay({
					from: "order",
					order_id:Number(that.goodsDetail.id),
					pay_way: Number(e.payId),
				}).then((res) => {
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
						this.getOrderDetail(this.orderId)
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
			async cancelOrderApi(orderId) {
				let res =await cancelOrder(orderId)
					if (res.code == 1) {
						console.log("cancelOrderApi", res)
						this.tui.toast("取消成功");
						this.getOrderDetail(this.orderId)
					} else if (res.code == -1) {
						this.tui.toast(res.msg);
						this.tui.isLogin(false);
						this.tui.setToken("")
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

			cancelOrderBtn() {
				let that = this;
				uni.showModal({
					title: '提示',
					content: '确定取消此订单？',
					success: function(res) {
						if (res.confirm) {
							that.cancelOrderApi(that.orderId)
				  } else if (res.cancel) {}
					}
				});

			},
			async deleteOrderApi(orderId) {
				let that = this;
				let res = await delOrder(orderId);
					if (res.code == 1) {
						console.log("deleteOrderApi", res)
						that.tui.toast("删除成功");
					uni.redirectTo({
						url: "/pages/my/myOrder/myOrder"
					})
					} else if (res.code == -1) {
						this.tui.toast(res.msg);
						this.tui.isLogin(false);
						uni.redirectTo({
							url: "/pages/tabbar/index/index"
						})
					} else {
						if (res.show == 1) {
							that.tui.toast(res.msg);
			
							// this.close();
						}
					}
			},
			async confirmOrderApi(orderId) {
				let that = this;
				let res = await confirmOrder(orderId)
					if (res.code == 1) {
						console.log("confirmOrderApi", res)
						that.tui.toast("确认收货成功");
					this.getOrderDetail(this.orderId)
					} else if (res.code == -1) {
						this.tui.toast(res.msg);
						this.tui.isLogin(false);
						uni.redirectTo({
							url: "/pages/tabbar/index/index"
						})
					} else {
						if (res.show == 1) {
							that.tui.toast(res.msg);

							// this.close();
						}
					}
			},
			confirmOrder() {
				let that = this;
				uni.showModal({
					title: '提示',
					content: '确定收货此订单？',
					success: function(res) {
						if (res.confirm) {
							that.confirmOrderApi(that.orderId)
						} else if (res.cancel) {}
					}
				});

			},
			deleteOrder() {
				let that = this;
				uni.showModal({
					title: '提示',
					content: '删除此订单？',
					success: function(res) {
						if (res.confirm) {
							that.deleteOrderApi(that.orderId)
						} else if (res.cancel) {}
					}
				});

			},
			getOrderDetail(orderId) {

				this.$request.post("/orders/orderDetail", {
					order_id: orderId
				}).then((res) => {
					if (res.code == 1) {
						this.goodsDetail = res.data
						console.log("status", res.data.order_status)
						let title = ""
						let status = res.data.order_status
						if (status == 0) {
							this.statusName = '待付款'
							title = "买家已下单"
						} else if (status == 2) {
							this.statusName = '待收货'
							title = "买家已发货"
						} else if (status == 3) {
							this.statusName = '待评价'
							title = "订单已完成"
						} else if (status == 1) {
							title = "订单待发货"
						}else if(status ==4){
							title="订单已取消"
						}
						uni.setNavigationBarTitle({
							title: title
						})
					} else if (res.code == -1) {
						this.tui.toast(res.msg);
						this.tui.isLogin(false);
						this.tui.setToken("")
					uni.redirectTo({
						url: "/pages/tabbar/index/index"
					})
					} else {
						if (res.show == 1) {
							this.tui.toast(res.msg);

						}
					}
				}).catch((res) => {})
			},
			//event 当需要异步请求返回数据再进行复制时，需要传入此参数，或者异步方法转为同步方法（H5端）

			clipboard: function(event) {
				let data = this.goodsDetail.order_sn;
				if(data==""){
					this.tui.toast("复制失败，无数据")
					return
				}
				thorui.getClipboardData(data, (res) => {
					console.log("res",res)
					// #ifdef H5 || MP-ALIPAY
					if (res) {
						this.tui.toast("复制成功")
					} else {
						this.tui.toast("复制失败")
					}
					// #endif
				}, event)
			},
			kdclipboard: function(event) {
				let data = this.goodsDetail.invoice_no;
				if(data==""){
					this.tui.toast("复制失败，无数据")
					return
				}
				thorui.getClipboardData(data, (res) => {
					// #ifdef H5 || MP-ALIPAY
					if (res) {
						this.tui.toast("复制成功")
					} else {
						this.tui.toast("复制失败")
					}
					// #endif
				}, event)
			},
			getImg: function(status) {
				return this.webURL + ["img_order_payment3x.png", "img_order_send3x.png", "img_order_received3x.png",
					"img_order_signed3x.png", "img_order_closed3x.png"
				][status - 1]
			},
			getStatusText: function(status) {
				return ["等待您付款", "付款成功", "待收货", "订单已完成", "交易关闭"][status - 1]
			},
			getReason: function(status) {
				return ["剩余时间", "等待卖家发货", "还剩X天XX小时自动确认", "", "超时未付款，订单自动取消"][status - 1]
			},
			switchStatus() {
				let status = this.status + 1
				this.status = status > 5 ? 1 : status
				this.tui.toast("状态切换成功")
			},
			logistics() {
				this.tui.href("/pages/my/logistics/logistics")
			},
			gobtnPay() {
				this.price = this.goodsDetail.order_money
				this.usdtprice = Number(this.orderList[index].order_usdt)
				this.show = true
			},
			popupClose() {
				this.show = false
			},
			refund() {
				this.tui.href("/pages/my/refund/refund")
			}
		}
	}
</script>

<style>
	page {
		background-color: #f7f7f7;
	}

	.container {
		padding-bottom: 118rpx;
	}

	.tui-order-header {
		width: 100%;
		height: 160rpx;
		position: relative;
		background-color: #EB0909;
	}

	.tui-img-bg {
		width: 100%;
		height: 160rpx;
	}

	.tui-header-content {
		width: 100%;
		height: 160rpx;
		position: absolute;
		z-index: 10;
		left: 0;
		top: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 70rpx;
		box-sizing: border-box;
	}

	.tui-status-text {
		font-size: 34rpx;
		line-height: 34rpx;
		color: #FEFEFE;
	}

	.tui-reason {
		font-size: 24rpx;
		line-height: 24rpx;
		color: rgba(254, 254, 254, 0.75);
		padding-top: 15rpx;
		display: flex;
		align-items: center;
	}

	.tui-reason-text {
		padding-right: 12rpx;
	}

	.tui-status-img {
		width: 80rpx;
		height: 80rpx;
		display: block;
	}

	.tui-flex-box {
		display: flex;
		align-items: center;
		background-color: #FFFFFF;
		padding: 26rpx;
		border-radius: 30rpx;
	}

	.tui-icon-img {
		width: 80rpx;
		height: 80rpx;
		flex-shrink: 0;
	}

	.tui-logistics {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0 24rpx 0 20rpx;
		box-sizing: border-box;
	}

	.tui-logistics-text {
		font-size: 26rpx;
		line-height: 32rpx;
	}

	.tui-logistics-time {
		font-size: 24rpx;
		line-height: 24rpx;
		padding-top: 16rpx;
		color: #666
	}

	.tui-addr {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-left: 20rpx;
		box-sizing: border-box;
	}

	.tui-addr-userinfo {
		font-size: 30rpx;
		line-height: 30rpx;
		font-weight: bold;
	}

	.tui-addr-text {
		font-size: 24rpx;
		line-height: 32rpx;
		padding-top: 16rpx;
	}

	.tui-addr-tel {
		padding-left: 40rpx;
	}

	.tui-order-item {
		border-radius: 30rpx;
		overflow: hidden;
		margin: 30rpx 20rpx;
	}

	.tui-goods-title {
		width: 100%;
		font-size: 28rpx;
		line-height: 28rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
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
		font-size: 30rpx;
		line-height: 32rpx;
	}

	.tui-goods-attr {
		font-size: 26rpx;
		color: #888888;
		line-height: 42rpx;
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
	}

	.tui-goods-price {
		width: 100%;
		display: flex;
		align-items: flex-end;
		justify-content: flex-end;
		font-size: 24rpx;
	}

	.tui-size-24 {
		font-size: 24rpx;
		line-height: 24rpx;
	}

	.tui-price-large {
		font-size: 34rpx;
		line-height: 30rpx;
		color: #FF5555;
	}

	.tui-goods-info {
		width: 100%;
		padding: 30rpx;
		box-sizing: border-box;
		background: #fff;
	}

	.tui-price-flex {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.tui-size24 {
		padding-bottom: 20rpx;
		font-size: 24rpx;
		line-height: 24rpx;
		color: #888;
	}

	.tui-size32 {
		font-size: 32rpx;
		line-height: 32rpx;
		font-weight: 500;
	}

	.tui-pbtm20 {
		padding-bottom: 20rpx;
	}

	.tui-flex-shrink {
		flex-shrink: 0;
	}

	.tui-primary-color {
		color: #EB0909;
	}

	.tui-order-info {
		border-radius: 30rpx;
		margin: 0rpx 20rpx;
		overflow: hidden;
	}

	.tui-order-title {
		position: relative;
		font-size: 30rpx;
		line-height: 28rpx;
		/* padding-left: 12rpx; */
		box-sizing: border-box;
	}

	/* .tui-order-title::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		border-left: 4rpx solid #EB0909;
		height: 100%;
	} */

	.tui-order-content {
		width: 100%;
		padding: 24rpx 30rpx;
		box-sizing: border-box;
		background: #fff;
		font-size: 24rpx;
		line-height: 30rpx;
	}

	.tui-order-flex {
		display: flex;
		padding-top: 18rpx;
		justify-content: space-between;
		font-size: 28rpx;
	}

	.tui-order-flex:first-child {
		padding-top: 0
	}

	.tui-item-title {
		width: 132rpx;
		flex-shrink: 0;
	}

	.tui-item-content {
		color: #666;
		line-height: 32rpx;
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

	.tui-safe-area {
		height: 1rpx;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-tabbar {
		width: 100%;
		height: 98rpx;
		background: #fff;
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		font-size: 26rpx;
		box-shadow: 0 0 1px rgba(0, 0, 0, .3);
		padding-bottom: env(safe-area-inset-bottom);
		z-index: 996;
	}

	.tui-btn-mr {
		margin-right: 30rpx;
	}

	.tui-contact {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
	}

	.tui-contact image {
		width: 36rpx;
		height: 36rpx;
		margin-right: 16rpx;
	}

	.address-detail {
		height: 180rpx;
		padding-top: 20rpx;
	}

	.color-999 {
		color: #999999;
	}

	.left-right {
		display: flex;
		justify-content: space-between;
		margin-top: 16rpx;
	}

	.tui-fontsize-32 {
		font-size: 32rpx;
	}

	.order-copy {
		color: #F73037;
		margin-left: 10rpx;
	}

	.tui-order-btn {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		background: #fff;
		padding: 40rpx 0rpx 20rpx;
		box-sizing: border-box;
	}

	.tui-btn-ml {
		margin-left: 20rpx;
	}

	.icon-order-item {
		width: 55rpx;
		height: 55rpx;
	}

	.item-title-center {
		display: flex;
		align-items: center;
	}
</style>
