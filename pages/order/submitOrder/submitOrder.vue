<template>
	<view class="container">
		<view class="tui-box">
			<view class="address-list" @click="chooseAddr">
				<view class="tui-address">
					<view v-if="addressInfo.id!=undefined?true:false" class="display-f " style="margin: 10px;">
						<view class="address-pic">
							<image src="/static/images/address.png" mode=""></image>
						</view>
						<view class="address-info">
							<view class="tui-userinfo">
								<text class="tui-name">{{addressInfo.name}}</text>
								<text class="tui-tel">{{addressInfo.phone}}</text>
							</view>
							<view class="tui-addr">
								<text>{{addressInfo.province}}{{addressInfo.city}}{{addressInfo.district}}{{addressInfo.address}}</text>
							</view>
						</view>
						<view class="tui-right">
							<tui-icon name="arrowright"></tui-icon>
						</view>

					</view>
					<view class="tui-none-addr" v-else>
						<view class="address-pic">
							<image src="/static/images/address.png" mode=""></image>
						</view>
						<view class="address-info">
							<text>选择收货地址</text>
						</view>
						<view class="tui-right">
							<tui-icon name="arrowright"></tui-icon>
						</view>
					</view>
				</view>
				<view class="tui-bg-img"></view>
			</view>
			<view class="tui-top tui-goods-info address-list">
				<!-- <tui-list-cell :hover="false" :lineLeft="false">
					<view class="tui-goods-title">
						<image src="/static/images/my/order_item_shop.png" mode="" class="shop-pic"></image>蒲公英商城
					</view>
				</tui-list-cell> -->
				<block>
					<tui-list-cell :hover="false" padding="0">
						<view class="tui-goods-item" v-for="(item,index) in goodsLists">
							<image :src="item.product_img_path || item.image" class="tui-goods-img"></image>
							<view class="tui-goods-center">
								<view class="tui-goods-name"> {{item.product_name || item.name}}</view>
								<!-- <view class="tui-goods-attr">{{item.spec_value_str || item.spec_value}}</view> -->
								<!-- <view class="price" v-if="item.findWholesale==1?true:false">
							{{item.wholesaleAmount}}个农场券+￥{{item.discountAmount}}</view> -->
								<!-- <view class="price" v-if="item.findWholesale==1?true:false">
							{{orderInfo.order_amount}}元</view> -->
								<view class="price">￥ {{item.order_price}}</view>
							</view>
							<view class="tui-price-right">
								<!-- <view>￥298.00</view> -->
								<view>x{{item.product_count}}</view>
							</view>
						</view>
					</tui-list-cell>
				</block>
				<tui-list-cell :hover="false">
					<view class="tui-padding tui-flex">
						<view>购买数量</view>
						<!-- <tui-numberbox :max="99" :min="1" :value="value" @change="change"></tui-numberbox> -->
						<view>{{allpaynum}}</view>
					</view>
				</tui-list-cell>
				<!-- <tui-list-cell :arrow="hasCoupon" :hover="hasCoupon" @click="couponShow=true">
					<view class="tui-padding tui-flex">
						<view>优惠券</view>
						<view :class="{'tui-color-red':hasCoupon}">{{hasCoupon?"满5减1":'没有可用优惠券'}}</view>
					</view>
				</tui-list-cell> -->
				<tui-list-cell :hover="false" :arrow="false">
					<view class="tui-padding tui-flex">
						<view>配送方式</view>
						<view>快递 ￥{{shipping_price}}</view>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-padding tui-flex">
						<view>开具发票</view>
						<view>暂不支持</view>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false" :lineLeft="false" padding="0" v-if="!show">
					<view class="tui-remark-box tui-padding tui-flex">
						<view>订单备注</view>
						<input type="text" class="tui-remark my-input" placeholder="选填: 请先和商家协商一致"
							placeholder-class="tui-phcolor"></input>
					</view>
				</tui-list-cell>

			</view>

			<!-- <view class="tui-top">
				<tui-list-cell unlined :hover="insufficient" :radius="true" :arrow="insufficient">
					<view class="tui-flex">
						<view class="tui-balance">余额支付<text class="tui-gray">(￥2020.00)</text></view>
						<switch color="#19be6b" class="tui-scale-small" v-show="!insufficient" />
						<view class="tui-pr-30 tui-light-dark" v-show="insufficient">余额不足, 去充值</view>
					</view>
				</tui-list-cell>
			</view> -->
		</view>
		<view class="tui-safe-area"></view>
		<view class="tui-tabbar">
			<view class="tui-flex-end tui-color-red tui-pr-20">
				<view class="tui-black">共{{value}}件，合计: </view>
				<view class="tui-size-26">￥</view>
				<view class="tui-price-large">{{price}}</view>
				<!-- <view class="tui-price-large" v-if="goodsLists[0].findWholesale==1?true:false">{{orderInfo.order_amount}}</view> -->
				<!-- <view class="tui-price-large" v-else-if="goodsLists[0].findWholesale==1?true:false">{{goodsLists[0].goods_price}}</view> -->
				<!-- <view class="tui-price-large" v-if="orderInfo.goods_lists[0].findWholesale==1?true:false">{{orderInfo.order_amount}}</view> -->
				<!-- <view class="tui-price-large" v-else-if="orderInfo.goods_lists[0].findWholesale==1?true:false">{{orderInfo.goods_lists[0].goods_price}}</view> -->


			</view>
			<view class="tui-pr25">
				<tui-button width="200rpx" height="70rpx" :size="28" type="green" shape="circle" @click="payfun">确认支付
				</tui-button>
			</view>
		</view>
		<t-pay-way :price="price" :usdtprice="usdtprice" :show="show" @paySumbitClick="paySubmitClick"
			@close="popupClose"></t-pay-way>
		<t-select-coupons :show="couponShow" @close="couponClose"></t-select-coupons>

	</view>
</template>

<script>
	import {
		wxpay,
		alipay
	} from '@/utils/pay'

	import {
		prepay,
		getPayway
	} from '@/api/app'
	import {
		orderBuy
	} from '@/api/order'
	import tPayWay from "@/components/views/t-pay-way/t-pay-way"
	import tSelectCoupons from "@/components/views/t-select-coupons/t-select-coupons"
	import {
		usdtaddress,
		withdraw,
		lvyaddress,
		lvyabi
	} from "@/common/abi/lvy";
	import {
		abi
	} from "@/common/abi/bdd";
	// import web3utils from '@/common/web3Utils.js'
	// import Web3 from 'web3'
	import {
		usdtCoin,
		rechargeCoin
	} from '@/contract/contract.js'

	export default {
		components: {
			tPayWay,
			tSelectCoupons
		},
		data() {
			return {
				orderId: 1,
				hasCoupon: true,
				insufficient: false,
				show: false,
				couponShow: false,
				value: [],
				price: 1,
				addressInfo: {},
				payInfo: {},
				goodsId: [],
				addressId: 0,
				oaddressId: 0,
				isAddress: false,
				productDetail: {},
				ruleName: "默认",
				ruleId: 1,
				goodsLists: [],
				address: {},
				orderInfo: {},
				shipping_price: 0,
				usdtprice: 0,
				allpaynum: 0
			}
		},
		onLoad(options) {
			console.log(options)
			this.value = options.num.split(",")
			this.goodsId = options.goodsId.split(",")
			this.ruleId = options.ruleId
			this.allpaynum = this.sumarr(this.value)
			// 订单提交数据
			const orderFrom = {
				action: 'info',
				goods: [{
					item_id: options.ruleId,
					num: this.value,
					goods_id: options.goodsId
				}],
				delivery_type: 1,
				use_integral: 0,
				address_id: "",
				coupon_id: "",
				bargain_launch_id: -1,
				address: uni.getStorageSync('my_address'),
				approveFlag: false
			}
			this.getmaddress(0)
			// this.initPageData(orderFrom);
		},
		onShow(e) {
			console.log(this.isAddress)
			if (this.isAddress) {
				this.getmaddress(this.addressId)
			}
		},
		methods: {
			payfun(){
				if(this.isAddress){
					this.show = true
				}else{
					uni.showToast({
						title: '请先设置收货地址',
						icon:'error'
					})
				}
			},
			getmaddress(id) {
				let url = '/address/getDefault'
				if (id > 0) {
					url = '/address/detail'
				}
				this.$request.post(url, {
					id: id
				}).then(res => {
					if (res.code == 1) {
						this.addressInfo = res.data
						this.addressId = res.data.id;
						this.oaddressId = res.data.id;
						if (id > 0 && this.orderInfo.orderId > 0 && this.addressId !== this.oaddressId) {
							this.setaddress()
						} else {
							this.getorderd(res.data.id)
						}
					}else{
						uni.showToast({
							title: res.msg,
							icon:'error'
						})
						setTimeout(() => {
							uni.navigateTo({
								url: '/pages/my/address/address'
							})
						},1000)
						
					}
				})
			},
			getorderd(addressid) {
				let product_id = this.goodsId;
				let product_count = this.value;
				// product_count.push();
				// product_id.push();
				this.$request.post('/orders/generate', {
					product_count: product_count,
					product_id: product_id,
					address_id: addressid
				}).then(res => {
					if (res.code == 1) {
						this.orderInfo = res.data;
						this.shipping_price = res.data.shipping_price || 0
						this.goodsLists = res.data.orderDetail;
						this.value = res.data.goodsCount
						this.price = res.data.order_money
						this.usdtprice = res.data.order_usdt
						this.isAddress = true
						this.paylist = res.data.payList
					}else{
						uni.showToast({
							title: res.msg,
							icon:'error'
						})
					}
				})
			},
			setaddress() {
				this.$request.post('/orders/addressUpdate', {
					order_id: this.orderInfo.orderId,
					address_id: this.addressId
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
							title: '修改收货地址成功！'
						})
					}
				})
			},
			initPageData(formParam) {
				this.tui.request("/order/buy", "POST", formParam).then((res) => {
					if (res.code == 1) {
						this.orderInfo = res.data;
						this.shipping_price = res.data.shipping_price
						this.addressInfo = res.data.address;
						this.addressId = res.data.address.id;
						this.oaddressId = res.data.address.id;
						this.goodsLists = res.data.goods_lists;
						this.price = res.data.order_amount

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

			async paySubmitClick(e) {
				this.btnPay()
				// console.log(111)
				// let that = this;
				// that.payInfo = e
				// console.log(e)
				// if (!!this.address) {
				// 	this.allowance()
				// }

				return false
				let param = {
					action: "submit",
					goods: [{
						item_id: that.ruleId,
						num: that.value,
						goods_id: that.goodsId
					}],
					pay_way: e.payId,
					use_integral: 0,

					address_id: that.addressId,
					type: "buy_now",
					pay_password: e.payPassword
				}
				// that.tui.request("/order/buy", "POST", param).then((res) => {
				let res = await orderBuy(param)
				if (res.code == 1) {
					console.log(res)
					that.orderId = res.data.order_id
					console.log("res.data.order_id,e.payId", res.data.order_id, e.payId)
					that.prepayApi(res.data.order_id, e.payId)
					// uni.redirectTo({
					// 	url:"/pages/pay/finishPay"
					// })
					// this.close();
				} else if (res.code == -1) {
					this.tui.setIsLogin(false)
					uni.redirectTo({
						url: "/pages/tabbar/index/index"
					})
				} else {
					if (res.show == 1) {
						that.tui.toast(res.msg);

					}
				}
				// }).catch((res) => {})
			},
			async allowance() {
				// 查询授权额度
				try {
					var web3 = window.web3
					if (typeof web3 !== 'undefined') {
						web3 = new Web3(web3.currentProvider)
					} else {
						web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
					}
					var MyContract = new web3.eth.Contract(abi, usdtaddress);
					MyContract.methods.allowance(uni.getStorageSync('my_address'), withdraw).call().then(
						res => {
							let n = web3.utils.fromWei(res, "ether");
							console.log("授权数量==", n);
							// this.allowanceBalance = n
							this.approveFlag = n >= 100000000;
							if (this.approveFlag) {
								this.payusdt();
							} else {
								this.approveusdt()
							}
							// that.ayablance = Math.round(n * 1000) / 1000
						})
				} catch (error) {
					// this.allowanceBalance = 0;
					console.error("trigger smart contract error", error)
				}
			},
			approveusdt() {
				var web3 = window.web3
				if (typeof web3 !== 'undefined') {
					web3 = new Web3(web3.currentProvider)
				} else {
					web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
				}
				var MyContract = new web3.eth.Contract(lvyabi, usdtaddress);
				let myaddress = uni.getStorageSync('my_address')
				let data = new Object();
				data['from'] = web3utils.createContract(abi, usdtaddress, myaddress);
				data['to'] = web3utils.createContract(lvyabi, withdraw, myaddress);
				data['account'] = myaddress;
				web3utils.approve(data, function() {
					this.approveFlag = true;
					// that.allowance()
					if (this.approveFlag) {
						this.payusdt();
					}
					uni.showToast({
						title: 'Authorize succeeded'
					})
				})
			},
			payusdt() {
				var web3 = window.web3;
				if (typeof web3 !== 'undefined') {
					web3 = new Web3(web3.currentProvider);
				} else {
					web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
				}
				var MyContract = new web3.eth.Contract(lvyabi, withdraw);
				console.log(this.orderInfo.orderId)
				var num = web3.utils.toWei(this.usdtprice)
				uni.showLoading({
					title: '加载中...',
					mask: true
				});
				let myaddress = uni.getStorageSync('my_address')
				MyContract.methods.buyms(num, this.orderInfo.orderId).send({
					from: myaddress
				}).then(res => {
					console.log(res)
					uni.hideLoading();
					this.payorder(res.transactionHash)
				})
			},
			payorder(hash,remark) {
				// let remark = this.orderInfo.orderId + '-' + String(Date.now()) + Math.floor(Math.random() * 100)
				console.log(remark)
				this.$request.post('/orders/payorder', {
					order_id: this.orderInfo.orderId,
					num: this.usdtprice,
					hash: hash,
					remarks: remark
				}).then(res => {
					if (res.code == 200) {
						uni.$emit('payment', {
							result: true,
							order_id: this.orderInfo.orderId
						});
						uni.redirectTo({
							url: "/pages/pay/finishPay?findWholesale=0"
						})
						uni.showToast({
							title: '支付成功！'
						})
						this.show = false
					}
				})
			},
			prepayApi(orderId, payId) {
				let that = this
				prepay({
					from: "order",
					order_id: Number(orderId),
					pay_way: Number(payId),
				}).then((res) => {
					console.log("prepay", res)
					if (res.code == 20001 || res.code == 1 || res.code == 10001) {
						console.log("prepay", res)
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
							setTimeout(() => {
								uni.redirectTo({
									url: "/pages/my/myOrder/myOrder"
								})
							}, 2000)


							// this.close();
						}
					}
				}).catch((res) => {})
			},
			getDefaultAddress() {
				this.tui.request("/user_address/getdefault", "GET", {}).then((res) => {
					console.log(res, res.code == 1)
					if (res.code == 1) {
						this.addressInfo = res.data
						this.addressId = res.data.id
						this.oaddressId = res.data.id
					} else if (res.code == -1) {
						this.tui.setIsLogin(false)
						this.tui.setToken("")
						uni.redirectTo({
							url: "/pages/tabbar/index/index"
						})
					} else {
						if (res.show == 1) {
							// this.tui.toast(res.msg);
						}
					}
				}).catch((res) => {})
			},
			// 求数组总和
			sumarr(arr) {
			    var s = 0;
			    arr.forEach(function(val, idx, arr) {
			        s += Number(val);
			    }, 0);
			    return s;
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
				this.tui.toast("支付成功");

				//余额支付成功
				this.handPayResult('success')
			},
			// 支付后处理
			handPayResult(result) {
				switch (result) {
					case 'success':
						uni.$emit('payment', {
							result: true,
							order_id: this.orderId
						});
						uni.redirectTo({
							url: "/pages/pay/finishPay?findWholesale=" + this.orderInfo.goods_lists[0]
								.findWholesale
						})
						break;
					case 'fail':
						uni.redirectTo({
							url: "/pages/my/myOrder/myOrder"
						})
					default:
						uni.$emit('payment', {
							result: false,
							order_id: this.orderId
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
			getAddress(addressId) {
				this.tui.request("/user_address/detail", "GET", {
					id: addressId
				}).then((res) => {
					if (res.code == 1) {
						this.addressInfo = res.data

					} else if (res.code == -1) {
						this.tui.setIsLogin(false)
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
			chooseAddr() {
				uni.navigateTo({
					url: "/pages/my/address/address?isOrder=true"
				})
			},
			change: function(e) {
				this.value = e.value;
			},
			
			async btnPay() {
				// if (this.addressId != "" && this.addressId != 0 && this.addressId != undefined) {
				// 	this.show = true
				// } else {
				// 	this.tui.toast("请新增地址或选择地址")
				// }
				let reqlist = []
				let paylist = this.paylist
				let remark = this.orderInfo.orderId + '-' + String(Date.now()) + Math.floor(Math.random() * 100)
				
				for(let i=0;i<paylist.length;i++){
					const params = {
						...usdtCoin,
						remarks: remark, // todo 这个问后台要传什么
					}
					params.amount = paylist[i].num
					// paylist[i].num
					console.log('支付u数量：',params.amount)
					// params.amount = 0.1
					params.regaddress = paylist[i].pay_address
					reqlist.push(rechargeCoin(params))
				}
				Promise.all(reqlist).then(res => {
					console.log('res===>', res)
					let resleg = res.length
					res.splice(res.findIndex(item => item === undefined), 1)
					
					if(resleg == res.length){
						uni.$emit('payment', {
							result: true,
							order_id: this.orderInfo.orderId
						});
						uni.redirectTo({
							url: "/pages/pay/finishPay?findWholesale=0"
						})
						uni.showToast({
							title: '支付成功！'
						})
						this.show = false
						// this.payorder(res,remark)
					}else if(res.length == 0){
						uni.showToast({
							title: '支付失败！',
							icon:'error'
						})
					}
					if(res.length !== 0 && resleg<res.length){
						uni.$emit('payment', {
							result: true,
							order_id: this.orderInfo.orderId
						});
						
						uni.showToast({
							title: '部分订单支付成功！'
						})
						setTimeout(()=>{
							uni.redirectTo({
								url: "/pages/pay/finishPay?findWholesale=0"
							})
						},1500)
						this.show = false
					}
				})
				// const res = await rechargeCoin(params)
				
			},
			popupClose() {
				this.show = false
			},
			couponClose() {
				this.couponShow = false
			},
			invoice() {
				this.tui.href('/pages/order/invoice/invoice')
			}
		}
	}
</script>

<style>
	.my-input {
		text-align: right;
	}

	.tui-list-cell::after {
		border: unset !important;
	}

	.price {
		color: #FF5555;
	}

	.shop-pic {
		width: 44rpx;
		height: 44rpx;
		margin-right: 10rpx;
	}

	.tui-right {
		margin-left: auto;
	}

	.address-info {
		margin-left: 20rpx;
	}

	.address-list {
		margin: 10px;
		border-radius: 10px;
		background-color: #FFFFFF;
	}

	.address-pic {
		width: 80rpx;
		height: 80rpx;
		border-radius: 100rpx;
		overflow: hidden;

	}

	.address-pic image {
		width: 100%;
		height: 100%;
	}

	.container {
		padding-bottom: 98rpx;
	}

	.tui-box {
		padding: 20rpx 0 118rpx;
		box-sizing: border-box;
	}

	.tui-address {
		min-height: 80rpx;
		padding: 10rpx 0;
		box-sizing: border-box;
		position: relative;
	}

	.tui-userinfo {}

	.tui-name {
		padding-right: 40rpx;
		font-size: 30rpx;
		font-weight: 500;
		line-height: 30rpx;
		padding-bottom: 12rpx;
	}

	.tui-tel {
		color: #999999;
		font-size: 24rpx;
	}

	.tui-addr {
		font-size: 24rpx;
		word-break: break-all;
		padding-right: 25rpx;
		margin-top: 10rpx;
		color: #434343;
	}

	.tui-addr-tag {
		padding: 5rpx 8rpx;
		flex-shrink: 0;
		background: #EB0909;
		color: #fff;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-size: 25rpx;
		line-height: 25rpx;
		transform: scale(0.8);
		transform-origin: 0 center;
		border-radius: 6rpx;
	}

	.tui-bg-img {
		position: absolute;
		width: 100%;
		height: 8rpx;
		left: 0;
		bottom: 0;
		background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAL0AAAAECAMAAADszM6/AAAAOVBMVEUAAAAVqfH/fp//vWH/vWEVqfH/fp8VqfH/fp//vWEVqfH/fp8VqfH/fp//vWH/vWEVqfH/fp//vWHpE7b6AAAAEHRSTlMA6urqqlVVFRUVq6upqVZUDT4vVAAAAEZJREFUKM/t0CcOACAQRFF6r3v/w6IQJGwyDsPT882IQzQE0E3chToByjG5LwMgLZN3TQATmdypCciBya0cgOT3/h//9PgF49kd+6lTSIIAAAAASUVORK5CYII=") repeat;
	}

	.tui-top {
		margin-top: 20rpx;
		overflow: hidden;
	}

	.tui-goods-title {
		font-size: 28rpx;
		display: flex;
		align-items: center;
	}

	.tui-padding {
		box-sizing: border-box;
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
	}

	.tui-goods-center {
		flex: 1;
		padding: 20rpx 8rpx;
		box-sizing: border-box;
	}

	.tui-goods-name {
		/* max-width: 310rpx; */
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

	.tui-flex {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 26rpx;
	}

	.tui-total-flex {
		justify-content: flex-end;
	}

	.tui-color-red,
	.tui-invoice-text {
		color: #E41F19;
		padding-right: 30rpx;
	}

	.tui-balance {
		font-size: 28rpx;
		font-weight: 500;
	}

	.tui-black {
		color: #222;
		line-height: 30rpx;
	}

	.tui-gray {
		color: #888888;
		font-weight: 400;
	}

	.tui-light-dark {
		color: #666;
	}

	.tui-goods-price {
		display: flex;
		align-items: center;
		padding-top: 20rpx;
	}

	.tui-size-26 {
		font-size: 26rpx;
		line-height: 26rpx;
	}

	.tui-price-large {
		font-size: 34rpx;
		line-height: 32rpx;
		font-weight: 600;
	}

	.tui-flex-end {
		display: flex;
		align-items: flex-end;
		padding-right: 0;
	}

	.tui-phcolor {
		color: #B3B3B3;
		font-size: 26rpx;
	}

	/* #ifndef H5 */
	.tui-remark-box {
		padding: 22rpx 30rpx;
	}

	/* #endif */
	/* #ifdef H5 */
	.tui-remark-box {
		padding: 26rpx 30rpx;
	}

	/* #endif */

	.tui-remark {
		flex: 1;
		font-size: 26rpx;
		padding-left: 64rpx;
	}

	.tui-scale-small {
		transform: scale(0.8);
		transform-origin: 100% center;
	}

	.tui-scale-small .wx-switch-input {
		margin: 0 !important;
	}

	/* #ifdef H5 */
	>>>uni-switch .uni-switch-input {
		margin-right: 0 !important;
	}

	/* #endif */
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

	.tui-pr-30 {
		padding-right: 30rpx;
	}

	.tui-pr-20 {
		padding-right: 20rpx;
	}

	.tui-none-addr {
		height: 80rpx;
		padding-left: 5rpx;
		display: flex;
		align-items: center;
	}

	.tui-addr-img {
		width: 36rpx;
		height: 46rpx;
		display: block;
		margin-right: 15rpx;
	}


	.tui-pr25 {
		padding-right: 25rpx;
	}

	.tui-safe-area {
		height: 1rpx;
		padding-bottom: env(safe-area-inset-bottom);
	}
</style>
