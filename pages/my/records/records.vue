<template>
	<view class="container">
		<view class="record-header display-f align-items">
			<view class="operate p-r">
				<view class="tui-between" @click="show__1=true">
					<view>
						{{type}}
					</view>
					<view>
						<tui-icon color="#333" class="p-a turningdown" size="20" name="turningdown"></tui-icon>
					</view>
				</view>
			</view>
			<view class="operate p-r">
				<view class="tui-between" @click="show__2=true">
					<view>
						{{time}}
					</view>
					<view>
						<tui-icon color="#333" class="p-a turningdown" size="20" name="turningdown"></tui-icon>
					</view>
				</view>
			</view>
			<view class="ml-auto text-right dataBox">
				<p>消费:{{recordsData.diff_sum_money}}</p>
				<p>收入:{{recordsData.add_sum_money}}</p>
			</view>
		</view>
		<view class="tui-records__list">
			<tui-list-cell style="background-color: #fafafa !important; " :hover="false"
				v-for="(model,subIndex) in requestData" :key="subIndex">
				<view class="tui-records__item">
					<view>
						<view class="tui-source_type">{{model.source_type}}</view>
						<view class="tui-desc">{{model.create_time}}</view>
					</view>
					<view class="tui-right__box">
						<view class="tui-change_amount" :class="{'tui-expend':model.change_type==2}">
							{{model.change_amount}}
						</view>
					</view>
				</view>
			</tui-list-cell>

		</view>
		<tui-picker :show="show__1" :pickerData="items__1" @hide="hide" @change="changePic"></tui-picker>
		<tui-picker :show="show__2" :pickerData="items__2" @hide="hide2" @change="change"></tui-picker>
	</view>
</template>

<script>
	import {
		loadingFun
	} from '@/utils/tools'
	import {
		getAccountLog,
	} from '@/api/user';
	import {
		loadingType
	} from '@/utils/type';
	export default {
		data() {
			return {
				show__1: false,
				show__2: false,
				items__1: [{
						text: "余额明细",
						value: 1
					}, {
						text: "农批券明细",
						value: 2
					}, {
						text: "收益明细",
						value: 3
					}, {
						text: "电子积分明细",
						value: 4
					},
					{
						text: "农豆明细",
						value: 5
					}
				],
				items__2: [{
					text: "全部",
					value: ""
				}, {
					text: "增加",
					value: 1
				}, {
					text: "减少",
					value: 2
				}],
				currentTab: 0,
				//模拟请求返回数据
				requestData: [

				],
				recordsData: {},
				type: "余额明细",
				type2: "变动类型",
				source: 1,
				source2: "",
				time: "变动类型",
				page: 1
			}
		},
		onLoad(option) {
			if (option.source != '' && option.source != undefined) {
				this.source = option.source;
				this.type = this.items__1[option.source - 1].text
			}
			this.reflesh()
		},

		methods: {
			reflesh() {
				this.page = 1
				this.requestData = []
				this.status = loadingType.LOADING
				this.getAccountLogFun();
			},
			reload() {
				this.status = loadingType.LOADING
				this.getAccountLogFun();
			},
			async getAccountLogFun() {
				let {
					page,
					requestData,
					status
				} = this;
				const data = await loadingFun(getAccountLog, page, requestData, status, {
					type: this.source2,
					source: this.source
				})
				if (!data) return
				console.log("data.page", data.page, data.dataList.length)
				this.page = data.page;
				this.requestData = data.dataList;
				this.status = data.status;
				this.recordsData = data.data
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
				this.getAccountLogFun()
				setTimeout(() => {
					this.loadding = false
					this.pullUpOn = false
				}, 1000)
			},

			show: function(e) {
				this.$refs.dateTime.show();
			},
			change: function(e) {
				//选择的结果
				this.time = e.text
				this.source2 = e.value
				this.reflesh()
			},
			hide(e) {
				this.show__1 = false
			},
			hide2(e) {
				this.show__2 = false
			},
			changePic(e) {
				this.type = e.text
				this.source = e.value
				this.reflesh()
			},

		},
		onPullDownRefresh() {
			item.pageIndex = 1;
			item.loading = false;
			item.pullUpOn = true;
			item.noData = false;
		},
		onReachBottom() {}
	}
</script>

<style>
	.dataBox {
		font-size: 25rpx;
		font-weight: 400;
		color: #2C2D2C;
	}

	.turningdown {
		top: 0;
		right: - 50rpx;
	}

	/* .turningdown{
		top: 0;
		left: 90rpx;
	} */
	.record-header {
		background-color: #EBEBEB;
		padding: 30rpx 20rpx;

	}

	.operate {
		margin-right: 20rpx;
		font-size: 12px;
		background: #fff;
		padding: 0px 20px;
		border-radius: 50rpx;
		min-width: 100rpx;
		max-width: 200rpx;
		line-height: 50rpx;
	}

	.container {
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-records__list {
		margin-top: 20rpx;
	}

	.tui-records__item {
		width: 100%;
		display: flex;
		align-items: center;
	}

	.tui-icon {
		width: 42rpx;
		height: 42rpx;
		margin-left: 30rpx;
	}

	.tui-source_type {
		font-size: 30rpx;
		font-weight: 400;
		color: #333333;
	}

	.tui-desc {
		font-size: 24rpx;
		font-weight: 400;
		color: #888888;
		padding-top: 12rpx;
	}

	.tui-right__box {
		margin-left: auto;
		text-align: right;
	}

	.tui-change_amount {
		font-size: 30rpx;
		font-weight: 400;
		color: #EB0909;
	}

	.tui-expend {
		color: #19be6b !important;
	}

	.tui-between {
		display: flex;
		justify-content: space-between;
	}
</style>
