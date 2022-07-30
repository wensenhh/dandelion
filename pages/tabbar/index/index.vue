<template>
	<view class="container">
		<view class="status_bar">
		          <!-- 这里是状态栏 -->
		 </view>
		<view class="header-box display-f">
			<!-- <image class="codeSet" src="/static/images/saoma.png" mode="" @click="$comment.scanCode()"></image> -->
			<image class="codeSet" src="/static/images/logo.png" mode=""></image>
		</view>

		<!--header-->
		<view class="tui-header" :style="{opacity:opacity}">

			<view class="tui-rolling-search">
				<view class="tui-searchbox tui-search-mr" :style="{ marginTop: inputTop + 'px' }">

					<input type="text" v-model="searchValue" placeholder="搜索商品标题" placeholder-style="font-size:28rpx" />

					<icon class="tui-right" type="search" :size="16" @tap="search" color="#999"></icon>
				</view>

			</view>
		</view>
		<!--header-->
		<view class="tui-header-banner">
			<view class="tui-hot-search">
				<view class="header-left left-tab">
					
			<!-- 	<scroll-view scroll-x class="scroll-header">
						<view class="color-fff ">首页</view>
						<view class="color-fff m-l-50" v-for="(item,index) in classifyTabbar"  @click="toClassify" :key="index" >
							{{ item.name }}</view>
				</scroll-view> -->
				
				<tui-tab-home :tabs="classifyTabbar" color="#ffffff" selectedColor="#ffffff" sliderBgColor="#F73037" backgroundColor="#F73037" scroll @change="toClassify" class=""></tui-tab-home>
				
					<!-- <view class="color-fff m-l-50" @tap="toClassify">咖啡美酒</view> -->
					<!-- <view class="color-fff m-l-50" @tap="toClassify">速溶咖啡</view> -->
				</view>
				<view class="heder-right">
					<image src="/static/images/index/suosu.png" class="header-search-img" mode="scaleToFill" />
				</view>

			</view>
			<view class="tui-banner-bg">
				<view class="tui-primary-bg tui-route-left"></view>
				<view class="tui-primary-bg tui-route-right"></view>
				<!--banner-->
				<view class="tui-banner-box">
					<swiper :indicator-dots="true" :autoplay="true" :interval="5000" :duration="150"
						class="tui-banner-swiper" :circular="true" indicator-color="rgba(255, 255, 255, 0.8)"
						indicator-active-color="#fff">
						<swiper-item v-for="(item, index) in banner" :key="index" :data-index='index'
							@tap.stop="bannerDetail">
							<image :src="item.icon_url" class="tui-slide-image" mode="scaleToFill" />
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		<view class="tui-product-category ">
			<view class="tui-category-item" v-for="(item, index) in category" :key="index" :data-key="item.name"
				@click="openPage(item.type)" :data-link="item.link">
				<image :src="item.icon_url" class="tui-catg" moegory-imde="scaleToFill"></image>
				<view class="tui-category-name">{{ item.name }}</view>
			</view>
		</view>

		<view class="tui-product-box">
			<!--农民优选-->
			<view class="tui-block__box ">
				<view class="tui-group-name">
					<view class="tui-seckill__box" style="color: #F73037;">
						爆款推荐
						<!-- <image src="/static/images/index/youxuan.png" class="tui-seckill__img" mode="widthFix"></image> -->
					</view>
				</view>
				<scroll-view scroll-x>
					<view class="tui-goods__list">
						<view class="tui-goods__item" @tap="detail" v-for="(item, index) in newProduct" :key="index"
							:data-goodsId="item.product ? item.product.id : 0">
							<view class="tui-goods__imgbox">
								<image v-if="item.product" :src="item.product.main_picture_path" mode="widthFix" class="tui-goods__img">
								</image>
							</view>
							<view class="tui-pri__box">
								<view class="tui-sale-pri">
									<view class="tui-size-sm">¥</view>
									<view class="tui-size-lm" v-if="item.product">{{item.product.price}}</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>


		</view>

		<view class="tui-product-box">
			<view class="tui-title__img">
				<image src="/static/images/index/cainixihuo.png" mode="widthFix"></image>
			</view>
			<view class="tui-product-list">
				<view class="tui-product-container">
					<block v-for="(item, index) in productList" :key="index" v-if="(index + 1) % 2 != 0">
						<!--商品列表-->
						<view class="tui-pro-item" hover-class="hover" :hover-start-time="150" @tap="detail"
							:data-goodsId="item.id">
							<image :src="item.main_picture_path" class="tui-pro-img" mode="widthFix" />
							<view class="tui-pro-content">
								<view class="tui-pro-tit">{{ item.name }}</view>
								<view class="pro-weight">
									{{item.tagging}}
								</view>
								<view class="pro-desc">
									{{item.remark}}
								</view>
								<view>
									<view class="tui-sale-pri">
										<view class="tui-size-sm">¥</view>
										<view class="tui-size-lm">{{item.price}}</view>
									</view>
								</view>
							</view>
						</view>
						<!--商品列表-->
					</block>
				</view>
				<view class="tui-product-container">
					<block v-for="(item, index) in productList" :key="index" v-if="(index + 1) % 2 == 0">
						<view class="tui-pro-item" hover-class="hover" :hover-start-time="150" @tap="detail"
							:data-goodsId="item.id">
							<image :src="item.main_picture_path " class="tui-pro-img" mode="widthFix" />
							<view class="tui-pro-content">
								<view class="tui-pro-tit">{{ item.name }}</view>
								<view class="pro-weight">
									{{item.tagging}}
								</view>
								<view class="pro-desc">
									{{item.remark}}
									<!-- 口感清爽而且清脆多汁 -->
								</view>
								<view>
									<view class="tui-sale-pri">
										<view class="tui-size-sm">¥</view>
										<view class="tui-size-lm">{{item.price}}</view>
									</view>
								</view>
							</view>
						</view>
					</block>
				</view>
			</view>
		</view>
		<tui-bottom-popup :zIndex="999" :maskZIndex="998" radius backgroundColor="transparent"  :show="pwdpopupShow" @close="pwdpopup">
			<view class="pwdpopup">
				<view class="title">
					提示
				</view>
				<view class="subtitle">
					您还未设置资金安全密码,请尽快设置完成
				</view>
				<tui-input type="password" v-model="zjpwd" :value="zjpwd" :marginTop="24" borderTop trim password :lineLeft="false" placeholder="请输入您的资金安全密码"></tui-input>
				<tui-input type="password" v-model="twozjpwd" :value="twozjpwd" :marginTop="24" borderTop trim password :lineLeft="false" placeholder="请确认您的资金安全密码"></tui-input>
				<view class="tips">
					注意:资金安全密码近可设置一次,且不可更
				</view>
				<view class="subbtn" @tap="submitpwd">
					确认设置
				</view>
			</view>
		</tui-bottom-popup>
		<!--加载loadding-->
		<tui-loadmore v-if="loadding" :index="3" type="red"></tui-loadmore>
		<!-- <tui-nomore v-if="!pullUpOn"></tui-nomore> -->
		<!--加载loadding-->
		<view class="tui-safearea-bottom"></view>
	</view>
</template>
<script>
	import {
		loadingFun
	} from '@/utils/tools'
	import {
		getCatrgory,
		getGoodsSearch,
		getAdList,
		getHome,
		getMenu,
	} from '@/api/store';
	import {
		loadingType
	} from '@/utils/type';
	export default {
		data() {
			return {
				inputTop: 0, //搜索框距离顶部距离
				hotSearch: ['休闲零食', '自热火锅', '小冰箱迷你'],
				banner: ['lunbo1.png', 'lunbo1.png'],
				top: 0, //标题图标距离顶部距离
				opacity: 0,
				scrollTop: 0.5,
				searchValue: '',
				category: [{
					name: '会员区',
					icon_url: '../../../static/images/index/it1.png',
					type: 1
				},{
					name: '福利区',
					icon_url: '../../../static/images/index/it2.png',
					type: 2
				},{
					name: '普消区',
					icon_url: '../../../static/images/index/it3.png',
					type: 3
				},{
					name: '活动专区',
					icon_url: '../../../static/images/index/it4.png',
					type: 4
				}],
				classifyTabbar: [],
				seckillGoods: [],
				newProduct: [],
				productList: [],
				pageIndex: 1,
				loadding: false,
				pullUpOn: true,
				opacity: 1,
				parentName: '',
				address: '',
				Inval: null,
				pwdpopupShow: false,
				zjpwd: '',
				twozjpwd: ''
			};
		},
		onLoad() {
			window.ethereum.on('accountsChanged', (accounts) => {
				// 如果返回数组中的第一个帐户不是您期望的帐户，您应该通知用户！将来，accounts 数组可能包含多个帐户。但是，数组中的第一个帐户将继续被视为用户的“选定”帐户。
				this.getAddress();
			})
			var q = document.URL.split('?code=')[1];
			if (q != undefined) {
				// q = q.split('code=');
				this.parentName = q;
				console.log(q)
			}
			this.getAddress();
			// this.getMenuList();
			// this.getGoodsList();
			// this.getAdListApi();
			// this.getClassifyApi();
		},
		methods: {
			async getClassifyApi() {
				const result = await getCatrgory({
					client: 1
				})
				let {
					code,
					data,
					show,
					msg
				} = result;
				if (code == 1) {
					let tabbar = []
					for(let i=0;i<data.length;i++){
						tabbar.push(data[i].name)
					}
					this.classifyTabbar = tabbar
				} else {
					if (show == 1) {
						this.tui.toast(msg);
					}
				}
			},
			async getMenuList() {
				const res = await getMenu({
					type: 1
				});
				if (res.code == 1) {
					this.category = res.data
				} else {
					if (res.show == 1) {
						this.tui.toast(res.msg);
					}
				}

			},
			async getAdListApi() {
				const res = await getAdList({
					client: 1,
					pid: 1
				});
				if (res.code == 1) {
					this.banner = res.data
				} else {
					if (res.show == 1) {
						this.tui.toast(res.msg);
					}
				}

			},
			async getGoodsList() {
				const res = await getHome();
				if (res.code == 1) {
					this.productList = res.data.host_goods
					this.newProduct = res.data.new_goods
				} else {
					if (res.show == 1) {
						this.tui.toast(res.msg);

					}
				}

			},
			submitpwd(){
				console.log(this.zjpwd.length)
				if(this.zjpwd.length !== 6 || this.twozjpwd.length !== 6){
					uni.showToast({
						title: '请输入六位的资金密码',
						icon:'error',
						
					})
					return false
				}
				if(this.zjpwd !== this.twozjpwd){
					uni.showToast({
						title: '资金密码不一致，请重新输入',
						icon:'error'
					})
					return false
				}
				this.$request.post('/auth/updatePassword', {
					password: this.zjpwd,
					re_password: this.twozjpwd
				}).then(res => {
					if(res.code == 200){
						uni.showToast({
							title: '设置成功！',
						})
						this.pwdpopupShow = false
					}
				})
			},
			getindexall(){
				this.$request.post('/index/index').then(res => {
					let temptab = res.data.cateList
					console.log(temptab)
					let tablist = []
					temptab.forEach((item) => {
						tablist.push(item.name)
					})
					this.banner = res.data.bannerList
					this.newProduct = res.data.recordGoods
					this.classifyTabbar = tablist
					this.productList = res.data.goodsList
				})
			},
			getAddress() {
				uni.showLoading({
					mask:true
				})
				this.Inval = setInterval(async () => {
					if (window.ethereum) {
					        window.ethereum.enable().then((res) => {
					          console.log("当前钱包地址:" + res[0]);
							  this.address = res[0]
					        });
					      } else {
					        uni.showToast({
					        	title: '请安装MetaMask钱包'
					        })
					      }
					if (!!this.address) {
						uni.setStorageSync('my_address', this.address);
						window.clearInterval(this.Inval);
						console.log(this.parentName)
						this.register(this.address);
						// this.getParentName()
						// this.getBddUsing();
					}
				}, 1000);
			},
			register(phoneEmail) {
				this.$request.post("/auth/login", {
					name: phoneEmail,
					code: this.parentName
				}).then(res => {
					if(res.code == 1){
						uni.setStorageSync('my_token', res.data.token)
						uni.setStorageSync("wsf_isLogin", true)
						this.checkpwd()
						this.getindexall();
					}else{
						uni.showToast({
							title: res.msg,
							icon:'error'
						})
					}
					uni.hideLoading()
				})
			
			},
			checkpwd(){
				this.$request.post("/auth/checkPawwrord").then(res => {
					if(res.code == 1){
						if(res.data.pwd_status == 0){
							this.pwdpopupShow = true
						}
					}
				})
			},
			mamberCodeOpen() {
				let that = this
				console.log("this.tui.isLogin()", that.tui.isLogin())
				if (that.tui.isLogin()) {
					uni.navigateTo({
						url: '/pages/my/memberCode/memberCode'
					})
				} else {

					uni.navigateTo({
						url: "/pages/tabbar/index/index"
					})
				}

			},
			pwdpopup(e){
				console.log(e)
			},
			detail(e) {
				uni.navigateTo({
					url: '/pages/index/productDetail/productDetail?id=' + e.currentTarget.dataset.goodsid
				});
			},
			bannerDetail(e) {
				let bannerInfo = this.banner[e.currentTarget.dataset.index]
				if (bannerInfo.link_type == 2) {
					let url = bannerInfo.link + "?id=" + bannerInfo.params.id
					console.log(url)
					uni.navigateTo({
						url: url
					});
				} else {
					uni.navigateTo({
						url: bannerInfo.link
					});
				}
			},
			coupon() {
				uni.navigateTo({
					url: '/pages/index/coupon/coupon'
				});
			},
			classify: function() {
				uni.switchTab({
					url: '../classify/classify'
				});
			},
			openPage(type) {
				uni.navigateTo({
					url: '/pages/index/searchProductList/searchProductList?type=' + type
				});
				return false
				if (data.link_type == 1) {
					uni.navigateTo({
						url: data.link
					})
				} else {
					this.tui.toast("正在开发中")
				}
			},
			// more: function(e) {
			// 	let key = e.currentTarget.dataset.key || '';
			// 	let classifyname = e.currentTarget.dataset.classifyname
			// 	console.log(e.currentTarget.dataset)
			// 	if(classifyname!=""){
			// 		if(classifyname=="video"){
			// 			uni.navigateTo({
			// 				url: '/pages/index/videoList/videoList'
			// 			});
			// 		}else{
			// 	uni.navigateTo({
			// 		url: '/pages/index/productList/productList?searchKey=' + key + '&classifyname=' +
			// 			classifyname
			// 	});
			// 	}
			// 	}else{
			// 		this.tui.toast("正在开发中")
			// 	}
			// },
			search: function() {
				// uni.navigateTo({
				// 	url: '/pages/common/search/search'
				// });
				uni.navigateTo({
					url: '/pages/index/searchProductList/searchProductList?searchKey=' + this.searchValue
				});
			},
			toClassify(){
			uni.switchTab({
				url:"/pages/tabbar/classify/classify"
			})
		},
			seckill(type) {
				let url = type == 1 ? '/pages/index/seckillList/seckillList' : '/pages/index/seckillDetail/seckillDetail';
				this.tui.href(url);
			},
			group(type) {
				let url = type == 1 ? '/pages/index/groupList/groupList' : '/pages/index/groupDetail/groupDetail';
				this.tui.href(url);
			}
		},
		onPullDownRefresh: function() {
			// let loadData = JSON.parse(JSON.stringify(this.productList));
			// loadData = loadData.splice(0, 10);
			// this.productList = loadData;
			// this.pageIndex = 1;
			// this.pullUpOn = true;
			// this.loadding = false;
			// uni.stopPullDownRefresh();
		},
		onReachBottom: function() {
			// if (!this.pullUpOn) return;
			// this.loadding = true;
			// if (this.pageIndex == 4) {
			// 	this.loadding = false;
			// 	this.pullUpOn = false;
			// } else {
			// 	let loadData = JSON.parse(JSON.stringify(this.productList));
			// 	loadData = loadData.splice(0, 10);
			// 	if (this.pageIndex == 1) {
			// 		loadData = loadData.reverse();
			// 	}
			// 	this.productList = this.productList.concat(loadData);
			// 	this.pageIndex = this.pageIndex + 1;
			// 	this.loadding = false;
			// }
		},
		
		onPageScroll(e) {
			// #ifdef APP-PLUS
			let scrollTop = e.scrollTop;
			if (scrollTop < 0) {
				if (this.opacity > 0)
					this.opacity = 1 - Math.abs(scrollTop) / 30;
			} else {
				this.opacity = 1
			}
			// #endif
		},
		saoma(e) {
			console.log("===", e)

		},
		initNavigation(e) {
			this.opacity = e.opacity;
			this.top = e.top;
		},
		opacityChange(e) {
			this.opacity = e.opacity;
		},
	};
</script>

<style lang="scss">
	page {
		background-color: #f7f7f7;
	}
	
	.pwdpopup{
		width: 100%;
		height: 100%;
		border-radius: 32rpx 32rpx 0 0;
		background-color: #ffffff;
		padding: 30rpx;
		box-sizing: border-box;
		position: relative;
		.title{
			text-align: center;
			line-height: 50rpx;
			color: #000000;
			font-size: 36rpx;
			font-weight: 500;
		}
		.subtitle{
			color: #000000;
			font-size: 32rpx;
			font-weight: 500;
			margin-top: 22rpx;
		}
		.tips{
			font-size: 24rpx;
			color: #999999;
			margin-top: 20rpx;
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
			margin-bottom: 50rpx;
		}
	}
	
	.status_bar {
	      height: var(--status-bar-height);
	      width: 100%;
	      background-color:#45AD6B;
	  }

	.container {
		padding-bottom: 100rpx;
		color: #333;
	}
	.tui-catg{
		width: 92rpx;
		height: 92rpx;
	}
	.tui-header {
		width: 100%;
		height: 90rpx;
		padding: 0rpx 20rpx;
		box-sizing: border-box;
		background-color: #F73037;
		display: flex;
		align-items: center;
		justify-content: space-between;
		/* position: fixed; */
		left: 0;
		top: 0;
		/* #ifdef H5 */
		top: 4px;
		/* #endif */
		z-index: 199;
		transition: opacity .4s;
	}

	.tui-rolling-search {
		width: 100%;
		height: 60rpx;
		border-radius: 35rpx;
		padding: 0 40rpx 0 30rpx;
		box-sizing: border-box;
		background-color: #fff;
		display: flex;
		align-items: center;
		flex-wrap: nowrap;
		color: #999;
	}

	.tui-category {
		font-size: 24rpx;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin: 0;
		margin-right: 22rpx;
		flex-shrink: 0;
	}

	.tui-category-scale {
		transform: scale(0.7);
		line-height: 24rpx;
	}

	.tui-icon-category {
		line-height: 20px !important;
		margin-bottom: 0 !important;
	}

	.tui-swiper {
		font-size: 26rpx;
		height: 60rpx;
		flex: 1;
		padding-left: 12rpx;
	}

	.tui-swiper-item {
		display: flex;
		align-items: center;
	}

	.tui-hot-item {
		line-height: 26rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.tui-header-banner {
		/* padding-top: 100rpx; */
		box-sizing: border-box;
		background: #F73037;
		padding-top: 10rpx;
	}

	.tui-hot-search {
		color: #fff;
		font-size: 28rpx;
		margin-right: 40rpx;
		margin-left: 10rpx;
		display: flex;
		/* align-items: center; */
		justify-content: space-between;
		/* padding: 0 20rpx; */
		box-sizing: border-box;
		position: relative;
		z-index: 2;
	}

	.header-left {
		display: flex;
		align-items: center;
		padding: 0 20rpx;
		box-sizing: border-box;
		position: relative;
	}

	.header-right {
		margin-left: 50rpx;
	}



	.tui-hot-tag {
		background-color: rgba(255, 255, 255, 0.15);
		padding: 10rpx 24rpx;
		border-radius: 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		line-height: 24rpx;
	}

	.tui-banner-bg {
		display: flex;
		height: 180rpx;
		background-color: #F73037;
		position: relative;
	}

	.tui-primary-bg {
		width: 50%;
		display: inline-block;
		height: 224rpx;
		border: 1px solid transparent;
		position: relative;
		z-index: 1;
		background-color: #F73037;
	}

	.tui-route-left {
		transform: skewY(8deg);
	}

	.tui-route-right {
		transform: skewY(-8deg);
	}

	.tui-banner-box {
		width: 100%;
		padding: 0 20rpx;
		box-sizing: border-box;
		position: absolute;
		/* overflow: hidden; */
		z-index: 99;
		bottom: -80rpx;
		left: 0;
	}

	.tui-banner-swiper {
		width: 100%;
		height: 240rpx;
		border-radius: 20rpx;
		overflow: hidden;
		transform: translateY(0);
		background-color: #f8f8f8;
	}

	.tui-slide-image {
		width: 100%;
		height: 240rpx;
		display: block;
	}

	/* #ifdef MP-WEIXIN */
	.tui-banner-swiper .wx-swiper-dot {
		width: 8rpx;
		height: 8rpx;
		display: inline-flex;
		background: none;
		justify-content: space-between;
	}

	.tui-banner-swiper .wx-swiper-dot::before {
		content: '';
		flex-grow: 1;
		background-color: rgba(255, 255, 255, 0.8);
		border-radius: 16rpx;
		overflow: hidden;
	}

	.tui-banner-swiper .wx-swiper-dot-active::before {
		background-color: #fff;
	}

	.tui-banner-swiper .wx-swiper-dot.wx-swiper-dot-active {
		width: 16rpx;
	}

	/* #endif */

	/* #ifndef MP-WEIXIN */
	>>>.tui-banner-swiper .uni-swiper-dot {
		width: 8rpx;
		height: 8rpx;
		display: inline-flex;
		background-color: none;
		justify-content: space-between;
	}

	>>>.tui-banner-swiper .uni-swiper-dot::before {
		content: '';
		flex-grow: 1;
		background-color: rgba(255, 255, 255, 0.8);
		border-radius: 16rpx;
		overflow: hidden;
	}

	>>>.tui-banner-swiper .uni-swiper-dot-active::before {
		background-color: #fff;
	}

	>>>.tui-banner-swiper .uni-swiper-dot.uni-swiper-dot-active {
		width: 16rpx;
	}

	/* #endif */

	.tui-product-category {
		padding: 0rpx 0rpx 30rpx 0rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		font-size: 24rpx;
		color: #555;
		/* margin-bottom: 20rpx; */
		border-radius: 20rpx;
		margin-top: 100rpx;
		background-color: #ffffff;
	}

	.tui-category-item {
		width: 20%;
		height: 118rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-direction: column;
		padding-top: 30rpx;
	}

	.tui-category-img {
		height: 80rpx;
		width: 80rpx;
		display: block;
	}

	.tui-category-name {
		line-height: 24rpx;
	}

	.tui-block__box {
		width: 100%;
		padding: 0 25rpx 5rpx;
		box-sizing: border-box;
		background-color: #ffffff;
		border-radius: 20rpx;
		overflow: hidden;
	}

	.tui-product-box {
		margin-top: 20rpx;
		padding: 0 25rpx;
		box-sizing: border-box;
	}

	.tui-img__coupon {
		width: 100%;
		height: 184rpx;
		display: block;
	}

	.tui-mtop__20 {
		margin-top: 20rpx;
	}

	.tui-bg-white {
		background-color: #fff;
	}

	.tui-group-name {
		width: 100%;
		font-size: 34rpx;
		line-height: 34rpx;
		font-weight: bold;
		text-align: center;
		padding: 26rpx 0rpx 8rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #333;
	}

	.tui-sub__desc {
		color: #34c7a9;
		font-size: 28rpx;
		font-weight: 400;
		padding-left: 25rpx;
	}

	.tui-color__pink {
		color: #EF1346;
	}

	.tui-seckill__box {
		display: flex;
		align-items: center;
	}

	.tui-seckill__img {
		width: 170rpx;
		height: 38rpx;
	}

	.tui-countdown__box {
		width: 228rpx;
		display: flex;
		align-items: center;

		color: #fff;
		background-color: #fff;
		font-weight: 400;
		border: 1rpx solid #eb0909;
		height: 40rpx;
		border-radius: 30px;
		overflow: hidden;
		margin-left: 25rpx;
	}

	.tui-countdown__title {
		width: 100rpx;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #eb0909;
		flex-shrink: 0;
		font-size: 24rpx;
		line-height: 24rpx;
	}

	.tui-flex__center {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/*秒杀商品*/
	.tui-goods__list {
		display: flex;
		align-items: center;
	}

	.tui-goods__item {
		background-color: #fff;
		width: 150rpx;
		height: 230rpx;
		border-radius: 6rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		flex-shrink: 0;
		margin-right: 18rpx;
	}

	.tui-goods__imgbox {
		width: 150rpx;
		height: 150rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
	}

	.tui-goods__img {
		max-width: 150rpx;
		max-height: 150rpx;
		display: block;
	}

	.tui-pri__box {
		max-width: 150rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.tui-sale-pri {
		display: flex;
		align-items: flex-end;
		padding: 10rpx 0 8rpx;
		box-sizing: border-box;
		font-size: 28rpx;
		line-height: 28rpx;
		color: #eb0909;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
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

	.tui-original__pri {
		font-size: 24rpx;
		line-height: 24rpx;
		color: #999999;
		transform-origin: center 10%;
		transform: scale(0.8);
		display: flex;
		align-items: center;
		justify-content: center;
		text-decoration: line-through;
	}

	/*秒杀商品*/

	.tui-more__box {
		display: flex;
		align-items: center;
		font-weight: 400;
		color: #999;
	}

	.tui-more__box text {
		font-size: 24rpx;
		line-height: 24rpx;
	}

	.tui-new-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.tui-new-item {
		width: 49%;
		height: 180rpx;
		padding: 0 20rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		background: #f5f2f9;
		position: relative;
		border-radius: 12rpx;
	}

	.tui-new-mtop {
		margin-top: 2%;
	}

	.tui-title-box {
		font-size: 24rpx;
	}

	.tui-new-title {
		font-size: 26rpx;
		line-height: 32rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.tui-new-price {
		padding-top: 18rpx;
	}

	.tui-new-present {
		color: #ff201f;
		font-weight: bold;
	}

	.tui-new-original {
		display: inline-block;
		color: #a0a0a0;
		text-decoration: line-through;
		padding-left: 12rpx;
		transform: scale(0.8);
		transform-origin: center center;
	}

	.tui-new-img {
		width: 148rpx;
		height: 148rpx;
		display: block;
		flex-shrink: 0;
	}

	.tui-new-label {
		width: 56rpx;
		height: 56rpx;
		border-top-left-radius: 12rpx;
		position: absolute;
		left: 0;
		top: 0;
	}

	.tui-title__img {
		width: 100%;
		padding: 40rpx 0rpx 30rpx;
		display: flex;
		justify-content: center;
	}

	.tui-title__img image {
		width: 269rpx;
		height: 36rpx;
	}

	.tui-product-list {
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		flex-wrap: wrap;
		box-sizing: border-box;
		/* padding-top: 20rpx; */
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


	.tui-sale-price {
		font-size: 34rpx;
		font-weight: 500;
		color: #5da76a;
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

	.color-fff {
		color: #FFFFFF;
	}

	.header-search-img {
		width: 38rpx;
		height: 37rpx;
	}

	.header-box {
		/* #ifdef H5 */
		padding: 0 20rpx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		padding: 20rpx 20rpx;
		/* #endif */
		/* #ifdef APP-PLUS */
        padding: 20rpx 20rpx;
		/* #endif */
		background-color: #F73037;

	}

	.codeSet {
		width: 150rpx;
		height: 70rpx;
		/* #ifdef H5 */
		margin: 20rpx 10rpx;
		left: 12px;
		/* #endif */

		/* #ifdef MP-WEIXIN */
		margin: 60rpx 10rpx 0 10rpx;
		/* #endif */
	}

	.tui-searchbox {
		width: 100%;
		height: 30px;
		margin-right: 30rpx;
		border-radius: 15px;
		font-size: 12px;
		/* background: #f7f7f7; */
		padding: 3px 10px;
		box-sizing: border-box;
		color: #999;
		display: flex;
		align-items: center;
		justify-content: space-between;
		overflow: hidden;
	}
	.tui-search-mr {
		margin-right: 20rpx !important;
	}
	.scroll-header{
		display: flex;
		white-space: nowrap;
	}
	.scroll-header view{
	border:1px solid red;
	display: inline-block;
	}
	.left-tab{
		width: 100%;
	}
	.heder-right{display: flex;
    align-items: center;}
</style>
