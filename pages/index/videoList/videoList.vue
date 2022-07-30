<template>
	<view style="height: 100%;background-color: #333333;">
	
		<swiper class="swiper" :duration="duration" :vertical="true" @change="onChange" :current="activeIndex">
			<swiper-item v-for="(item,index) in dataList.list" :key="index" @click="cs(item)">
				<view class="swiper-item" v-if="activeIndex >= (index-1)">
					<!-- <image :src="item.image_url" mode="aspectFill"></image> -->
					<!-- <video class="tui-video"
						src="https://1251542705.vod2.myqcloud.com/4a8d9c67vodtransgzp1251542705/f7b5199b5285890805797463637/v.f100820.mp4"
						enable-danmu controls >
					</video> -->
					<video :id="'videoPlayer'+index"  class="tui-video"
						:src="item.video_url"
						@play="playVideo"
						enable-danmu controls :autoplay="activeIndex === index" >

						<cover-view class="info-box display-f">
							<cover-view class="user-info">
								<cover-view class="user-pic">
									<cover-image :src="item.upload_logo" mode=""></cover-image >
								</cover-view>
								<cover-view class="">
									<cover-view class="size_16 m-top20 text-view">{{item.upload_user}}</cover-view>
									<!-- <view>第1集 | 这是个什么作品</view> -->
									<!-- <view class="size_12">合集名称第{{index+1}}个用户原创</view> -->
								</cover-view>
							</cover-view>
							<cover-view class="ml-auto"  @click="changeCol" :data-index="index">
								<cover-image src="/static/images/frovaies.png" class="frovaies_icon" mode="" v-if="color !== 'red'"></cover-image >
								<cover-image src="/static/images/frovaies_selected.png" class="frovaies_icon" mode="" v-else></cover-image >
								<cover-view class="user-name great text-view">
									{{item.collection_count}}
									<!-- {{item.collection_count}} -->
								</cover-view>
							</cover-view>
							
						</cover-view>
										
					</video>
					
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	// import uniIcons  from '@/components/uni-icons/uni-icons'
	
	export default {
		// components: {uniIcons},
		data() {
			return {
				listType: 1,
				activeIndex: 0,
				duration: 300,
				rows: 10,
				page: 1,
				agoId:"videoPlayer0",
				color:"#FDFDFD",
				dataList: [
					'https://www.runoob.com/try/demo_source/movie.mp4',
					'https://1251542705.vod2.myqcloud.com/4a8d9c67vodtransgzp1251542705/f7b5199b5285890805797463637/v.f100820.mp4',
					'https://www.runoob.com/try/demo_source/movie.mp4',
					'https://1251542705.vod2.myqcloud.com/4a8d9c67vodtransgzp1251542705/f7b5199b5285890805797463637/v.f100820.mp4'
				],
				
			}
		},
		onLoad() {
			this.getVideoList();
			uni.createVideoContext(this.agoId,this).play()
		},
		methods: {
			cs(info){
				console.log(info);
			},
			getVideoList(){
				this.tui.request("/video/lists","POST",{}).then((res)=>{
				if(res.code==1){
				this.dataList=res.data
				}else{
					if (res.show == 1) {
						this.tui.toast(res.msg);
						
					} 
				}
				}).catch((res)=>{
				})
			},
			changeCol(e){
				let videoIndo=this.dataList.list[e.currentTarget.dataset.index]
				console.log(e,e.currentTarget.dataset.index)
				if(this.color=='red'){
					this.color='#FDFDFD'
				}else{
					this.color="red"
				}
				this.videoOperation(videoIndo.id,"commend")
			},
			videoOperation(videoId,type){
				this.tui.request("/video/operation","POST",{id:videoId,type:type}).then((res)=>{
				if(res.code==1){
					console.log(res)
				}else{
					if (res.show == 1) {
						this.tui.toast(res.msg);
					} 
				}
				}).catch((res)=>{
				})
			},
			/* 改变类型 */
			changeType(e) {
				this.listType = e.currentTarget.dataset.type;
				this.page = 1;
				// this.getList();
			},
			/* 获取列表 */
			getList() {
				if (this.page == 1) {
					uni.showLoading({
						title:"正在加载",
						mask:true
					})
				}

				new Promise((success, error) => {
					/* 此处为数据，请自行修改 */
					let getImgs = ()=>{
						let urls = [];
						for(let i=0;i<10;i++){
							urls.push(`/static/images/douyin/${i}.jpg`);
						}
						return urls;
					}
					
					setTimeout(() => {
						success(getImgs())
					}, 500);
				}).then((data) => {
					uni.hideLoading();
					if (this.page == 1) {
						/* 关闭切换效果 */
						this.duration = 0;
						this.$nextTick(() => {
							this.dataList = data;
							/* 切换到轮播第0个 */
							this.activeIndex = 0;

							this.$nextTick(() => {
								/* 恢复切换效果 */
								this.duration = 300;
							})
						});
					} else {
						this.dataList = [...this.dataList, ...data];
					}
					this.page++;
				});

			},
			/* 切换监听 */
			onChange(e) {
				var index = e.detail.current;
				this.activeIndex = index;
				const video="videoPlayer"+index
				// console.log(index);
				// console.log(video);
				uni.createVideoContext(this.agoId,this).pause()
				uni.createVideoContext(video,this).play()
				this.agoId=video
				// let theNode = uni.createVideoContext(video,this)
				// console.log(theNode);
				// console.log(this.$refs.video);
				// if (index == this.dataList.length - 3) {
				// 	console.log("add data");
				// 	// this.getList();
				// }
			},
			playVideo(){
				
			}
		}
	}
</script>

<style lang="scss">
	@import "../../../lib/global.scss";
	.user-pic{
		width: 100rpx;
		height: 100rpx;
		border-radius: 100rpx;
		overflow: hidden;
		margin-right: 20rpx;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.tui-video{
		    height: 100%;
			position: relative;
		    // vertical-align: middle;
		    // display: contents;
	}
	page {
		background-color: #333333;
	}

	page,
	.swiper,
	.swiper-item {
		width: 100%;
		height: 100%;
		video{
			width: 100%;
			position: relative;
			// height: 100%;
		}
	}

	/* 标题栏 */
	.title {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: auto;
		padding-top: var(--status-bar-height);
		z-index: 10;
		background-color: rgba(255, 255, 255, 0.08);
		box-shadow: 0 0 10px rgba(255, 255, 255, 0.08);

		&>view {
			height: 44px;
		}

		.box1 {
			width: 100rpx;
			margin: 0 40rpx;
			font-size: 40rpx;
		}


		.tab {
			&>view {
				margin: 0 30rpx;
				line-height: 64rpx;
				font-size: 32rpx;
				position: relative;
				color: rgba(255, 255, 255, 0.5);
				letter-spacing: 2px;

				&.active {
					color: rgba(255, 255, 255, 1);

					&:after {
						content: '';
						display: block;
						height: 2px;
						position: absolute;
						width: 70%;
						background-color: #fff;
						border-radius: 1px;
						left: 15%;
						bottom: 0;
					}
				}
			}
		}
	}

	.swiper .swiper-item {
		position: relative;
		// background: #FFFFFF;
		overflow: hidden;

		&>image:nth-child(1) {
			display: block;
			width: 100%;
			height: 100%;
			box-sizing: content-box;
			padding: 40px 30px;
			position: absolute;
			z-index: 1;
			top: -40px;
			left: -30px;
			filter: blur(20px);
		}

		&>image:nth-child(2) {
			display: block;
			width: 100%;
			height: 100%;
			position: absolute;
			z-index: 2;
			top: 0;
			left: 0;
		}

		/* 添加阴影遮罩，增强文字显示 */
		&:after {
			content: '';
			display: block;
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			// height: 65%;
			z-index: 3;
			background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
		}
	}

	.info-box {
		.user-info{
			position: absolute;
			bottom: 100rpx;
			left: 20rpx;
			z-index: 4;
		}
		&>view {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}

	.sidebar {
		position: absolute;
		bottom: 100rpx;
		right: 50rpx;
		z-index: 5;
		color: #fff;
		text-align: center;

		.pic {
			margin-bottom: 20rpx;

			&>image {
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
				border: #fff solid 1px;
			}
		}

		.like {
			font-size: 72rpx;
			margin-bottom: 20rpx;

			&>view {
				font-size: 20rpx;
				margin-top: 0;
			}
		}

		.read {
			font-size: 64rpx;
			margin-bottom: 80rpx;

			&>view {
				font-size: 20rpx;
				margin-top: -6rpx;
			}
		}

		.menu {
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			border: rgba(0, 0, 0, 0.5) solid 14rpx;
			box-sizing: border-box;

			&>image {
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
		}

		/* 按钮点击缩放效果 */
		&>view {
			transition: transform 0.05s ease 0s;

			&:active {
				transform: scale(0.95, 0.95);
			}
		}
		
	}
	.ml-auto{
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		position: absolute;
		bottom: 120rpx;
		right: 20rpx;
		z-index: 4;
	}
	.text-view{
		color: #fff
	}
	.frovaies_icon{
		width: 52rpx;
		margin-bottom: 10rpx;
	}
</style>
