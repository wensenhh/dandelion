<template>
	<view class="container">
		<!-- <tui-tabs-two :tabs="tabs" :isFixed="scrollTop>=0" :currentTab="currentTab" selectedColor="#F73037" sliderBgColor="#F73037"
		 @change="change" itemWidth="50%"></tui-tabs-two> -->
		<!--选项卡逻辑自己实现即可，此处未做处理-->
		<view class="tui-order-list" v-if="orderGoods.length==0">
			<view class="none-data-info">
				<image src="/static/images/my/collect-none.png"  mode=""></image>
				
			</view>
		</view>
		<view :class="{'tui-order-list':scrollTop>=0}"  v-else>
			<view class="tui-order-item" v-for="(item,index) in orderGoods" :key="index">
		
				<!-- <tui-list-cell :hover="false" :lineLeft="false"  :unlined="true"> 
					<view class="tui-goods-title">
						<view class="item-title-center">
								<image src="/static/images/my/order_item_shop.png" class="icon-order-item" mode=""></image>
							<text>蒲公英商城</text>
						</view>
						<view class="tui-order-status">{{item.status}}</view>
					</view>
				</tui-list-cell> -->
				<!-- <block v-for="(item,index) in orderGoods" :key="index"> -->
					<tui-list-cell padding="0"  @click="detail"  :unlined="true">
						<view class="tui-goods-item">
							<image :src="`/static/images/my/${item.pic}`" class="tui-goods-img"></image>
							<view class="tui-goods-center">
								<view class="tui-goods-name">{{item.goodsName}}</view>
								<view class="tui-goods-attr">{{item.address}}{{item.desc}}{{item.rule}}</view>
								<view class="left-right tui-color-red ">
									<view>￥ {{item.price}}</view>
									<!-- <view>x{{item.num}}</view> -->
									<image src="../../../static/images/my/carticon.png" style="width: 50rpx;height: 50rpx;" mode=""></image>
								</view>
							</view>
							
						</view>
					</tui-list-cell>
				<!-- </block> -->
				<!-- <tui-list-cell :hover="false" unlined>
					<view class="tui-goods-price">
						<view class="tui-size-28 color-999">共{{item.num}}件，</view>
						<view class="tui-size-28">小计：</view>
						<view class="tui-price-large">￥{{item.price}}</view>
					</view>
				</tui-list-cell> -->
				<!-- <view class="tui-order-btn">
					<view class="tui-btn-ml" v-if="item.status=='待付款'?true:false">
						<tui-button type="black" plain width="152rpx" height="56rpx" :size="26" shape="circle" @click="invoiceDetail">取消订单</tui-button>
					</view>
				
					<view class="tui-btn-ml"  v-if="item.status=='待付款'?true:false">
									<tui-button type="danger" plain width="152rpx" height="56rpx" :size="26" shape="circle">去支付</tui-button>
								</view>
					<view class="tui-btn-ml" v-if="item.status=='待发货'||item.status=='待收货'?true:false">
						<tui-button type="black" plain width="152rpx" height="56rpx" :size="26" shape="circle" @click="detail">查看详情</tui-button>
					</view>
					<view class="tui-btn-ml" v-if="item.status=='待评价'?true:false">
						<tui-button type="black" plain width="152rpx" height="56rpx" :size="26" shape="circle" @click="addEvaluate">立刻评价</tui-button>
					</view>
					</view> -->
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

	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabs: [{
					name: "商品(0)"
				}, {
					name: "商铺(0)"
				}],
				// orderGoods:[],
				orderGoods:[{
					id:1,
					goodsName:"水果 苹果",
					pic:"order_item.png",
					address:"广东，深圳，宝安，西乡等",
					desc:"偏远地区不包邮",
					rule:"规格默认",
					num:1,
					price:"26.00",
					status:"待付款"
				},{
					id:2,
					goodsName:"水果 苹果2",
					pic:"order_item.png",
					address:"广东，深圳，宝安，西乡等",
					desc:"偏远地区不包邮",
					rule:"规格默认",
					num:1,
					price:"29.00",
					status:"待付款"
				},
				{
					id:3,
					goodsName:"水果 苹果3",
					pic:"order_item.png",
					address:"广东，深圳，宝安，西乡等",
					desc:"偏远地区不包邮",
					rule:"规格默认",
					num:1,
					price:"25.00",
					status:"待发货"
				},{
					id:4,
					goodsName:"水果 苹果4",
					pic:"order_item.png",
					address:"广东，深圳，宝安，西乡等",
					desc:"偏远地区不包邮",
					rule:"规格默认",
					num:1,
					price:"15.00",
					status:"待发货"
				},
				{
					id:5,
					goodsName:"水果 苹果5",
					pic:"order_item.png",
					address:"广东，深圳，宝安，西乡等",
					desc:"偏远地区不包邮",
					rule:"规格默认",
					num:1,
					price:"35.00",
					status:"待收货"
				},
				{
					id:6,
					goodsName:"水果 苹果6",
					pic:"order_item.png",
					address:"广东，深圳，宝安，西乡等",
					desc:"偏远地区不包邮",
					rule:"规格默认",
					num:1,
					price:"55.00",
					status:"待收货"
				},
				{
					id:7,
					goodsName:"水果 苹果7",
					pic:"order_item.png",
					address:"广东，深圳，宝安，西乡等",
					desc:"偏远地区不包邮",
					rule:"规格默认",
					num:1,
					price:"33.00",
					status:"待评价"
				},
				{
					id:8,
					goodsName:"水果 苹果8",
					pic:"order_item.png",
					address:"广东，深圳，宝安，西乡等",
					desc:"偏远地区不包邮",
					rule:"规格默认",
					num:1,
					price:"37.00",
					status:"待评价"
				}
				],
				currentTab: 1,
				pageIndex: 1,
				loadding: false,
				pullUpOn: true,
				scrollTop: 0
			}
		},
		onLoad(e) {
			
			if(e.type!=""){
				this.currentTab=Number(e.type)
				this.getpagedata(this.currentTab)
			}
		},
		methods: {
			getpagedata(type){
				let url = '/user/userCollect'
				if(type == 0)url = '/user/browHistory'
				this.$request.post(url, {
					page: 1,
					size: 999
				}).then(res => {
					if(res.code == 1){
						
					}
				})
			},
			
			change(e) {
				this.currentTab = e.index
			},
			detail() {
				uni.navigateTo({
					url: '/pages/my/orderDetail/orderDetail'
				})
			},
			invoiceDetail(){
				this.tui.href('/pages/my/invoiceDetail/invoiceDetail')
			},
			addEvaluate(){
				this.tui.href('/pages/my/addEvaluate/addEvaluate')
			}
		},
		onPullDownRefresh() {
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 200);
		},
		onReachBottom() {
			//只是测试效果，逻辑以实际数据为准
			this.loadding = true
			this.pullUpOn = true
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
		/* margin-top: 80rpx; */
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
		max-width: 310rpx;
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
	.color-999{
		color: #999999;
	}
	.left-right{
		display: flex;
		justify-content: space-between;
	}
	.none-data-info{
		text-align: center;
		margin-top: 180rpx;
	}
	.none-data-info image{
		width: 631rpx;
		height: 464rpx;
	}
	.none-text{
		color: #999999;
		font-size: 28rpx;
		
	}
	.icon-order-item{
		width: 55rpx;
		height: 55rpx;
	}
	.item-title-center{
	    display: flex;
	    align-items: center;
	}
</style>
