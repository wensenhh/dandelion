<template>
	<view class="container">
		<view class="status_bar">
		          <!-- 这里是状态栏 -->
		 </view>
		<view class="header-box display-f ">
			<!-- <image class="codeSet" src="/static/images/saoma.png" @click="$comment.scanCode()" mode=""></image> -->
			<image class="codeSet" src="/static/images/logo.png" mode="" @click="$comment.mamberCodeOpen()"></image>
		</view>


		<view class="swiper-box">
			<swiper indicator-dots autoplay circular indicator-active-color="#15B76C" :interval="5000" :duration="150"
				class="swiper">
				<swiper-item v-for="(item, index) in banner" :key="index" @tap.stop="bannerDetail" :data-index='index'>
					<image :src="item.banner" class="slide-image" mode="scaleToFill" />
				</swiper-item>
			</swiper>
		</view>
		<view class=" " style="height: 10rpx;">

		</view>
		<view class="tui-header">

			<view class="tui-rolling-search">
				<view class="tui-searchbox tui-search-mr" :style="{ marginTop: inputTop + 'px' }">
					<input type="text" v-model="searchValue" placeholder="搜索商品标题" placeholder-style="font-size:28rpx" />

					<icon class="tui-right" type="search" :size="16" @tap="search" color="#999"></icon>
				</view>

			</view>
		</view>

		<!-- <view class="tui-searchbox">
			<view class="tui-search-input" @tap="search">
				<icon type="search" :size="13" color="#999"></icon>
				<text class="tui-search-text">搜索商品标题</text>
			</view>
		</view> -->

		<scroll-view scroll-y scroll-with-animation class="tab-view "
			:style="{ height: height + 'px', top: top + 'px' }" :scroll-into-view="scrollViewId">
			<view :id="`id_${index}`" v-for="(item, index) in tabbar" :key="index" class="tab-bar-item"
				:class="[currentTab == index ? 'active' : '']" :data-current="index" @tap.stop="swichNav">
				<text>{{ item.name }}</text>
			</view>
		</scroll-view>
		<block v-for="(item, index) in tabbar" :key="index">
			<scroll-view scroll-y class="right-box " :style="{ height: height + 'px', top: top + 'px' }"
				v-if="currentTab == index">
				<!--内容部分 start 自定义可删除-->
				<view class="page-view">

					<view class="class-box">
						<view class="class-item">
							<!-- <view class="class-name">{{ item }}</view> -->
							<view class="g-container">
								<view class="g-box" @tap.stop="detail" :data-index="goodsIndex"
									v-for="(itemInfo,goodsIndex) in  goods" :key="goodsIndex">
									<image :src="itemInfo.main_picture_path" class="g-image" />
									<view class="g-info">
										<view class="">
											<p class="goodsTitle">{{itemInfo.name}}</p>
											<p class="goodsTips">{{itemInfo.remark}}</p>
										</view>
										<view class="" style="height: 60rpx;">

										</view>
										<view class="display-f align-items">
											<view>
												<p class="g-price"> <span class="symbol-p">￥</span> {{itemInfo.price}}
												</p>
												<p class="goodsTips" v-if="itemInfo.weight==''?true:false">重量{{itemInfo.weight}}g</p>
											</view>
											<view class="g-buy">
												去购买
											</view>

										</view>
									</view>
									<!-- <view class="g-title">高价回收</view> -->
								</view>

							</view>
						</view>


					</view>
				</view>
				<!--内容部分 end 自定义可删除-->
			</scroll-view>
		</block>
	</view>
</template>

<script>
	import {
		loadingFun
	} from '@/utils/tools'
	import {
		getCatrgory,
		getGoodsSearch,
		getAdList
	} from '@/api/store';
	import {
		loadingType
	} from '@/utils/type';
	export default {
		data() {
			return {
				inputTop: 0,
				classifyData: [],
				classifyGoodsData: {},
				searchValue: "",
				banner: [],
				goods: [
					
				],
				tabbar: [
				],
				height: 0, //scroll-view高度
				top: 0,
				currentTab: 0, //预设当前项的值
				scrollViewId: "id_0",
				statusBarHeight: 0,
				titleBarHeight: 0,
				page:1,
				classifyId:1,
			};
		},
		onLoad: function(options) {
			setTimeout(() => {
				uni.getSystemInfo({
					success: res => {
						// #ifdef H5
						let header = 392;
						// #endif

						// #ifdef MP-WEIXIN
						let header = 552;
						// #endif
						// #ifdef APP-PLUS
						let header = 550;
						// #endif
						let top = 0;
						//#ifdef H5
						top = 44;
						//#endif
						this.height = res.windowHeight - uni.upx2px(header);
						this.top = top + uni.upx2px(header);
					}
				});
			}, 50);
			this.getAdListApi()
			this.getClassifyApi()
				// this.reflesh()
		},

		methods: {
			reflesh() {
				this.page = 1
				this.goods = []
				this.status = loadingType.LOADING
				this.getGoodsSearchFun(this.classifyId);
			},
			reload() {
				this.status = loadingType.LOADING
				this.getGoodsSearchFun(this.classifyId);
			},
			async getGoodsSearchFun(classifyId) {
				// let {
				// 	page,
				// 	goods,
				// 	status
				// } = this;
				// const data = await loadingFun(getGoodsSearch, page, goods, status, {
				// 	cateid: classifyId,
				// 	query_name: this.searchValue
				// })
				// if (!data) return
				// console.log("data.page")
				// this.page = data.page || 1;
				// this.goods = data.goodsList;
				// this.status = data.status || 'finished';
				// this.recordsData = data.data
				
				const res = await getGoodsSearch({
						cateid: classifyId,
						query_name: this.searchValue
				});
				if (res.code == 1) {
					if (!res.data) return
					this.page = res.data.page || 1;
					this.goods = res.data.goodsList;
					this.status = res.data.status || 'finished';
					console.log(this.goods)
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
			async getAdListApi() {
				const res = await getAdList({
				});
				if (res.code == 1) {
					this.banner = res.data
				} else {
					if (res.show == 1) {
						this.tui.toast(res.msg);
					}
				}
				
			},
			async getClassifyApi() {
				const  result = await getCatrgory( {
					client: 1
				})
				let {
					code,
					data,
					show,
					msg
				} = result;
				if (code == 1) {
							let list = data.cateList
							this.classifyData = list
							this.tabbar = list
							// this.getClassifyGoods(res.data[0].id)
							this.classifyId=list[0].id;
							// this.getGoodsSearchFun(data[0].id)
							this.reflesh()
						} else {
							if (show == 1) {
								this.tui.toast(msg);
							}
						}
			},
			// getClassifyGoods(classifyId) {
			// 	this.tui.request("/goods/getGoodsList", "GET", {
			// 		page_no: 1,
			// 		category_id: classifyId,
			// 		keyword: this.searchValue
			// 	}).then((res) => {
			// 		if (res.code == 1) {
			// 			this.goods = res.data.list
			// 			this.classifyGoodsData = res.data
			// 		} else {
			// 			if (res.show == 1) {
			// 				this.tui.toast(res.msg);
			// 			}
			// 		}
			// 	}).catch((res) => {})
			// },
			toArr(object) {
				let arr = [];
				for (let i in object) {
					arr.push(object[i].name);
				}
				return arr;
			},
			// 点击标题切换当前页时改变样式
			swichNav: function(e) {
				let cur = e.currentTarget.dataset.current;
				if (this.currentTab == cur) {
					return false;
				} else {
					this.currentTab = cur;
					this.checkCor();
				}
				this.classifyId=this.classifyData[cur].id;
				// this.getGoodsSearchFun(this.classifyData[cur].id)
				this.reflesh()
			},
			//判断当前滚动超过一屏时，设置tab标题滚动条。
			checkCor: function() {
				if (this.currentTab > 6) {
					this.scrollViewId = `id_${this.currentTab - 2}`;
				} else {
					this.scrollViewId = `id_0`;
				}
			},
			bannerDetail(e) {
				let bannerInfo=this.banner[e.currentTarget.dataset.index]
				if(bannerInfo.link_type==2){
					let url=bannerInfo.link+"?id="+bannerInfo.params.id
					console.log(url)
					uni.navigateTo({
						url: url
					});
				}else{
					uni.navigateTo({
						url: bannerInfo.link
					});
				}
			},
			detail(e) {
				let goodsDetail=this.goods[e.currentTarget.dataset.index]
				uni.navigateTo({
					url: '/pages/index/productDetail/productDetail?id='+goodsDetail.id
				});
			},
			search: function() {
				// uni.navigateTo({
				// 	url: '/pages/common/search/search'
				// });
				// uni.navigateTo({
				// 	url: '/pages/index/productList/productList?searchKey=' + this.searchValue
				// });
				this.classifyId=this.classifyData[this.currentTab].id;
				// this.getGoodsSearchFun(this.classifyData[this.currentTab].id)
				this.reflesh()
			}
		}
	};
</script>
<style>
	page {
		background: #FFFFFF;
	}
	/* .swiper{
		overflow:unset !important;
	} */
</style>
<style lang="scss">
	.container {
		position: fixed;
		width: 100%;
	}
	
	.status_bar {
	      height: var(--status-bar-height);
	      width: 100%;
	      background-color:#F73037;
	  }

	.tui-header {
		width: 100%;
		height: 90rpx;
		padding: 0rpx 20rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		/* position: fixed; */
		left: 0;
		top: 0;
		/* #ifdef H5 */
		top: 4px;
		/* #endif */
		z-index: 999;
		transition: opacity .4s;
	}

	.tui-rolling-search {
		width: 100%;
		height: 60rpx;
		border-radius: 35rpx;
		padding: 0 40rpx 0 30rpx;
		box-sizing: border-box;
		background-color: #f9f9f9;
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

	.tui-search-mr {
		margin-right: 20rpx !important;
	}

	.tui-category-scale {
		transform: scale(0.7);
		line-height: 24rpx;
	}

	.tui-icon-category {
		line-height: 20px !important;
		margin-bottom: 0 !important;
	}

	/* 左侧导航布局 start*/

	/* 隐藏scroll-view滚动条*/

	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}

	.goods-box {
		width: 1020rpx;
		top: 540rpx;
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

	.swiper-box {
		width: 92%;
		overflow: hidden;
		margin: auto;
		position: absolute;
		/* text-align: center; */
		left: 4%;
		top: 100rpx;
		height: 200upx;
		
		

		/* #ifdef H5 */
		top: 120rpx;
		/* #endif */

		/* #ifdef MP-WEIXIN */
		top: 180rpx;
		/* #endif */
		
		/* #ifdef APP-PLUS */
		top: 180rpx;
		/* #endif */
	}

	.header-box {
		/* #ifdef H5 */
		height: 300rpx;

		// padding: 0 20rpx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		height: 300rpx;
		padding: 20rpx 20rpx;
		/* #endif */
		/* #ifdef APP-PLUS */
        height: 300upx;
		padding: 20rpx 20rpx;
		/* #endif */
		border-radius: 0 0 8% 8%;
		background-color: #F73037;

		.codeSet {
			width: 150rpx;
			height: 70rpx;
			/* #ifdef H5 */
			margin: 20rpx 10rpx;
			left: 12px;
			/* #endif */

			/* #ifdef MP-WEIXIN */
			margin: 70rpx 10rpx 0 10rpx;
			/* #endif */
		}
	}

	.tui-searchbox::after {
		content: '';
		position: absolute;
		border-bottom: 1rpx solid #d2d2d2;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		bottom: 0;
		right: 0;
		left: 0;
	}

	.tui-search-input {
		width: 100%;
		height: 60rpx;
		background: #f1f1f1;
		border-radius: 30rpx;
		font-size: 26rpx;
		color: #999;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-search-text {
		padding-left: 16rpx;
	}

	.tab-view {
		height: 100vh;
		width: 200rpx;
		position: fixed;
		left: 0;
		z-index: 10;
		background: #f6f6f6;
	}

	.tab-bar-item {
		width: 200rpx;
		height: 110rpx;

		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		color: #444;
		font-weight: 400;
	}

	.active {
		position: relative;
		color: #000;
		font-size: 30rpx;
		font-weight: 600;
		background: #fcfcfc;
	}

	.active::before {
		content: '';
		position: absolute;
		border-left: 8rpx solid #F73037;
		height: 30rpx;
		left: 0;
	}

	/* 左侧导航布局 end*/

	.right-box {
		width: 100%;
		position: fixed;
		padding-left: 220rpx;
		box-sizing: border-box;
		left: 0;
	}

	.page-view {
		width: 100%;
		overflow: hidden;
		padding-top: 20rpx;
		padding-right: 20rpx;
		box-sizing: border-box;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.swiper {
		width: 100%;
		height: 200upx;
		border-radius: 12rpx;
		overflow: hidden;
		transform: translateZ(0);
	}

	/* #ifdef MP-WEIXIN */
	.swiper .wx-swiper-dot {
		width: 8rpx;
		height: 8rpx;
		display: inline-flex;
		background: none;
		justify-content: space-between;
	}

	.swiper .wx-swiper-dot::before {
		content: '';
		flex-grow: 1;
		background: rgba(255, 255, 255, 0.8);
		border-radius: 16rpx;
		overflow: hidden;
	}

	.swiper .wx-swiper-dot-active::before {
		background: #fff;
	}

	.swiper .wx-swiper-dot.wx-swiper-dot-active {
		width: 16rpx;
	}

	/* #endif */

	/* #ifndef MP-WEIXIN */
	>>>.swiper .uni-swiper-dot {
		width: 8rpx;
		height: 8rpx;
		display: inline-flex;
		background: none;
		justify-content: space-between;
	}

	>>>.swiper .uni-swiper-dot::before {
		content: '';
		flex-grow: 1;
		background: rgba(255, 255, 255, 0.8);
		border-radius: 16rpx;
		overflow: hidden;
	}

	>>>.swiper .uni-swiper-dot-active::before {
		background: #fff;
	}

	>>>.swiper .uni-swiper-dot.uni-swiper-dot-active {
		width: 16rpx;
	}

	/* #endif */

	.slide-image {
		width: 100%;
		height: 200upx;
	}

	.class-box {
		// padding-top: 30rpx;
	}

	.class-item {
		background: #fff;
		width: 100%;
		box-sizing: border-box;
		// padding: 20rpx;
		margin-bottom: 80rpx;
		border-radius: 12rpx;
	}

	.class-name {
		font-size: 22rpx;
	}

	.g-container {
		/* padding-top: 20rpx; */
		display: flex;
		display: -webkit-flex;
		justify-content: flex-start;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.g-box {
		width: 100%;
		display: flex;
		padding-top: 20rpx;

		.g-info {
			width: 320rpx;
			border-bottom: 1px solid #F5F5F5;
			padding-bottom: 20rpx;

			.g-price {
				color: #FF5555;
			}

			.symbol-p {
				font-size: 16rpx;
			}

			.g-buy {
				margin-left: auto;
				background: #F73037;
				border-radius: 100rpx;
				color: #fff;
				padding: 8rpx 16rpx;
				font-size: 24rpx;
			}
		}

		.goodsTitle {
			font-size: 26rpx;
			font-weight: 400;
		}

		.goodsTips {
			font-weight: 100;
			font-size: 16rpx;
		}
	}

	.g-image {
		width: 160rpx;
		height: 160rpx;
		padding-right: 10rpx;
	}

	.g-title {
		font-size: 22rpx;
	}
</style>
