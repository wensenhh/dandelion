<template>
	<view class="container">
		<!--header-->
		<view class="tui-header-box">
			<view class="tui-header" :style="{ width: width + 'px', height: height + 'px' }">
				<view class="tui-back" :style="{ marginTop: arrowTop + 'px' }" @tap="back">
					<tui-icon name="arrowleft" color="#fff"></tui-icon>
				</view>
				<view class="tui-searchbox tui-search-mr" :style="{ marginTop: inputTop + 'px' }">
					<input type="text" v-model="searchKey" placeholder="搜索商品标题" placeholder-style="font-size:28rpx" />

					<icon class="tui-right" type="search" :size="16" color="#999" @click="search"></icon>
				</view>
			</view>
		</view>
		<!--header-->
		<!--screen-->
		<view class="tui-header-screen" :style="{ top: height + 'px' }">
			<view class="tui-screen-top">
				<view class="tui-top-item tui-icon-ml" :class="[tabIndex == 0 ? 'tui-active tui-bold' : '']"
					data-index="0" @tap="screen">
					<view>{{ selectedName }}</view>
				</view>
				<view class="tui-top-item" :class="[tabIndex == 1 ? 'tui-active tui-bold' : '']" @tap="screen"
					data-index="1">销量最高</view>

				<view class="tui-top-item tui-icon-ml" @tap="screen" data-index="2">
					<text>价格排序</text>
					<image src="/static/images/index/sort1.png" class="sort-icon" v-if="sort==1?true:false" mode="">
					</image>
					<image src="/static/images/index/sort2.png" class="sort-icon" v-else mode=""></image>
				</view>


			</view>

		</view>
		<!--screen-->
		<view v-if="productList.length==0">
			<view class="none-data-info">
				<image src="/static/images/index/search_none.png" mode=""></image>
				<view class="none-text">
					没有搜到如何东西哦...
				</view>
			</view>
		</view>
		<!--list-->
		<view class="tui-product-list" :style="{ marginTop: px(dropScreenH + 18) }" v-else>
			<view class="tui-product-container">
				<block v-for="(item, index) in productList" :key="index" v-if="(index + 1) % 2 != 0 || isList">
					<!--商品列表-->
					<view class="tui-pro-item" :class="[isList ? 'tui-flex-list' : '']" hover-class="tui-hover"
						:hover-start-time="150" :data-goodsId="item.id" @tap="detail">
						<image :src="item.main_picture_path " class="tui-pro-img" mode="widthFix" />
						<view class="tui-pro-content">
							<view class="tui-pro-tit">{{ item.name }}</view>
							<view class="pro-weight">
								{{item.tagging}}
							</view>
							<view class="pro-desc">
								{{item.remark}}
							</view>
							<view>
								<view class="tui-pro-price">
									<view class="tui-size-sm">¥</view>
									<view class="tui-size-lm">{{item.price}}</view>
								</view>
							</view>
						</view>
					</view>
					<!--商品列表-->
				</block>
			</view>
			<view class="tui-product-container" v-if="!isList">
				<block v-for="(item, index) in productList" :key="index" v-if="(index + 1) % 2 == 0">
					<!--商品列表-->
					<view class="tui-pro-item" :class="[isList ? 'tui-flex-list' : '']" :data-goodsId="item.id"
						hover-class="tui-hover" :hover-start-time="150" @tap="detail">
						<image :src="item.main_picture_path " class="tui-pro-img" mode="widthFix" />
						<view class="tui-pro-content">
							<view class="tui-pro-tit">{{ item.name }}</view>
							<view class="pro-weight">
								{{item.tagging}}
							</view>
							<view class="pro-desc">
								{{item.remark}}
							</view>
							<view>
								<view class="tui-pro-price">
									<text class="tui-sale-price">￥{{ item.price }}</text>
								</view>
							</view>
						</view>
					</view>
					<!--商品列表-->
				</block>
			</view>
		</view>

		<!--list-->


		<!--加载loadding-->
		<tui-loadmore v-if="loadding" :index="3" type="red"></tui-loadmore>
		<tui-nomore v-if="!pullUpOn && isList" backgroundColor="#f7f7f7"></tui-nomore>
		<!--加载loadding-->
	</view>
</template>

<script>
	import {
		loadingFun
	} from '@/utils/tools'
	import {
		getGoodsSearch,
	} from '@/api/store';
	import {
		loadingType
	} from '@/utils/type';
	export default {
		data() {
			return {
				sort: 1, //1:升 上 0 下降
				searchKey: '', //搜索关键词
				width: 200, //header宽度
				height: 64, //header高度
				inputTop: 0, //搜索框距离顶部距离
				arrowTop: 0, //箭头距离顶部距离
				dropScreenH: 0, //下拉筛选框距顶部距离
				attrData: [],
				attrIndex: -1,
				dropScreenShow: false,
				scrollTop: 0,
				tabIndex: 0, //顶部筛选索引
				isList: false, //是否以列表展示  | 列表或大图
				drawer: false,
				drawerH: 0, //抽屉内部scrollview高度
				selectedName: '综合排序',
				selectH: 0,
				activityId: 1,
				goodsListParam: {
					keyword: ""
				},
				productList: [

				],
				pageIndex: 1,
				loadding: false,
				pullUpOn: true,
				page:1,
				type: 0
			};
		},
		onLoad: function(options) {
			let id = options.id
			this.activityId = id;
			this.searchKey = options.searchKey || '';
			this.goodsListParam.query_name = this.searchKey;
			this.goodsListParam.size = 20;
			if(options.type)this.goodsListParam.type = options.type;
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
					this.inputTop = obj.top ? obj.top + (obj.height - 30) / 2 : res.statusBarHeight + 7;
					this.arrowTop = obj.top ? obj.top + (obj.height - 32) / 2 : res.statusBarHeight + 6;


					//略小，避免误差带来的影响
					this.dropScreenH = (this.height * 750) / res.windowWidth + 86;
					this.drawerH = res.windowHeight - uni.upx2px(100) - this.height;
				}
			});

			// this.getGoodsList()
		this.reflesh()
		},
		methods: {
reflesh() {
				this.page = 1
				this.productList = []
				this.status = loadingType.LOADING
				this.getGoodsSearchFun();
			},
			reload() {
				this.status = loadingType.LOADING
				this.getGoodsSearchFun();
			},
			async getGoodsSearchFun() {
				// let {
				// 	page,
				// 	productList,
				// 	status
				// } = this;
				// const data = await loadingFun(getGoodsSearch, page, productList, status, this.goodsListParam)
				// console.log(data)
				// if (!data) return
				// this.page = data.page;
				// this.productList = data.dataList;
				// this.status = data.status;
				
				const res = await getGoodsSearch(this.goodsListParam);
				if (res.code == 1) {
					if (!res.data) return
					this.page = res.data.page || 1;
					this.productList = res.data.goodsList;
					this.status = res.data.status || 'finished';
					console.log(this.productList)
				} else {
					if (res.show == 1) {
						this.tui.toast(res.msg);
					}
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
				this.getGoodsSearchFun()
				setTimeout(() => {
					this.loadding = false
					this.pullUpOn = false
				}, 1000)
			},

			// getGoodsList() {

			// 	this.tui.request("/goods/getGoodsList", "GET", this.goodsListParam).then((res) => {
			// 		if (res.code == 1) {
			// 			this.productList = res.data
			// 		} else {
			// 			if (res.show == 1) {
			// 				this.tui.toast(res.msg);
			// 			}
			// 		}
			// 	}).catch((res) => {})
			// },
			px(num) {
				return uni.upx2px(num) + 'px';
			},

			btnSelected: function(e) {
				let index = e.currentTarget.dataset.index;
				this.$set(this.attrData[index], 'selected', !this.attrData[index].selected);
			},
			reset() {
				let arr = this.attrData;
				for (let item of arr) {
					item.selected = false;
				}
				this.attrData = arr;
			},
			btnCloseDrop() {
				this.scrollTop = 1;
				this.$nextTick(() => {
					this.scrollTop = 0;
				});
				this.dropScreenShow = false;
				this.attrIndex = -1;
			},
			btnSure: function() {
				let index = this.attrIndex;
				let arr = this.attrData;
				let active = false;
				let attrName = '';
				//这里只是为了展示选中效果,并非实际场景
				for (let item of arr) {
					if (item.selected) {
						active = true;
						attrName += attrName ? ';' + item.name : item.name;
					}
				}
				let obj = this.attrArr[index];
				this.btnCloseDrop();
				this.$set(obj, 'isActive', active);
				this.$set(obj, 'selectedName', attrName);
			},

			screen: function(e) {
				let index = e.currentTarget.dataset.index;
				this.btnCloseDrop();
				if (index == 0) {
					// this.showDropdownList();
					this.tabIndex = 0;
					this.goodsListParam.sales_sum = ""
					this.goodsListParam.price = ""
				} else if (index == 1) {
					this.tabIndex = 1;
					this.goodsListParam.sales_sum = 1
					this.goodsListParam.price = ""
				} else if (index == 2) {
					this.tabIndex = 2;
					if (this.sort == 1) {
						this.sort = 0
					} else {
						this.sort = 1
					}
					// this.isList = !this.isList;
					this.goodsListParam.price = this.sort
					this.goodsListParam.sales_sum = ""
				} else if (index == 3) {
					this.drawer = true;
				}
				this.reflesh()
			},
			closeDrawer: function() {
				this.drawer = false;
			},
			back: function() {
				if (this.drawer) {
					this.closeDrawer();
				} else {
					uni.navigateBack();
				}
			},
			search: function() {
				this.goodsListParam.keyword = this.searchKey
			this.reflesh()
				// uni.navigateTo({
				// 	url: '/pages/common/search/search'
				// });
			},
			detail: function(e) {
				uni.navigateTo({
					url: '/pages/index/productDetail/productDetail?id=' + e.currentTarget.dataset.goodsid
				});
			}
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
			// 	// this.productList = this.productList.concat(loadData);
			// 	this.pageIndex = this.pageIndex + 1;
			// 	this.loadding = false;
			// }
		}
	};
</script>

<style>
	page {
		background-color: #f7f7f7;
	}

	.container {
		padding-bottom: env(safe-area-inset-bottom);
	}

	/* 隐藏scroll-view滚动条*/

	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}

	.tui-header-box {
		width: 100%;
		background: #F73037;
		position: fixed;
		z-index: 1001;
		left: 0;
		top: 0;
	}

	.tui-header {
		display: flex;
		align-items: flex-start;
	}

	.tui-back {
		margin-left: 8rpx;
		height: 32px !important;
		width: 32px !important;
	}

	.tui-searchbox {
		width: 100%;
		height: 30px;
		margin-right: 30rpx;
		border-radius: 15px;
		font-size: 12px;
		background: #f7f7f7;
		padding: 3px 10px;
		box-sizing: border-box;
		color: #999;
		display: flex;
		align-items: center;
		justify-content: space-between;
		overflow: hidden;
	}

	/* #ifdef MP */
	.tui-search-mr {
		margin-right: 20rpx !important;
	}

	/* #endif */

	.tui-search-text {
		padding-left: 16rpx;
	}

	.tui-search-key {
		max-width: 80%;
		height: 100%;
		padding: 0 16rpx;
		margin-left: 12rpx;
		display: flex;
		align-items: center;
		border-radius: 15px;
		background: rgba(0, 0, 0, 0.5);
		color: #fff;
	}

	.tui-key-text {
		box-sizing: border-box;
		padding-right: 12rpx;
		font-size: 12px;
		line-height: 12px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	/*screen*/

	.tui-header-screen {
		width: 100%;
		box-sizing: border-box;
		background: #fff;
		position: fixed;
		z-index: 1000;
	}

	.tui-screen-top,
	.tui-screen-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 28rpx;
		color: #333;
	}

	.tui-screen-top {
		height: 88rpx;
		position: relative;
		background: #F73037;
	}

	.tui-top-item {
		height: 28rpx;
		line-height: 28rpx;
		flex: 1;
		color: #ffffff;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-topitem-active {
		color: #e41f19;
	}

	.tui-screen-bottom {
		height: 100rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		font-size: 24rpx;
		align-items: center;
		overflow: hidden;
	}

	.tui-bottom-text {
		line-height: 26rpx;
		max-width: 82%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.tui-bottom-item {
		flex: 1;
		width: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 12rpx;
		box-sizing: border-box;
		background-color: #f7f7f7;
		margin-right: 20rpx;
		white-space: nowrap;
		height: 60rpx;
		border-radius: 40rpx;
	}

	.tui-bottom-item:last-child {
		margin-right: 0;
	}

	.tui-btmItem-active {
		background-color: #fcedea !important;
		color: #e41f19;
		font-weight: bold;
		position: relative;
	}

	.tui-btmItem-active::after {
		content: '';
		position: absolute;
		border: 1rpx solid #e41f19;
		width: 100%;
		height: 100%;
		border-radius: 40rpx;
		left: 0;
		top: 0;
	}

	.tui-btmItem-tap {
		position: relative;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}

	.tui-btmItem-tap::after {
		content: '';
		position: absolute;
		width: 100%;
		height: 22rpx;
		background: #f7f7f7;
		left: 0;
		top: 58rpx;
	}

	.tui-bold {
		font-weight: bold;
	}

	.tui-active {
		color: #ffffff;
	}

	.tui-addr-left {
		padding-left: 6rpx;
	}

	.tui-seizeaseat-20 {
		height: 20rpx;
	}

	.tui-seizeaseat-30 {
		height: 30rpx;
	}

	/*screen*/

	/*顶部下拉选择 属性*/

	.tui-scroll-box {
		width: 100%;
		height: 480rpx;
		box-sizing: border-box;
		position: relative;
		z-index: 99;
		color: #fff;
		font-size: 30rpx;
		word-break: break-all;
	}

	.tui-drop-item {
		color: #333;
		height: 80rpx;
		font-size: 28rpx;
		padding: 20rpx 40rpx 20rpx 40rpx;
		box-sizing: border-box;
		display: inline-block;
		width: 50%;
	}

	.tui-drop-btnbox {
		width: 100%;
		height: 100rpx;
		position: absolute;
		left: 0;
		bottom: 0;
		box-sizing: border-box;
		display: flex;
	}

	.tui-drop-btn {
		width: 50%;
		font-size: 32rpx;
		text-align: center;
		height: 100rpx;
		line-height: 100rpx;
		border: 0;
	}

	.tui-btn-red {
		background: #e41f19;
		color: #fff;
	}

	.tui-red-hover {
		background: #c51a15 !important;
		color: #e5e5e5;
	}

	.tui-btn-white {
		background: #fff;
		color: #333;
	}

	.tui-white-hover {
		background: #e5e5e5;
		color: #2e2e2e;
	}

	/*顶部下拉选择 属性*/

	/*顶部下拉选择 综合*/

	.tui-dropdownlist {
		width: 100%;
		position: absolute;
		background-color: #fff;
		border-bottom-left-radius: 24rpx;
		border-bottom-right-radius: 24rpx;
		overflow: hidden;
		box-sizing: border-box;
		padding-top: 10rpx;
		padding-bottom: 26rpx;
		left: 0;
		top: 88rpx;
		visibility: hidden;
		transition: all 0.2s ease-in-out;
		z-index: 999;
	}


	.tui-mask-show {
		opacity: 1;
		visibility: visible;
	}

	/*顶部下拉选择 综合*/

	.tui-drawer-box {
		width: 686rpx;
		font-size: 24rpx;
		overflow: hidden;
		position: relative;
		padding-bottom: 100rpx;
	}

	.tui-drawer-title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx;
		box-sizing: border-box;
		height: 80rpx;
	}

	.tui-title-bold {
		font-size: 26rpx;
		font-weight: bold;
		flex-shrink: 0;
	}

	.tui-location {
		margin-right: 6rpx;
	}

	.tui-attr-right {
		width: 70%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		text-align: right;
	}

	.tui-all-box {
		width: 90%;
		white-space: nowrap;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.tui-drawer-content {
		padding: 16rpx 30rpx 30rpx 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
	}

	.tui-input {
		border: 0;
		height: 64rpx;
		border-radius: 32rpx;
		width: 45%;
		background-color: #f7f7f7;
		text-align: center;
		font-size: 24rpx;
		color: #333;
	}

	.tui-phcolor {
		text-align: center;
		color: #b2b2b2;
		font-size: 24rpx;
	}

	.tui-flex-attr {
		flex-wrap: wrap;
		justify-content: flex-start;
	}

	.tui-attr-item {
		width: 30%;
		height: 64rpx;
		background-color: #f7f7f7;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 4rpx;
		box-sizing: border-box;
		border-radius: 32rpx;
		margin-right: 5%;
		margin-bottom: 5%;
	}

	.tui-attr-ellipsis {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		width: 96%;
		text-align: center;
	}

	.tui-attr-item:nth-of-type(3n) {
		margin-right: 0%;
	}

	.tui-attr-btnbox {
		width: 100%;
		position: absolute;
		left: 0;
		bottom: 0;
		box-sizing: border-box;
		padding: 0 30rpx;
		background: #fff;
	}

	.tui-attr-safearea {
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-safearea-bottom {
		width: 100%;
		height: env(safe-area-inset-bottom);
	}

	.tui-attr-btnbox::before {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		border-top: 1px solid #eaeef1;
		transform: scaleY(0.5) translateZ(0);
		transform-origin: 0 0;
	}

	.tui-drawer-btn {
		width: 47%;
		text-align: center;
		height: 60rpx;
		border-radius: 30rpx;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
	}

	.tui-drawerbtn-black {
		border: 1rpx solid #555;
	}

	.tui-drawerbtn-primary {
		background: #e41f19;
		color: #fff;
	}

	/* 商品列表*/

	.tui-product-list {
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		flex-wrap: wrap;
		box-sizing: border-box;
		margin: 30rpx 20rpx;
	}

	.tui-product-container {
		flex: 1;
		margin-right: 20rpx;
	}

	.tui-product-container:last-child {
		margin-right: 0;
	}

	.tui-pro-item {
		width: 100%;
		margin-bottom: 20rpx;
		background: #fff;
		box-sizing: border-box;
		border-radius: 12rpx;
		overflow: hidden;
		transition: all 0.15s ease-in-out;
	}

	.tui-flex-list {
		display: flex;
		margin-bottom: 1rpx !important;
	}

	.tui-pro-img {
		width: 100%;
		display: block;
	}

	.tui-proimg-list {
		width: 260rpx;
		height: 260rpx !important;
		flex-shrink: 0;
		border-radius: 12rpx;
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
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.tui-pro-price {
		/* padding-top: 18rpx; */
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

	.tui-sale-price {
		font-size: 34rpx;
		font-weight: 500;
		color: #e41f19;
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

	.tui-img-sm {
		width: 56rpx;
		position: absolute;
		margin: 6px;
		z-index: 2;
	}

	.none-data-info {
		text-align: center;
		margin-top: 340rpx;
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

	.sort-icon {
		width: 24rpx;
		height: 24rpx;
		margin-left: 10rpx;
	}

	/* 商品列表*/
</style>
