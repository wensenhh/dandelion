<template>
	<view class="">
		<view class="text-center fen-data">
			<view class="text-center fen-title">我的业绩</view>
			<view class="text-center fen-num">{{fenCount}}</view>
		</view>
		<view class="fen-kong">

		</view>
		<view class=" fen-top">
			<view class="display-f fen-list" v-for=" (item ,index) in fenList" :key="index">
				<!-- <view class="team-pic">
					<image :src="item.avatar" mode=""></image>
				</view> -->
				<view class="">
				<!-- <view class="line-height-30" v-if="item.real_name=='' || item.real_name==undefined">
						姓名：{{item.nickname}}
				</view> -->
				<view class="line-height-30" >
						地址：{{hideaddress(item.name)}}
				</view>
					<!-- <view >
							手机号：{{item.mobile}}
					</view> -->
					<view class="display-f fen-consume">
						<view class="">
							我的业绩：{{item.myperfor}}
						</view>
						<view class="ml-auto">
							团队业绩：{{item.teamperfor}}
						</view>
					</view>
				</view>
				
			</view>
			
			<view class="tui-order-list" v-if="fenList.length==0">
				<view class="none-data-info">
					<image src="/static/images/my/none-data.png" mode=""></image>
					<view class="none-text">
						暂无记录
					</view>
				</view>
			</view>
			
		</view>

	</view>
</template>

<script>
	import {
		loadingFun
	} from '@/utils/tools'
	import {
		getUserFans
	} from '@/api/user';
	import {
		loadingType
	} from '@/utils/type';
	export default {
		data() {
			return {
				pageIndex: 1,
				loadding: false,
				pullUpOn: true,
				page:1,
				fenCount:0,
				size:20,
				fenList: [

				],
				status: loadingType.LOADING
			}
		},
		onLoad() {
			this.reflesh();
		},
		onShow() {
		},
		methods: {
			reflesh() {
				this.page = 1
				this.size = 20
				this.fenList = []
				this.status = loadingType.LOADING
				this.type = 0
				this.getUserFansApi();
			},
			reload() {
				this.status = loadingType.LOADING
				this.getUserFansApi();
			},
			
			async getUserFansApi() {
				let {
					page,
					size,
					active,
					fenList,
				} = this;
				const data = await loadingFun(getUserFans, page, fenList, this.status, {type:"all",size:999})
				if (!data) return
				console.log(data)
				this.page = data.page;
				this.fenList = data.dataList;
				this.fenCount = data.data.userInfo.teamperfor;
				this.status = data.status;
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
				this.getUserFansApi()
				setTimeout(() => {
					this.loadding = false
					this.pullUpOn = false
				}, 1000)
			},
			btnCloseDrop() {
				this.scrollTop = 1;
				this.$nextTick(() => {
					this.scrollTop = 0;
				});
				this.dropScreenShow = false;
				this.attrIndex = -1;
			},
			hideaddress(addr){
				return addr.slice(0, 18) + '***' + addr.slice(-14)
			},
			getFans() {
				this.tui.request("/user/fans", "POST", {
					type: "all"
				}).then((res) => {
					console.log(res)
					if (res.code == 1) {
						this.fenList = res.data
					} else if (res.code == -1) {
						this.tui.setIsLogin(false)
					} else {
						if (res.show == 1) {
							this.tui.toast(res.msg);
						}
					}
				}).catch((res) => {})
			},
		}
	}
</script>

<style lang="scss">
	.tui-order-list {
		margin-top: 80rpx;
	}
	.none-data-info {
		text-align: center;
		margin-top: 180rpx;
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
	.fen-top {
		border-top: 2rpx solid #E5E5E5;
		margin-top: 20rpx;
	}

	.fen-list {
		border-bottom: 2rpx solid #E5E5E5;

		padding: 20rpx 30rpx;

		.team-pic {
			width: 150rpx;
			height: 150rpx;
			border-radius: 100rpx;
			overflow: hidden;
			margin-right: 30rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.fen-consume {
			color: #626262;
			font-size: 26rpx;
			width: 100%;
			margin-top: 10rpx;
		}
	}

	.fen-kong {
		border-left: 10rpx solid #F73037;
		height: 40rpx;
		margin-left: 20rpx;
		margin-top: 20rpx;
	}

	.fen-data {
		color: #F73037;
		margin-top: 40rpx;

		.fen-title {}

		.fen-num {
			font-size: 80rpx;
			font-weight: 800;
		}
	}
	.line-height-30{
		line-height: 60rpx;
	}
</style>
