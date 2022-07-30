<template>
	<view class="container">
		<!--header-->
		<view class="tui-header-box">
			<view class="tui-header-icon">
				<view class="tui-icon-box" @tap="back" :style="{ marginTop: top + 'px' }">
					<tui-icon name="arrowleft" :size="30" :color="opcity >= 1 ? '#000' : '#fff'"></tui-icon>
				</view>
			</view>
		</view>
		<!--header-->

		<!--banner-->
		<view class="tui-banner-swiper">
		<!-- 	<image :src="productDetail.image" mode="" class="tui-slide-image p-r" :style="{ height: scrollH + 'px' }">
			</image> -->
			<!-- </block> -->
						<swiper :autoplay="true" :interval="5000" :duration="150" :circular="true" :style="{ height: scrollH + 'px' }"
						 @change="bannerChange">
							<block v-for="(item, index) in banner" :key="index">
								<swiper-item :data-index="index" @tap.stop="previewImage">
									<image :src="item" class="tui-slide-image" :style="{ height: scrollH + 'px' }" />
								</swiper-item>
							</block>
						</swiper>
			<!-- <view class="display-f p-a tip-box">
				<view class="banner-smallBox" @tap.stop="play(1)">
					<image src="https://www.thorui.cn/images/mall/img_video_3x.png" mode="widthFix"></image>
					<view class="banner-box">视频</view>
				</view>
				<view class="banner-smallBox" @tap.stop="play(2)">
					<image src="https://www.thorui.cn/images/mall/img_video_3x.png" mode="widthFix"></image>
					<view class="banner-box">图片</view>
				</view>
			</view> -->
			<!-- <view class="tui-banner-tag">
				<tui-tag padding="12rpx 18rpx" type="translucent" shape="circleLeft" :scaleMultiple="0.82" originRight>{{ bannerIndex + 1 }}/{{ banner.length }}</tui-tag>
			</view> -->
		</view>

		<!--banner-->

		<view class="tui-pro-detail">
			<view class="tui-product-title tui-border-radius">
				<view class="tui-pro-pricebox tui-padding">
					<view class="tui-pro-price">
						<view>
							
							<!-- <text class="tui-price" v-if="productDetail.findWholesale==1?true:false">{{checkedGoods.wholesaleAmount}}个农场券+{{ checkedGoods.discountAmount}}元</text> -->
							<!-- <text class="tui-price" v-if="productDetail.findWholesale==1?true:false">{{checkedGoods.price}}</text> -->
							<text class="tui-price"><text>￥</text>{{checkedGoods.price}}</text>
						</view>
						<tui-tag padding="10rpx 20rpx" size="24rpx" plain type="red" shape="circle"
							:scaleMultiple="0.8">专卖</tui-tag>
					</view>
				</view>

				<view class="tui-pro-titbox">
					<view class="tui-pro-title">{{productDetail.name}}</view>
				</view>
				<view class="tui-padding">
					<view class="tui-sale-info tui-size tui-gray">
						<view>库存：{{productDetail.stock}}</view>
						<view>销量：{{productDetail.sales}}</view>
						<view>限量：0</view>
					</view>
				</view>
			</view>

			<view class="tui-discount-box tui-radius-all tui-mtop">
				<view class="tui-list-cell tui-last">
					<view class="info-title tui-cell-title">描述</view>
					<view class="" style="line-height: 40rpx;">
						{{productDetail.remark}}
					</view>

				</view>

				<view class="tui-list-cell tui-last">
					<view class="info-title tui-cell-title">发货</view>
					<view>
						{{productDetail.origin}}
					</view>
				</view>
				<view class="tui-list-cell tui-last">
					<view class="info-title tui-cell-title">服务</view>
					<view>
						正品保证 极速退款 7天退换
					</view>
					<view class="tui-right" @tap="showPopup(2)">
						<tui-icon name="arrowright" :size="20" color="#666"></tui-icon>
					</view>
				</view>
				<!-- <view class="tui-list-cell tui-last">
					<view class="info-title tui-cell-title">选择</view>
					<view class="">
						<view>选择规格：</view>
						<view class='format'>{{specValueText}}</view>
					</view>
					<view class="tui-right" @tap="showPopup(1)" style="top: 50rpx;">
						<tui-icon name="arrowright" :size="20" color="#666"></tui-icon>
					</view>
				</view> -->
			</view>

			<!-- <view class="tui-cmt-box tui-mtop tui-radius-all">
				<view class="tui-list-cell tui-last tui-between">
					<view class="tui-bold">商品评价（0）</view>
					<view class="tui-right">
						<text class="tui-cmt-all">查看全部</text>
						<tui-icon name="arrowright" :size="20" color="#666"></tui-icon>
					</view>
				</view>


			</view> -->

			<view class="tui-nomore-box">
				<tui-nomore text="商品详情" backgroundColor="#f7f7f7"></tui-nomore>
			</view>
			<view class="tui-product-img tui-radius-all">
				<!-- <image :src="item.uri" v-for="(item, index) in productDetail.goods_image" :key="index"
					mode="widthFix">
				</image> -->
				<view v-html="productDetail.content" style="max-width: 100vw;"></view>
			</view>

		</view>

		<!--底部操作栏-->
		<view class="tui-operation display-f">

			<view class="tui-operation-right  tui-right-flex tui-col-7 tui-btnbox-4" style="margin-left: auto;">
				<tui-button width='240rpx' height="68rpx" :size="28" type="gray" shape="circle" style="margin-right: 20rpx;" @click="addcart">加入购物车
				</tui-button>
				<!-- <view class="tui-right" style="margin-bottom: 30rpx;"> -->
				<tui-button width='240rpx' height="68rpx" :size="28" type="green" shape="circle" @click="openPopup">立即购买
				</tui-button>
				<!-- </view> -->
			</view>
		</view>




		<!--底部选择层-->
		<tui-bottom-popup :show="popupShow" @close="hidePopup">
			<view class="tui-popup-box">
				<view class="tui-product-box tui-padding" v-if="showPopupType==1">
					<image :src="productDetail.main_picture_path" class="tui-popup-img"></image>
					<view class="tui-popup-price">
						<!-- <view class="tui-amount tui-bold" v-if="productDetail.findWholesale==1?true:false">{{checkedGoods.wholesaleAmount}}个农场券+{{ checkedGoods.discountAmount }}</view> -->
						<view class="tui-amount tui-bold" v-if="productDetail.findWholesale==1?true:false">{{checkedGoods.price}}</view>
						<view class="tui-amount tui-bold" v-else>{{checkedGoods.price}}</view>
						<!-- <view class="tui-number">编号:4373299399393</view> -->
					</view>
				</view>
				<scroll-view scroll-y class="tui-popup-scroll">
					<block v-if="showPopupType==1">


						<view class="tui-scrollview-box">

							<view class="tui-bold tui-attr-title" v-for="(item,index) in specList"
								:key="index">
								<view class="name mb20">
									{{ item.name }}
									<text
										class="primary xs ml20">{{checkedGoods.spec_value_ids_arr[index] == '' ? '请选择'+item.name:''}}</text>
								</view>

								<view class="row wrap">
									<view v-for="(specitem, index2) in item.spec_value" :key="index2" :class="'spec-item sm ' +
								    ( checkedGoods.spec_value_ids_arr[index] == specitem.id || checkedGoods.spec_value_ids_arr[index] == specitem.spec_id  ? 'checked' : '' ) + 
								    ( isDisable(specitem.id) ? 'disabled':'')" @click="choseSpecItem(index, index2)">
										{{ specitem.value }}
									</view>
								</view>
							</view>

							<view class="tui-number-box tui-bold tui-attr-title">
								<view class="tui-attr-title">库存</view>

								<view class="tui-right-flex">
									{{checkedGoods.stock}}
								</view>

							</view>
							<view class="tui-number-box tui-bold tui-attr-title">
								<view class="tui-attr-title">数量</view>
								<tui-numberbox :max="checkedGoods.stock" :min="1" :value="value" @change="change"></tui-numberbox>
							</view>

						</view>
					</block>
					<view class="tui-scrollview-box" v-if="showPopupType==2">
						<view class="tui-bold tui-attr-title">正品保证</view>
						<view class="explain">此商品官方保证正品</view>
						<view class="tui-bold tui-attr-title">快速退款</view>
						<view class="explain">此商品享受退款极速退款服务</view>
						<view class="tui-bold tui-attr-title">7天退换</view>
						<view class="explain">此商品享受七天无理由退换服务</view>
					</view>
				</scroll-view>
				<view class="tui-operation tui-operation-right tui-right-flex tui-popup-btn">

					<view class="tui-flex-1 btns row-between bg-white" :class="specValueText.indexOf('请选择') != -1 || checkedGoods.stock == 0 ? 'disabled':''">
						<tui-button height="72rpx" :size="28" type="green" shape="circle" @click="submit">立即购买
						</tui-button>
					</view>
				</view>
				<view class="tui-right">
					<tui-icon name="close" color="#999" :size="20" @click="hidePopup"></tui-icon>
				</view>
			</view>
		</tui-bottom-popup>
		<!--底部选择层-->

	</view>
</template>

<script>
	import thorui from '@/components/common/tui-clipboard/tui-clipboard.js'
	import poster from '@/components/common/tui-poster/tui-poster.js'
	export default {
		data() {
			return {
				height: 64, //header高度
				top: 26, //标题图标距离顶部距离
				scrollH: 0, //滚动总高度
				opcity: 0,
				ruleIndex: 0,
				showPopupType: 1,
				iconOpcity: 0.5,
				rule: [],
				banner: [

				],
				specList:[],
				productDetail: {
					name: ''
				},
				bannerIndex: 0,
				disable: [], //不可选择的
				goodsId: 1,
				popupShow: false,
				checkedGoods: {
					stock: 0
				}, //选中的
				value: 1,
				disable: [],
				outOfStock: [], //缺货的
				posterImg: '',
				winWidth: uni.upx2px(560 * 2),
				winHeight: uni.upx2px(890 * 2),
				modalShow: false
			};
		},
		onLoad: function(options) {
			this.goodsId = options.id
			this.getProdectDetail(options.id)
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

			setTimeout(() => {
				uni.getSystemInfo({
					success: res => {
						this.width = obj.left || res.windowWidth;
						this.height = obj.top ? obj.top + obj.height + 8 : res.statusBarHeight +
							44;
						this.top = obj.top ? obj.top + (obj.height - 32) / 2 : res
							.statusBarHeight + 6;
						this.scrollH = res.windowWidth;
					}
				});
			}, 0);

		},
		onShow() {
			// this.getProdectDetail(this.goodsId)
		},
		computed: {
			// 选择的规格参数等
			specValueText() {
				let arr = this.checkedGoods.spec_value_ids?.split(',');
				let spec_str = ''
				if (arr)
					arr.forEach((item, index) => {
						if (item == '') spec_str +=  this.specList[index].name + ','
					})
		 	if (this.checkedGoods?.stock != 0 && spec_str == '')
					return `已选择 ${this.checkedGoods.spec_value_str} ${this.value} 件`
				else
					return `请选择 ${spec_str.slice(0, spec_str.length - 1)}`
			}
		},
				watch: {
					specList(value) {
						console.log("this.checkedGoods111111",this.checkedGoods)
						if (this.checkedGoods.stock == 0) return
					
						const res = this.productDetail.goods_item.filter(item => {
							
							return this.checkedGoods.spec_value_ids === item.spec_value_ids
						})
						
					
						// 库存为0的规格
						const idsArr = this.checkedGoods.spec_value_ids_arr;
						const outOfStock = this.outOfStock;
						// 找出规格相同和规格不相同的余数
						const getArrGather = this.getArrResult(idsArr, outOfStock);
						// 计算出缺货的规格项
						this.disable = this.getOutOfStockArr(getArrGather, idsArr)
					
						if (res.length != 0) {
							let result = JSON.parse(JSON.stringify(res[0]))
							result.spec_value_ids_arr = result.spec_value_ids.split(',')
							if(this.productDetail.findWholesale==1){
								let amount = Number(result.price)*Number(this.productDetail.discount)/10;
									amount=amount.toFixed(2)
								let wholesaleAmount=amount*(10-Number(this.productDetail.discount))/10/10;
								wholesaleAmount=Math.floor(wholesaleAmount)
								result.wholesaleAmount=wholesaleAmount;
								result.discountAmount=amount
							}
							this.checkedGoods = result;
							// 同步到父组件
							this.$emit('change', {
								detail: this.checkedGoods
							});
						}
					},
					},
		methods: {
			bannerChange: function(e) {
							this.bannerIndex = e.detail.current;
						},
						previewImage: function(e) {
										let index = e.currentTarget.dataset.index;
										uni.previewImage({
											current: this.banner[index],
											urls: this.banner
										});
									},
			// 选择的规格参数等
			// specValueText() {
			// 	console.log("========================")
			//     let arr = this.checkedGoods.spec_value_ids?.split(',');
			//     let spec_str = ''
			//     if (arr)
			//         arr.forEach((item, index) => {
			//             if (item == '') spec_str += this.productDetail.goods_spec[index].name + ','
			//         })
			//     if (this.checkedGoods?.stock != 0 && spec_str == '')
			//         return `已选择 ${this.checkedGoods.spec_value_str} ${this.goodsNum} 件`
			//     else
			//         return `请选择 ${spec_str.slice(0, spec_str.length - 1)}`
			// },
			
			isDisable(e) {
				const res = this.disable.filter(item => item == e)
				if (res.length != 0) return true
				else return false
			},
			addcart(){
				let that = this
				this.$request.post('/cart/addCart', {
					product_id: this.goodsId,
					quantity: 1
				}).then(res => {
					if(res.code == 1){
						uni.showToast({
							title: '添加购物车成功!'
						})
					}
				})
			},
			onClick(type) {
				let {
					checkedGoods,
					goodsNum
				} = this;
				if (this.specValueText.indexOf('请选择') != -1) return this.$toast({
					title: this.specValueText
				})
			 if (checkedGoods.stock == 0) return this.$toast({
					title: '当前选择库存不足'
				})
				checkedGoods.goodsNum = goodsNum;
				this.$emit(type, {
					detail: checkedGoods
				});
			},
			// 选择规格
			choseSpecItem(index, index2) {
		   const id = this.specList[index].spec_value[index2].id;

				// 无法选择
				const disable = this.disable.filter(item => item == id)
				if (disable.length != 0) return

				let idsArr = this.checkedGoods.spec_value_ids_arr;
				if (id == idsArr[index]) idsArr[index] = ''
				else idsArr[index] = id;
				//保存已选规格
				this.checkedGoods.spec_value_ids_arr = idsArr;
				this.checkedGoods.spec_value_ids = idsArr.join(',');
				// 重新渲染页面
				this.specList = [...this.specList]
			},
			// 过滤出需要进行禁用的规格
			getOutOfStockArr(arr, arr1, result = []) {
				arr.forEach(el => {
					if (el.num >= (arr1.length - 1)) {
						result.push(...el.different)
					}
				})
				return result
			},

			// 匹配出缺货库存和已选中对比结果
			getArrIdentical(arr1, arr2, arr = [], num = 0) {
				arr1.forEach(el => {
					arr2.forEach(el2 => {
						if (el == el2) {
							num += 1;
							arr.push(el)
						}
					})
				});
				return {
					num, //n个相同的
					different: this.getArrDifference([...new Set(arr)].map(Number), arr2.map(Number)),
					identical: [...new Set(arr)]
				}
			},

			// 匹配出已选择和缺库存的
			getArrResult(arr, outOfStock, result = []) {
				outOfStock.forEach(item => {
					const res = this.getArrIdentical(arr, item.spec_value_ids.split(','))
					if (res != undefined && res.length != 0) {
						result.push(res)
					}
				})
				return result
			},

			// 找出两个数组中参数不同的
			getArrDifference(arr1, arr2) {
				return arr1.concat(arr2).filter(function(v, i, arr) {
					return arr.indexOf(v) == arr.lastIndexOf(v);
				});
			},

			getProdectDetail(goodsId) {
				this.$request.post("/product/detail", {
					product_id: goodsId
				}).then((res) => {
					if (res.code == 1) {
						let productData = res.data
						// if(productData.findWholesale==1){
						// 	let amount = Number(productData.min_price)*Number(productData.discount)/10;
						// 	amount=amount.toFixed(2)
						// 	let wholesaleAmount=amount*(10-Number(productData.discount))/10/10;
						// 	wholesaleAmount=wholesaleAmount.toFixed(2)
						// 	productData.wholesaleAmount=wholesaleAmount;
						// 	productData.discountAmount=amount;
						// }
						this.productDetail = productData
						this.banner=res.data.pictures_path;
						this.specList = productData.goods_spec || [];
						this.checkedGoods = productData
						let htmlcont = this.productDetail.content
						let regex0 = new RegExp("(i?)(\<img)([^\>]+\>)", "gmi") //正则匹配表达式
						this.productDetail.content = htmlcont.replace(regex0,"$2 style='width:100%;' $3")
						console.log("res.data.goods_spec", productData)
						let goodsItem = productData.goods_item || [];
						this.outOfStock = goodsItem.filter(item => item.stock == 0)
						// 找出库存不为0的
						const resultArr = goodsItem.filter(item => item.stock != 0)
						// if (resultArr.length != 0) {
						// 	resultArr[0].spec_value_ids_arr = resultArr[0].spec_value_ids.split(',');
						// 	if(productData.findWholesale==1){
						// 		let amount = Number(resultArr[0].price)*Number(productData.discount)/10;
						// 			amount=amount.toFixed(2)
						// 		let wholesaleAmount=amount*(10-Number(productData.discount))/10/10;
						// 		wholesaleAmount=Math.floor(wholesaleAmount)
						// 		resultArr[0].wholesaleAmount=wholesaleAmount;
						// 		resultArr[0].discountAmount=amount
						// 	}
						// 	this.checkedGoods = resultArr[0]
						// } else {
						// 	// 无法选择
						// 	goodsItem[0].spec_value_ids_arr = []

						// 	this.disable = goodsItem.map(item => item.spec_value_ids.split(','));
						// 	this.checkedGoods = goodsItem[0]
						// }
					} else {
						if (res.show == 1) {
							this.tui.toast(res.msg);

						}
					}
				}).catch((res) => {})
			},
			ruleHandleClick(e) {
				this.ruleIndex = e.currentTarget.dataset.index
			},
			bannerChange: function(e) {
				this.bannerIndex = e.detail.current;
			},
			previewImage: function(e) {
				let index = e.currentTarget.dataset.index;
				uni.previewImage({
					current: this.banner[index],
					urls: this.banner
				});
			},
			back: function() {
				uni.navigateBack();
			},

			showPopup: function(n) {
				this.showPopupType = n
				this.popupShow = true;
			},
			hidePopup: function() {
				this.popupShow = false;
			},
			change: function(e) {
				this.value = e.value;
			},
			openPopup() {
				this.popupShow = true;
			},
			evaluate() {
				this.tui.href('/pages/index/goodsEvaluate/goodsEvaluate')
			},
			common: function() {
				this.tui.toast('功能开发中~');
			},
			submit() {
				let {
				    checkedGoods,
				} = this;
				// if(this.specValueText.indexOf('请选择') != -1) return this.tui.toast({
				//     title: this.specValueText
				// })
				if(checkedGoods.stock == 0) return this.tui.toast({
				    title: '当前选择库存不足'
				})
				    checkedGoods.goodsNum = this.value;
				this.popupShow = false;
				// let ruleInfo = this.productDetail.goods_spec[this.ruleIndex]
				let isLogin = this.tui.isLogin()
				if (isLogin) {
					uni.navigateTo({
						url: '/pages/order/submitOrder/submitOrder?goodsId=' + this.productDetail.id + "&num=" +
							this.value + "&ruleId=" + checkedGoods.id || 0
					});
				} else {
					uni.redirectTo({
						url: "/pages/tabbar/index/index"
					})
				}

			},
			coupon() {
				uni.navigateTo({
					url: '/pages/index/coupon/coupon'
				});
			},
			shop() {
				this.tui.href('/pages/index/shop/shop')
			},
			play(type) {
				if(type==1){
					uni.navigateTo({
						url: '/pages/index/productVideo/productVideo?videoUrl='+this.productDetail.video,
						animationType: 'zoom-out'
					})
				}
			
			},
			showSharePopup() {
				this.sharePopup = true
			},
			hideSharePopup() {
				this.sharePopup = false
			},
		
			hideModal() {
				this.modalShow = false;
			},
			savePic() {
				if (this.posterImg) {
					// #ifdef H5
					uni.previewImage({
						urls: [this.posterImg]
					});
					// #endif

					// #ifndef H5
					poster.saveImage(this.posterImg);
					// #endif

					this.hideModal();
				}
			}
		},
		onPageScroll(e) {
			let scroll = e.scrollTop <= 0 ? 0 : e.scrollTop;
			let opcity = scroll / this.scrollH;
			if (this.opcity >= 1 && opcity >= 1) {
				return;
			}
			this.opcity = opcity;
			this.iconOpcity = 0.5 * (1 - opcity < 0 ? 0 : 1 - opcity);
		}
	};
</script>

<style>
	.explain {
		font-size: 100;
		padding: 20rpx 0;
		margin-bottom: 40rpx;
		border-bottom: 1px solid #F6F5F5;
		color: #999999;
	}

	.tip-box {
		bottom: 20rpx;
		width: 100%;
	}

	.banner-smallBox {
		width: 50%;
		display: flex;
		justify-content: center;
	}

	.banner-box {
		border-radius: 100rpx;
		color: #FFFFFF;
		background-color: #000000;
		width: 100rpx;
		text-align: center;
		opacity: 0.6;
	}

	page {
		background-color: #f7f7f7;
	}

	.format {
		border: 1px solid rgb(243, 152, 0);
		padding: 6rpx 10rpx;
		font-size: 24rpx;
		margin: 10rpx 0;
		color: #666;
		border-radius: 10rpx;
	}

	.info-title {
		color: #A7A7A7;
		font-size: 26rpx;
	}

	.container {
		/* padding-bottom: 110rpx; */
	}

	.tui-header-box {
		width: 100%;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 995;
	}

	.tui-header {
		width: 100%;
		font-size: 18px;
		line-height: 18px;
		font-weight: 500;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-header-icon {
		position: fixed;
		top: 0;
		left: 10px;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		height: 32px;
		transform: translateZ(0);
		z-index: 9999;
	}

	.tui-header-icon .tui-badge {
		background: #e41f19 !important;
		position: absolute;
		right: -4px;
	}

	.tui-icon-ml {
		margin-left: 20rpx;
	}

	.tui-icon-box {
		position: relative;
		height: 20px !important;
		width: 20px !important;
		padding: 6px !important;

		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-banner-swiper {
		position: relative;
	}

	.tui-video__box {
		width: 166rpx;
		height: 60rpx;
		position: absolute;
		left: 50%;
		bottom: 50rpx;
		transform: translateX(-50%);
		z-index: 2;
	}

	.tui-video__box image {
		width: 166rpx;
		height: 60rpx;
	}

	.tui-video__box view {
		width: 100%;
		height: 100%;
		font-size: 24rpx;
		position: absolute;
		left: 0;
		top: 0;
		display: flex;
		align-items: center;
		padding-left: 66rpx;
		box-sizing: border-box;
	}

	.tui-banner-tag {
		position: absolute;
		color: #fff;
		bottom: 30rpx;
		right: 0;
	}

	.tui-slide-image {
		width: 100%;
		display: block;
	}

	/*顶部菜单*/

	.tui-menu-box {
		box-sizing: border-box;
	}

	.tui-menu-header {
		font-size: 34rpx;
		color: #fff;
		height: 32px;
		display: flex;
		align-items: center;
	}

	.tui-menu-itembox {
		color: #fff;
		padding: 40rpx 10rpx 0 10rpx;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		font-size: 26rpx;
	}

	.tui-menu-item {
		width: 22%;
		height: 160rpx;
		border-radius: 24rpx;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		background: rgba(0, 0, 0, 0.4);
		margin-right: 4%;
		margin-bottom: 4%;
	}

	.tui-menu-item:nth-of-type(4n) {
		margin-right: 0;
	}

	.tui-badge-box {
		position: relative;
	}

	.tui-badge-box .tui-badge-class {
		position: absolute;
		top: -8px;
		right: -8px;
	}

	.tui-msg-badge {
		top: -10px;
	}

	.tui-icon-up_box {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-menu-text {
		padding-top: 12rpx;
	}

	.tui-opcity .tui-menu-text,
	.tui-opcity .tui-badge-box {
		opacity: 0.5;
		transition: opacity 0.2s ease-in-out;
	}

	/*顶部菜单*/

	/*内容 部分*/

	.tui-padding {
		padding: 0 30rpx;
		box-sizing: border-box;
	}

	.tui-ml-auto {
		margin-left: auto;
	}

	/* #ifdef H5 */
	.tui-ptop {
		padding-top: 44px;
	}

	/* #endif */

	.tui-size {
		font-size: 24rpx;
		line-height: 24rpx;
	}

	.tui-gray {
		color: #999;
	}

	.tui-icon-red {
		color: #ff201f;
	}

	.tui-border-radius {
		/* border-bottom-left-radius: 24rpx; */
		/* border-bottom-right-radius: 24rpx; */
		overflow: hidden;
	}

	.tui-radius-all {
		overflow: hidden;
	}

	.tui-mtop {
		margin-top: 26rpx;
	}

	.tui-pro-detail {
		box-sizing: border-box;
		color: #333;
	}

	.tui-product-title {
		background: #fff;
		padding: 30rpx 0;
	}

	.tui-pro-pricebox {
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #ff201f;
		font-size: 36rpx;
		font-weight: bold;
		line-height: 44rpx;
	}

	.tui-pro-price {
		display: flex;
		align-items: center;
	}

	.tui-price {
		font-size: 58rpx;
	}

	.tui-original-price {
		font-size: 26rpx;
		line-height: 26rpx;
		padding: 10rpx 30rpx;
		box-sizing: border-box;
	}

	.tui-line-through {
		text-decoration: line-through;
	}

	.tui-collection {
		color: #333;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		height: 44rpx;
	}

	.tui-scale-collection {
		transform: scale(0.7);
		transform-origin: center 90%;
		line-height: 24rpx;
		font-weight: normal;
		margin-top: 4rpx;
	}

	.tui-pro-titbox {
		font-size: 32rpx;
		font-weight: 500;
		position: relative;
		padding: 0 30rpx;
		box-sizing: border-box;
	}

	.tui-pro-title {
		padding-top: 20rpx;
	}

	.tui-share-btn {
		flex: 1;
		display: block;
		background: transparent;
		margin: 0;
		padding: 0;
		border-radius: 0;
		border: 0;
		line-height: 1;
	}

	.tui-share-btn::after {
		border: 0;
	}

	.tui-share-box {
		display: flex;
		align-items: center;
	}

	.tui-share-position {
		position: absolute;
		right: 0;
		top: 30rpx;
	}

	.tui-share-text {
		padding-left: 8rpx;
	}

	.tui-sub-title {
		padding: 20rpx 0;
		line-height: 32rpx;
	}

	.tui-sale-info {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 30rpx;
	}

	.tui-discount-box {
		background: #fff;
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

	.tui-right {
		position: absolute;
		right: 30rpx;
		top: 30rpx;
	}

	.tui-top40 {
		top: 40rpx !important;
	}

	.tui-bold {
		font-weight: bold;
	}



	.tui-last::after {
		border-bottom: 0 !important;
	}

	.tui-flex-center {
		display: flex;
		align-items: center;
	}


	.tui-cell-title {
		width: 66rpx;
		padding-right: 30rpx;
		flex-shrink: 0;
	}

	.tui-promotion-box {
		display: flex;
		align-items: center;
		padding: 10rpx 0;
		width: 80%;
	}

	.tui-promotion-box text {
		width: 70%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.tui-basic-info {
		background: #fff;
	}

	.tui-addr-box {
		width: 76%;
	}

	.tui-addr-item {
		padding: 10rpx;
		line-height: 34rpx;
	}

	.tui-guarantee {
		background: #fdfdfd;
		display: flex;
		flex-wrap: wrap;
		padding: 20rpx 30rpx 30rpx 30rpx;
		font-size: 24rpx;
	}

	.tui-guarantee-item {
		color: #999;
		padding-right: 30rpx;
		padding-top: 10rpx;
	}

	.tui-pl {
		padding-left: 4rpx;
	}

	.tui-cmt-box {
		background: #fff;
	}

	.tui-between {
		justify-content: space-between !important;
	}

	.tui-cmt-all {
		color: #F73037;
		padding-right: 8rpx;
	}

	.tui-cmt-content {
		font-size: 26rpx;
	}

	.tui-cmt-user {
		display: flex;
		align-items: center;
	}

	.tui-acatar {
		width: 60rpx;
		height: 60rpx;
		border-radius: 30rpx;
		display: block;
		margin-right: 16rpx;
	}

	.tui-cmt {
		padding: 14rpx 0;
	}

	.tui-attr {
		font-size: 24rpx;
		color: #999;
		padding: 6rpx 0;
	}

	.tui-cmt-btn {
		padding: 50rpx 0 30rpx 0;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-nomore-box {
		padding-top: 10rpx;
	}

	.tui-product-img {
		display: flex;
		flex-direction: column;
		transform: translateZ(0);
	}

	.tui-product-img image {
		width: 100%;
		display: block;
	}

	/*底部操作栏*/

	.tui-col-5 {
		width: 41.66666667%;
	}

	.tui-operation {
		width: 100%;
		height: 100rpx;
		background: rgba(255, 255, 255, 0.98);
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: space-between;
		z-index: 10;
		bottom: 0;
		left: 0;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-safearea-bottom {
		width: 100%;
		height: env(safe-area-inset-bottom);
	}

	.tui-operation::before {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		border-top: 1rpx solid #eaeef1;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
	}

	.tui-operation-left {
		display: flex;
		align-items: center;
	}

	.tui-operation-item {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		position: relative;
	}

	.tui-operation-text {
		font-size: 22rpx;
		color: #333;
	}

	.tui-opacity {
		opacity: 0.5;
	}

	.tui-scale-small {
		transform: scale(0.9);
		transform-origin: center center;
	}

	.tui-operation-right {
		height: 100rpx;
		padding: 0 12rpx;
		box-sizing: border-box;
	}

	.tui-right-flex {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-flex-1 {
		flex: 1;
		padding: 6rpx;
	}

	/*底部操作栏*/

	/*底部选择弹层*/

	.tui-popup-class {
		border-top-left-radius: 24rpx;
		border-top-right-radius: 24rpx;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-popup-box {
		position: relative;
		padding: 30rpx 0 100rpx 0;
	}

	.tui-popup-btn {
		width: 100%;
		position: absolute;
		left: 0;
		bottom: 0;
	}

	/* .tui-popup-btn .tui-btn-class {
		width: 90% !important;
		display: block !important;
		font-size: 28rpx !important;
	} */

	/* .tui-icon-close {
		position: absolute;
		top: 30rpx;
		right: 30rpx;
	} */

	.tui-product-box {
		display: flex;
		align-items: flex-end;
		font-size: 24rpx;
		padding-bottom: 30rpx;
	}

	.tui-popup-img {
		height: 200rpx;
		width: 200rpx;
		border-radius: 24rpx;
		display: block;
	}

	.tui-popup-price {
		padding-left: 20rpx;
		padding-bottom: 8rpx;
		margin-bottom: 140rpx;
	}

	.tui-amount {
		color: #ff201f;
		font-size: 36rpx;
	}

	.tui-number {
		font-size: 24rpx;
		line-height: 24rpx;
		padding-top: 12rpx;
		color: #999;
	}

	.tui-popup-scroll {
		height: 600rpx;
		font-size: 26rpx;
	}

	.tui-scrollview-box {
		padding: 0 30rpx 60rpx 30rpx;
		box-sizing: border-box;
	}

	.tui-attr-title {
		padding: 10rpx 0;
		color: #333;
	}

	.tui-attr-box {
		font-size: 0;
		padding: 20rpx 0;
	}

	.tui-attr-item {
		max-width: 100%;
		min-width: 200rpx;
		height: 64rpx;
		display: -webkit-inline-flex;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: #f7f7f7;
		padding: 0 26rpx;
		box-sizing: border-box;
		border-radius: 20rpx;
		margin-right: 20rpx;
		margin-bottom: 16rpx;
		font-size: 26rpx;
	}

	.tui-attr-active {
		background: #fcedea !important;
		color: #e41f19;
		font-weight: bold;
		position: relative;
	}

	.tui-attr-active::after {
		content: '';
		position: absolute;
		border: 1rpx solid #e41f19;
		width: 100%;
		height: 100%;
		border-radius: 16rpx;
		left: 0;
		top: 0;
	}

	.tui-number-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx 0 30rpx 0;
		box-sizing: border-box;
	}

	/*底部选择弹层*/

	/*分享弹层*/
	.tui-share__box {
		width: 100%;
		height: 380rpx;
		background-color: #fff;
	}

	.tui-share__header {
		padding: 40rpx 0;
		text-align: center;
		font-size: 32rpx;
		font-weight: 500;
		color: #333333;
		text-align: center;
		position: relative;
	}

	.tui-close__box {
		position: absolute;
		right: 25rpx;
		top: 25rpx;
	}

	.tui-share__list {
		width: 100%;
		padding-top: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-share__item {
		flex: 1;
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.tui-share__item image {
		width: 120rpx;
		height: 120rpx;
	}

	.tui-share__text {
		font-size: 28rpx;
		font-weight: 400;
		color: #333333;
		padding-top: 18rpx;
	}

	/*海报modal弹层*/
	.tui-poster__canvas {
		background-color: #fff;
		position: absolute;
		left: -9999px;
	}

	.tui-poster__box {
		width: 100%;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.tui-close__img {
		width: 48rpx;
		height: 48rpx;
		position: absolute;
		right: 0;
		top: -60rpx;
	}

	.tui-poster__img {
		width: 560rpx;
		height: 890rpx;
		border-radius: 20rpx;
		margin-bottom: 40rpx;
	}

	.tui-share__tips {
		font-size: 24rpx;
		transform: scale(0.8);
		transform-origin: center center;
		color: #ffffff;
		padding-top: 12rpx;
	}

	.tui-btnbox-4 {
		margin-bottom: 30rpx;
	}

	.name {
		padding: 20rpx 24rpx;
		flex: 1;
	}

	.spec-item {
		line-height: 52rpx;
		padding: 8rpx 36rpx;
		background-color: #F4F4F4;
		border-radius: 60rpx;
		margin: 0 20rpx 20rpx 0;
		border: 1px solid #F4F4F4;
	}

	.text {
		width: 100rpx;
	}

	/* 定义字体颜色 */
	.primary {
		color: $-color-primary;
	}

	.xs {
		font-size: 24rpx;
	}

	.ml20 {
		margin-left: 20rpx;
	}

	.mb20 {
		margin-bottom: 20rpx;
	}

	/* 定义常用的弹性布局 */
	.wrap {
		flex-wrap: wrap;
	}

	.row {
		display: flex;
		align-items: center;
	}

	// 底部按钮无法选择
	.disabled {
		opacity: 0.4;
	}

	.checked {
		color: #FFFFFF;
		background-color: #F73037 !important;
		color: $-color-primary;
		border-color: $-color-primary;
	}
</style>
