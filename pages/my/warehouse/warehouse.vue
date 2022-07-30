<template>
	<view class="container">
		<view class="header-box">
			<view class="w-18vh text-center">
				商品名称
			</view>
			<view class="w-8vh text-center">
				时间
			</view>
			<view class="w-8vh text-center">
				数量
			</view>
			<view class="w-8vh text-center">
				单价
			</view>
			<view class="w-10vh text-center">
				状态
			</view>
		</view>
		
		<view class="warehouse-box">
		<block v-for="(item,index) in product" :key="index">
			<view class="warehouse-info">
				<view class="w-20vh text-center item-name">
					{{item.name}}
				</view>
				<view class="w-8vh text-center">
				{{item.create_time_short}}
				</view>
				<view class="w-8vh text-center">
					{{item.number}}
				</view>
				<view class="w-8vh text-center">
					{{item.price}}
				</view>
			<view class="w-10vh text-center">
				<tui-button  width="150rpx" shape="" :size="30" type="green" height="68rpx" v-if="item.status==2?true:false">销售完成</tui-button>
				<tui-button  width="150rpx" shape="" :size="30" type="warning" height="68rpx" v-if="item.status==1?true:false">销售中</tui-button>
				<tui-button  width="150rpx" shape="" :size="30" type="gray" height="68rpx" v-if="item.status==0?true:false">待销售 </tui-button>
				</view>
			</view>
		</block>
		</view>
		<loading-view v-if="showLoading" background-color="transparent" :size="50"></loading-view>
	</view>
</template>

<script>
	import {
		loadingFun
	} from '@/utils/tools'
	import {
		getWarehouseList,
	} from '@/api/activity';
	import { loadingType } from '@/utils/type';
	export default {
		data() {
			return {
					showLoading: false,
					page: 1,
				product:[]
			}
		},
		onLoad() {
			 this.reflesh()
			// this.getWarehouse()
		},
		methods: {
			reflesh() {
				this.page = 1
				this.product = []
				this.status = loadingType.LOADING
				this.type = 0
				this.getWarehouseListFun();
			},
			reload() {
				this.status = loadingType.LOADING
				this.getWarehouseListFun();
			},
			async getWarehouseListFun() {
				let {
					page,
					product,
					status
				} = this;
				const data = await loadingFun(getWarehouseList, page, product, status, {
					
				})
				if (!data) return
				console.log("data.page",data.page,data.dataList.length)
				this.page = data.page
				this.product = data.dataList
				this.status = data.status
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
				this.getWarehouseListFun()
				setTimeout(() => {
					this.loadding = false
					this.pullUpOn = false
				}, 1000)
			},
		}
	}
</script>

<style>
page{
	background-color: #F5F5F5;
}
.container{
}
.header-box{
	display: flex;
	font-size: 30rpx;
	background-color: #FFFFFF;
	padding: 20rpx;
}
.warehouse-info{
	display: flex;
	height: 100rpx;
	font-size: 26rpx;
	align-items: center;
}
.w-20vh{
	width: 20vh;
}
.w-8vh{
	width: 8vh;
}

.w-18vh{
	width: 18vh;
}
.w-10vh{
	width: 10vh;
}
.text-center{
	text-align: center;
}
.item-name{
	    text-overflow:ellipsis;
	    overflow:hidden;
	    white-space:nowrap;
		}

</style>
