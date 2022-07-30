<template>
	<view>

		<!--header-->
		<view class="tui-mybg-box">
			<image src="/static/images/my/my_bg.png" class="tui-my-bg"></image>
			<view class="tui-header-center">
				<!-- <image :src="userInfo.avatar" class="tui-avatar"></image> -->
				<view class="tui-info" v-if="isLogin">
					<view class="tui-nickname" v-if="address!='' &&address!=undefined ">
										{{hideaddress(address)}}
									</view>
					<view class="tui-nickname">
						{{userInfo.nickname}}
						<image src="/static/images/my/reture.png" class="tui-img-vip"></image>
					</view>
				</view>
				<view class="tui-login" v-if="!isLogin" @tap="login">
					<text>登录/注册</text>
					<tui-icon name="arrowright" color="#fff" :size="36" unit="rpx"></tui-icon>
				</view>
			
			</view>

		</view>
		<view class="tui-content-box">
			<view class="tui-box tui-order-box">
				<!-- 		<tui-list-cell :arrow="true" padding="0" :lineLeft="false" @click="href(4)">
					<view class="tui-cell-header">
						<view class="tui-cell-title">我的订单</view>
						<view class="tui-cell-sub">查看全部订单</view>
					</view>
				</tui-list-cell> -->
				<view class="tui-order-list">
					<view class="tui-order-item" @click="href(4)">
						<view class="tui-icon-box">
							<image src="/static/images/my/all.png" class="tui-order-icon"></image>
							<!-- <view class="tui-badge tui-badge-red">1</view> -->
						</view>
						<view class="tui-order-text">全部</view>
					</view>
					<view class="tui-order-item" @click="href(4)">
						<view class="tui-icon-box">
							<image src="/static/images/my/pay.png" class="tui-order-icon"></image>
							<!-- <view class="tui-badge tui-badge-red">1</view> -->
						</view>
						<view class="tui-order-text">待付款</view>
					</view>
					<view class="tui-order-item" @click="href(4)">
						<view class="tui-icon-box">
							<image src="/static/images/my/deliver_goods.png" class="tui-order-icon"></image>
						</view>
						<view class="tui-order-text">待收货</view>
					</view>
					<view class="tui-order-item" @click="href(4)">
						<view class="tui-icon-box">
							<image src="/static/images/my/completed.png" class="tui-order-icon"></image>
							<!-- <view class="tui-badge tui-badge-red" v-if="false">12</view> -->
						</view>
						<view class="tui-order-text">已完成</view>
					</view>
					<!-- 	<view class="tui-order-item" @tap="href(10)">
						<view class="tui-icon-box">
							<image src="/static/images/mall/my/icon_tuikuan_3x.png" class="tui-order-icon"></image>
 -->
					<!-- <view class="tui-badge tui-badge-red">2</view> -->
					<!-- </view>
						<view class="tui-order-text">退款/售后</view>
					</view> -->
				</view>
			</view>

			<view class="tui-box tui-assets-box">
				<tui-list-cell :arrow="true" padding="0" :lineLeft="false" :unlined="true">
					<view class="tui-cell-header">
						<view class="header-left">
							<view class="left_line">
							</view>
							<view class="tui-cell-title">钱包</view>
						</view>
						<!-- <view class="tui-cell-sub" @click="href(3)">进入钱包</view> -->
					</view>
				</tui-list-cell>

				<view class="tui-order-list tui-assets-list">
					<view class="tui-order-item" @tap="gotowithdraw(1)">
						<view class="tui-assets-num">{{userInfo.amount}}</view>
						<view class="tui-assets-text">USDT数量</view>
					</view>
					<!-- 	<view class="tui-order-item m-l-80" @tap="href(3)">
						<view class="tui-assets-num">
							{{userInfo.invited_award_money}}
							<view class="tui-badge-dot"></view>
						</view>
						<view class="tui-assets-text">分享立得</view>
					</view> -->
					<!-- <view class="tui-order-item"> -->
					<!-- <view class="tui-assets-num">
							<text>7</text>
							<view class="tui-badge-dot"></view>
						</view> -->

					<view class="line-center"></view>
					<!-- </view> -->

					<view class="tui-order-item" @tap="gotowithdraw(2)">
						<view class="tui-assets-num">{{userInfo.coin_money}}</view>
						<view class="tui-assets-text">LVY数量</view>
					</view>
				</view>
			</view>

			<view class="tui-box tui-tool-box">
				<tui-list-cell padding="0" :lineLeft="false" :unlined="true">
					<view class="tui-cell-header">
						<view class="header-left">
							<view class="left_line">
							</view>
							<view class="tui-cell-title">常用工具</view>
						</view>
						<!-- <view class="tui-cell-title">常用工具</view> -->
						<!-- <view class="tui-cell-sub">查看更多</view> -->
					</view>
				</tui-list-cell>
				<view class="tui-order-list tui-flex-wrap">
					<!-- <view class="tui-tool-item" @click="href(12)">
						<view class="tui-icon-box">
							<image src="/static/images/my/lljl.png" class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">浏览记录</view>
					</view>
					<view class="tui-tool-item" @click="href(13)">
						<view class="tui-icon-box">
							<image src="/static/images/my/wdsc.png" class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">我的收藏</view>
					</view> -->
					<view class="tui-tool-item" @click="href(14)">
						<view class="tui-icon-box">
							<image src="/static/images/my/dzgl.png" class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">地址管理</view>
					</view>
					<view class="tui-tool-item" @click="href(7)">
						<view class="tui-icon-box">
							<image src="/static/images/my/fensiguanli.png" class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">我的团队</view>
					</view>
					<view class="tui-tool-item" @click="href(17)">
						<view class="tui-icon-box">
							<image src="/static/images/my/zijin.png" class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">释放记录</view>
					</view>
					<view class="tui-tool-item" @click="href(15)">
						<view class="tui-icon-box">
							<image src="/static/images/my/gywm.png" class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">关于蒲公英</view>
					</view>
					<!-- <view class="tui-tool-item" @click="href(9)">
						<view class="tui-icon-box">
							<image src="/static/images/my/bankcard.png" class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">我的银行卡</view>
					</view> -->
					<view class="tui-tool-item" @tap="openfxbox">
						<view class="tui-icon-box">
							<image src="/static/images/my/share.png" class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">推广</view>
					</view>
					<view class="tui-tool-item" @click="href(2)">
						<view class="tui-icon-box">
							<image src="/static/images/my/set.jpg" class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">设置</view>
					</view>

				</view>
			</view>

			<!--为你推荐-->
			<!-- <tui-divider :size="28" :bold="true" color="#333" width="50%">猜/你/喜/欢</tui-divider> -->
			<view class="tui-title__img">
				<image src="/static/images/index/cainixihuo.png" mode="widthFix"></image>
			</view>
			<view class="tui-product-list">
				<view class="tui-product-container" v-if="productList.length > 0">
					<block v-for="(item, index) in productList" :key="index" v-if="(index + 1) % 2 != 0">
						<!--商品列表-->
						<view class="tui-pro-item" hover-class="hover" :hover-start-time="150" :data-goodsId="item.product.id"
							@tap="detail">
							<image :src="item.product.main_picture_path " class="tui-pro-img" mode="widthFix" />
							<view class="tui-pro-content">
								<view class="tui-pro-tit">{{ item.product.name }}</view>
								<view class="pro-weight">
									{{item.tagging}}
								</view>
								<view class="pro-desc">
									{{item.remark}}
								</view>
								<view>
									<view class="tui-pro-price display-f">
										<view class="tui-size-sm">¥</view>
										<view class="tui-size-lm">{{item.product.price}}</view>
									</view>
								</view>
							</view>
						</view>
						<!--商品列表-->
						<!-- <template is="productItem" data="{{item,index:index}}" /> -->
					</block>
				</view>
				<view class="tui-product-container"  v-if="productList.length > 0">
					<block v-for="(item, index) in productList" :key="index" v-if="(index + 1) % 2 == 0">
						<!--商品列表-->
						<view class="tui-pro-item" hover-class="hover" :hover-start-time="150" :data-goodsId="item.product.id"
							@tap="detail">
							<image :src="item.product.main_picture_path " class="tui-pro-img" mode="widthFix" />
							<view class="tui-pro-content">
								<view class="tui-pro-tit">{{ item.product.name }}</view>
								<view class="pro-weight">
									{{item.tagging}}
								</view>
								<view class="pro-desc">
									{{item.remark}}
								</view>
								<view>
									<view class="tui-pro-price display-f">
										<view class="tui-size-sm">¥</view>
										<view class="tui-size-lm">{{item.product.price}}</view>
									</view>
								</view>
							</view>
						</view>
					</block>
				</view>
			</view>
			<tui-bottom-popup :zIndex="999" :maskZIndex="998" radius backgroundColor="transparent"  :show="fxpopupShow" @close="fxpopup">
				<view class="fxpopup">
					<view class="title">
						分享二维码
					</view>
					<view style="line-height: 60rpx;">
						btc.spiritstones.cn/#/?code={{userInfo.code}}
					</view>
					<view class="subbtn" @tap="copyurl">
						复制邀请链接
					</view>
				</view>
			</tui-bottom-popup>
			<!--加载loadding-->
			<tui-loadmore v-if="loadding" :index="3" type="red"></tui-loadmore>
		</view>
	</view>
</template>

<script>
	import {
		getHome,
	} from '@/api/store';
	import {
		getUser,
	} from '@/api/user';

	import {
		getWxCode,
		wxMnpLogin
	} from '@/utils/login.js'
	import {
		isWeixinClient
	} from '@/utils/tools.js'
	import wechath5 from '@/utils/wechath5'
	export default {
		onLoad: function(options) {
			let obj = {};
			// #ifdef MP-WEIXIN
			obj = wx.getMenuButtonBoundingClientRect();
			// #endif
			// #ifdef MP-BAIDU
			obj = swan.getMenuButtonBoundingClientRect();
			// #endif
			// #ifdef MP-ALIPAY
			my.hideAddToDesktopMenu();
			// #endif

			uni.getSystemInfo({
				success: res => {
					this.width = obj.left || res.windowWidth;
					this.height = obj.top ? obj.top + obj.height + 8 : res.statusBarHeight + 44;
					this.top = obj.top ? obj.top + (obj.height - 32) / 2 : res.statusBarHeight + 6;
					this.scrollH = res.windowWidth * 0.6;
				}
			});
		},
		data() {
			return {
				isLogin: false,
				webURL: 'https://www.thorui.cn/wx',
				top: 0, //标题图标距离顶部距离
				opacity: 0,
				scrollTop: 0.5,
				userInfo: {
					avatar: "/static/images/my/login_user.png",
					user_money: "0.00",
					invited_award_money: "0.00",
					nickname: "hello"
				},
				myWalletData: {
					user_money: "0.00"
				},
				productList: [

				],
				pageIndex: 1,
				loadding: false,
				pullUpOn: true,
				wxCode: "",
				address: uni.getStorageSync('my_address'),
				fxpopupShow: false
			};
		},
		onLoad(e) {
			// let wsf_islogin=this.tui.isLogin();
			// this.isLogin=wsf_islogin;
			// if(wsf_islogin){
			// 	this.nickname=this.tui.getNickname();
			// }
			// #ifdef H5
			    let local = location.href; 


			var code = this.getParam(local,'code');
			console.log(code);
			console.log('mr-cs');
			this.wxCode = e.code ? e.code : code
			console.log("onload==",e.code);
			console.log("cs==",this.wxCode);
				// #endif
		},
		onShow() {
			this.isLogin =  this.tui.isLogin();
			this.getUserInfo()
			this.getGoodsList()

		},
		methods: {
			  getParam(path, name) {
			
			        var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
			
			        if (reg.test(path))
			
			        return unescape(RegExp.$2.replace(/\+/g, " "));
			
			        return "";
			
			        },
			wxLogin() {
				// wxMnpLogin();
				// uni.getUserInfo({
				//                  success: (res) => {
				//                      this.userInfo = res.userInfo;
				//                      console.log(this.userInfo);
				//                  },
				//                  fail: () => {
				//                      console.log("未授权");
				//                  }
				//              })
			},
			async getUserInfo() {
				// this.tui.request("/user/center", "GET", {}).then((res) => {

				let res = await getUser();
				if (res.code == 1) {
					this.userInfo = res.data
					// console.log(this.tui.getToken())
					uni.setStorageSync("wsf_nickname", res.data.nickname)
					uni.setStorageSync("wsf_createTime", res.data.create_time_string)
					this.isLogin = true;
					// #ifdef MP-WEIXIN
					console.log("登录 微信===",res.data.openid == '' || res.data.openid == null)
					if (res.data.openid == '' || res.data.openid == null) {
						wxMnpLogin(res.data.id)
					}
					// #endif

					// #ifdef H5
					let isWx = isWeixinClient()
					console.log("isWx", isWx, this.wxCode)
					if (isWx) {
						console.log("res.data.oa_openid ", res.data.oa_openid ,(res.data.oa_openid == '' || res.data.oa_openid == null))
						if (res.data.oa_openid == '' || res.data.oa_openid == null) {
							// const {
							// 	code
							// } = option
							//拦截打印
							if (this.wxCode) {
								const data = await wechath5.authLogin(this.wxCode, res.data.id)
									uni.setStorageSync("wsf_token", data.token)
									uni.setStorageSync("wsf_isLogin", true)
										this.isLogin=true
							} else {
								wechath5.getWxUrl(res.data.id)
							}
						}
					}
					// #endif

				} else if (res.code == -1) {
					this.userInfo.avatar="/static/images/my/login_user.png";
					this.tui.setIsLogin(false)
					this.isLogin = false;
				} else {
					if (res.show == 1) {
						this.tui.toast(res.msg);

					}
				}
				// }).catch((res) => {})
			},
			async getGoodsList() {
				const res = await getHome({
					type: 3
				});
				if (res.code == 1) {
					this.productList = res.data
					// this.newProduct = res.data.new_goods
				} else {
					if (res.show == 1) {
						this.tui.toast(res.msg);

					}
				}

			},
			getMyWallet() {
				this.tui.request("/user/myWallet", "GET", {}).then((res) => {
					if (res.code == 1) {
						this.myWalletData = res.data
					} else {
						if (res.show == 1) {
							this.tui.toast(res.msg);

						}
					}
				}).catch((res) => {})
			},
			hideaddress(addr){
				return addr.slice(0, 6) + '***' + addr.slice(-3)
			},
			copyurl(){
				this.$tools.h5Copy('btc.spiritstones.cn/#/?code=' + this.userInfo.code)
			},
			openfxbox(){
				this.$forceUpdate();
				this.fxpopupShow = true
				// this.$set(this.fxpopupShow,true)
				console.log(this.fxpopupShow)
			},
			href(page) {
				//未登录状态下应跳转至登录页面，此处未作处理
				let url = '';
				switch (page) {
					case 2:
						url = '/pages/my/set/set';
						break;
					case 3:
						// url = '/pages/my/userInfo/userInfo';
						url = '/pages/my/wallet/wallet';
						break;
					case 4:
						url = '/pages/my/myOrder/myOrder';
						break;
					case 6:
						url = "/pages/my/warehouse/warehouse"
						break
					case 7:
						url = '/pages/my/fen/fen';
						break;
					case 8:
						url = '/pages/my/service-shop/service-shop';
						break;
					case 9:
						url = '/pages/my/card/card';
						break;
					case 10:
						url = '/pages/my/refundList/refundList';
						break;
					case 11:
						url = '/pages/my/wallet/wallet';
						break;
					case 12:
						url = '/pages/my/collect-merchant/collect-merchant?type=0';
						break;
					case 13:
						url = '/pages/my/collect-merchant/collect-merchant?type=1';
						break;
					case 14:
						url = '/pages/my/address/address';
						break;
					case 15:
						url = '/pages/my/service-agreement/service-agreement?type=1';
						break;
					case 16:
						url = '/pages/tabbar/customer/customer';
						break;
					case 17:
						url = '/pages/my/releaseinfo/releaseinfo';
						break;
					default:
						break;
				}
				console.log("this.tui.isLogin()", this.tui.isLogin(), url)
				if (url) {
					this.tui.href(url);
					return false
					if (!this.tui.isLogin()) {
						// this.isLogin = true;
						// this.tui.toast('模拟登录成功~')
						url = "/pages/my/login-mobile/login-mobile"
						this.tui.href(url);
					} else {
					}
				} else {
					this.tui.toast('功能尚未完善~');
				}
				
			},
			detail: function(e) {
				uni.navigateTo({
					url: '/pages/index/productDetail/productDetail?id=' + e.currentTarget.dataset.goodsid
				});
			},
			fxpopup(e){
				console.log(e)
				this.fxpopupShow = false
			},
			initNavigation(e) {
				this.opacity = e.opacity;
				this.top = e.top;
			},
			opacityChange(e) {
				this.opacity = e.opacity;
			},
			gotowithdraw(type){
				uni.navigateTo({
					url: '/pages/my/withdraw/withdraw' + '?type=' + type
				});
			},
			login() {
				// this.isLogin = true
				// this.tui.toast('模拟登录成功~')
				uni.navigateTo({
					url: '/pages/tabbar/index/index'
				});
				return false
				uni.navigateTo({
					url: '/pages/my/login-mobile/login-mobile'
				});
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onPullDownRefresh() {
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 200);
		},
		onReachBottom: function() {
			if (!this.pullUpOn) return;
			this.loadding = true;
			if (this.pageIndex == 4) {
				this.loadding = false;
				this.pullUpOn = false;
			} else {
				let loadData = JSON.parse(JSON.stringify(this.productList));
				loadData = loadData.splice(0, 10);
				if (this.pageIndex == 1) {
					loadData = loadData.reverse();
				}
				// this.productList = this.productList.concat(loadData);
				this.pageIndex = this.pageIndex + 1;
				this.loadding = false;
			}
		}
	};
</script>

<style lang="scss">
	.fxpopup{
		width: 100%;
		height: 100%;
		border-radius: 32rpx 32rpx 0 0;
		background-color: #ffffff;
		padding: 30rpx;
		box-sizing: border-box;
		.title{
			text-align: center;
			line-height: 50rpx;
			color: #000000;
			font-size: 36rpx;
			font-weight: 500;
		}
		.subbtn{
			width: 100%;
			height: 72rpx;
			border-radius: 40rpx;
			background-color: #F73037;
			display: flex;
			color: #ffffff;
			font-size: 26rpx;
			justify-content: center;
			align-items: center;
			margin-top: 150rpx;
			margin-bottom: 100rpx;
		}
	}
	.tui-header-box {
		width: 100%;
		padding: 0 30rpx 0 20rpx;
		box-sizing: border-box;
		position: fixed;
		top: 0;
		left: 0;
		/* display: flex; */
		align-items: center;
		/* justify-content: flex-end; */
		height: 32px;
		transform: translateZ(0);
		z-index: 9999;
	}

	/* #ifndef MP */
	.tui-header-icon {
		min-width: 120rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	/* #endif */
	/* #ifdef MP */
	.tui-set-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	/* #endif */
	.tui-icon-box {
		position: relative;
	}

	.tui-icon-setup {
		margin-right: 8rpx;
	}

	.tui-badge {
		position: absolute;
		font-size: 24rpx;
		height: 32rpx;
		min-width: 20rpx;
		padding: 0 6rpx;
		border-radius: 40rpx;
		right: 10rpx;
		top: -5rpx;
		transform: scale(0.8) translateX(60%);
		transform-origin: center center;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
	}

	.tui-badge-red {
		background: #f74d54;
		color: #fff;
	}

	.tui-badge-white {
		background: #fff;
		color: #f74d54;
	}

	.tui-badge-dot {
		position: absolute;
		height: 12rpx;
		width: 12rpx;
		border-radius: 50%;
		right: -12rpx;
		top: 0;
		background: #f74d54;
	}

	.tui-mybg-box {
		width: 100%;
		height: 344rpx;
		position: relative;
	}

	.tui-my-bg {
		width: 100%;
		height: 364rpx;
		display: block;
	}

	.tui-header-center {
		position: absolute;
		width: 100%;
		height: 128rpx;
		left: 0;
		top: 120rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}

	.tui-avatar {
		flex-shrink: 0;
		width: 128rpx;
		height: 128rpx;
		display: block;
	}

	.tui-info {
		width: 60%;
		padding-left: 30rpx;
	}

	.tui-login {
		width: 60%;
		padding-left: 30rpx;
		font-size: 32rpx;
		line-height: 32rpx;
		color: #fff;
		display: flex;
		align-items: center;
	}

	.tui-nickname {
		font-size: 38rpx;
		font-weight: 500;
		color: #fff;
		display: flex;
		align-items: center;
	}

	.tui-img-vip {
		width: 18rpx;
		height: 24rpx;
		margin-left: 18rpx;
	}

	.tui-explain {
		width: 80%;
		font-size: 24rpx;
		font-weight: 400;
		color: #fff;
		opacity: 0.75;
		padding-top: 8rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.tui-btn-edit {
		flex-shrink: 0;
		padding-right: 22rpx;
	}

	.tui-header-btm {
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;
		position: absolute;
		left: 0;
		top: 280rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #fff;
	}

	.tui-btm-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.tui-btm-num {
		font-size: 32rpx;
		font-weight: 600;
		position: relative;
	}

	.tui-btm-text {
		font-size: 24rpx;
		opacity: 0.85;
		padding-top: 4rpx;
	}

	.tui-content-box {
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;
		position: relative;
		top: -72rpx;
		z-index: 10;
	}

	.tui-box {
		width: 100%;
		background: #fff;
		box-shadow: 0 3rpx 20rpx rgba(183, 183, 183, 0.1);
		border-radius: 10rpx;
		overflow: hidden;
	}

	.tui-order-box {
		height: 148rpx;
	}

	.tui-cell-header {
		width: 100%;
		height: 74rpx;
		padding: 0 26rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.tui-cell-title {
		font-size: 30rpx;
		line-height: 30rpx;
		font-weight: 600;
		color: #333;
	}

	.tui-cell-sub {
		font-size: 26rpx;
		font-weight: 400;
		color: #999;
		padding-right: 28rpx;
	}

	.tui-order-list {
		width: 100%;

		height: 134rpx;
		padding: 0 20rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		margin-top: 10rpx;
	}

	.tui-order-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.tui-order-text,
	.tui-tool-text {
		font-size: 26rpx;
		font-weight: 400;
		color: #666;
		padding-top: 10rpx;
	}

	.tui-tool-text {
		padding-top: 20rpx;
		font-size: 26rpx;
	}

	.tui-order-icon {
		width: 56rpx;
		height: 56rpx;
		display: block;
	}

	.tui-assets-box {
		height: 228rpx;
		margin-top: 20rpx;
		padding-top: 20rpx;
	}

	.tui-assets-list {
		height: 84rpx;
	}

	.tui-assets-num {
		font-size: 40rpx;
		font-weight: 500;
		color: #FF5555;
		position: relative;
		margin: 20rpx 0rpx;
		padding-top: 30rpx;
	}

	.tui-assets-text {
		font-size: 24rpx;
		font-weight: 400;
		color: #666;
		padding-top: 6rpx;
	}

	.tui-tool-box {
		margin-top: 20rpx;
	}

	.tui-flex-wrap {
		flex-wrap: wrap;
		height: auto;
		padding-bottom: 30rpx;
	}

	.tui-tool-item {
		width: 25%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding-top: 30rpx;
	}

	.tui-tool-icon {
		width: 64rpx;
		height: 64rpx;
		display: block;
	}

	.tui-badge-icon {
		width: 66rpx;
		height: 30rpx;
		position: absolute;
		right: 0;
		transform: translateX(88%);
		top: -15rpx;
	}

	/*为你推荐*/
	.tui-product-list {
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		flex-wrap: wrap;
		box-sizing: border-box;
	}

	.tui-product-container {
		flex: 1;
		margin-right: 2%;
	}

	.tui-product-container:last-child {
		margin-right: 0;
	}

	.tui-pro-item {
		width: 100%;
		margin-bottom: 4%;
		background: #fff;
		box-sizing: border-box;
		border-radius: 12rpx;
		overflow: hidden;
	}

	.tui-pro-img {
		width: 100%;
		display: block;
	}

	.tui-pro-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 20rpx;
	}

	.tui-pro-tit {
		color: #2e2e2e;
		font-size: 26rpx;
		line-height: 32rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.tui-pro-price {
		padding-top: 18rpx;
		align-items: flex-end;
		padding: 10rpx 0 8rpx;
		box-sizing: border-box;
		line-height: 28rpx;
		color: #eb0909;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.tui-sale-price {
		font-size: 34rpx;
		font-weight: 500;
		color: #F73037;
	}

	.tui-factory-price {
		font-size: 24rpx;
		color: #a0a0a0;
		text-decoration: line-through;
		padding-left: 12rpx;
	}

	.tui-pro-pay {
		padding-top: 10rpx;
		font-size: 24rpx;
		color: #656565;
	}

	.header-left {
		display: flex;
	}

	.left_line {
		height: 30rpx;
		width: 8rpx;
		background-color: #F73037;
		margin-right: 14rpx;
	}

	.tui-title__img {
		width: 100%;
		padding: 40rpx 0rpx 30rpx;
		display: flex;
		justify-content: center;
	}

	.tui-title__img image {
		width: 259rpx;
		height: 30rpx;
	}

	.pro-weight {
		margin-bottom: 6rpx;
		margin-top: 6rpx;
		font-size: 26rpx;
		color: #333333;
	}

	.pro-desc {
		margin-bottom: 6rpx;
		font-size: 26rpx;
		color: #999999;
	}

	.tui-size-sm {
		font-size: 32rpx;
		line-height: 24rpx;
		transform: scale(0.8);
		transform-origin: 0 50%;
	}

	.tui-size-lm {
		margin-left: 4rpx;
		font-size: 44rpx;
		line-height: 30rpx;
		transform: scale(0.8);
		transform-origin: 0 50%;
	}

	.line-center {
		width: 2rpx;
		height: 60rpx;
		background-color: #E6E6E6;
		margin-left: 70rpx;
		margin-top: 60rpx;
	}

	.m-l-80 {
		margin-left: 80rpx;
	}

	.order-icon {
		margin: 20rpx 0rpx;
		padding-top: 30rpx;
	}

	.order-icon image {
		width: 48rpx;
		height: 32rpx;
	}

	.header-box {
		/* #ifdef H5 */
		// padding: 0 20rpx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		padding: 20rpx 20rpx;
		/* #endif */


	}

	.codeSet {
		width: 50rpx;
		height: 50rpx;
		/* #ifdef H5 */
		margin: 20rpx 10rpx;
		left: 12px;
		/* #endif */

		/* #ifdef MP-WEIXIN */
		margin: 60rpx 10rpx 0 10rpx;
		/* #endif */
	}
</style>
