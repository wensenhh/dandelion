<template>
	<view class="tui-addr-box">
		<form :report-submit="true">
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-line-cell">
					<view class="tui-title">收货人</view>
					<input placeholder-class="tui-phcolor" class="tui-input" name="name" placeholder="姓名"
						maxlength="15" type="text" v-model="sumbitAddressInfo.name" />
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-line-cell">
					<view class="tui-title">手机号码</view>
					<input placeholder-class="tui-phcolor" class="tui-input" name="phone" v-model="sumbitAddressInfo.phone" type="number" placeholder="请填写手机号码"></input>
				</view>
			</tui-list-cell>

				<tui-list-cell :arrow="true" padding="0"  @click="showRegion = true">
					<view class="tui-line-cell">
						<view class="tui-title"><text class="tui-title-city-text">所在城市</text></view>
						<input placeholder-class="tui-phcolor" class="tui-input tui-pr__30" disabled name="city"
							placeholder="省,市,县,街道" maxlength="50" type="text" v-model="addressName" />
					</view>
				</tui-list-cell>
			<tui-list-cell padding="0">
				<view class="tui-line-cell">
					<view class="tui-title">收货地址</view>
					<textarea placeholder-class="tui-phcolor" class="tui-input my-input" name="address"
						placeholder="请输入详细的收货地址" v-model="sumbitAddressInfo.address" maxlength="50" type="text" />
				</view>
			</tui-list-cell>


			<!-- 默认地址 -->
			<tui-list-cell :hover="true" padding="">
				<view class="tui-swipe-cell">
					<view>设为默认地址</view>
					<switch color="#19be6b" class="tui-switch-small" @change="topAddressDedault"
						:checked="sumbitAddressInfo.is_default==1?true:false" />
				</view>
			</tui-list-cell>
			<!-- 保存地址 -->
			<view class="tui-addr-save" @tap.stop="submit">
				<tui-button shadow type="green" height="88rpx" shape="circle">保存收货地址</tui-button>
			</view>
		</form>
		<u-select v-model="showRegion" mode="mutil-column-auto" @confirm="regionChange" :list="areaLists"></u-select>
		
	</view>
</template>

<script>
	import area from '@/utils/area'
	import form from "@/components/common/tui-validation/tui-validation.js"
	export default {
		data() {
			return {
				lists: ["公司", "家", "学校", "其他"],
				value: [0, 0, 0],
				addressName: "",
				addressType: "add",
				addressId: 0,
				showRegion: false,
				areaLists:[],
				defaultRegion:['广东省','广州市','番禺区'],
				defaultRegionCode:'440113',
				sumbitAddressInfo: {
					phone: "",
					name: "",
					province_id: 0,
					city_id: 0,
					district_id: 0,
					address: "",
					is_default: 0,
					province: '',
					city: '',
					district: ''
				}
			}
		},
		onLoad(option) {
			this.addressType = option.addressType
			if (option.addressType == 'edit') {
				uni.setNavigationBarTitle({
					title: '修改收货地址'
				})
				this.addressId = option.addressId
				this.$request.post("/address/detail", {
					id: option.addressId
				}).then((res) => {
					if (res.code == 1) {
						this.sumbitAddressInfo = res.data
						this.addressName = res.data.province + " " + res.data.city + " " + res.data.district;

					} else {
						if (res.show == 1) {
							this.tui.toast(res.msg);
						}
					}
				}).catch((res) => {})
			}
		this.$nextTick(() => {
		    this.areaLists = area;
		})
		},
		methods: {
			regionChange(region) {
				console.log("region",region)
			  this.sumbitAddressInfo.province_id = region[0].value;
			  this.sumbitAddressInfo.city_id = region[1].value;
			  this.sumbitAddressInfo.district_id = region[2].value;
			  this.sumbitAddressInfo.province = region[0].label;
			  this.sumbitAddressInfo.city = region[1].label;
			  this.sumbitAddressInfo.district = region[2].label;
			  this.addressName = region[0].label + " " + region[1].label + " " + region[2].label
			},
			topAddressDedault() {
				if (this.sumbitAddressInfo.is_default == 1) {
					this.sumbitAddressInfo.is_default = 0
				} else {
					this.sumbitAddressInfo.is_default = 1
				}
			},
			submit() {
				let rules = [{
					name: "name",
					rule: ["required", "minLength:2"],
					msg: ["请输入收货人名字", "收货人名字最少二位"]
				}, {
					name: "phone",
					rule: ["required", "isMobile"],
					msg: ["请输入手机号", "请输入正确的手机号"]
				}, {
					name: "address",
					rule: ["required"],
					msg: ["请输入地址"]
				}];
				console.log(",this.sumbitAddressInfo", this.sumbitAddressInfo)
				let checkRes = form.validation(this.sumbitAddressInfo, rules);
				if (!checkRes) {
						let apiUrl = "/address/store"
					if (this.addressType == 'edit') {
						apiUrl = "/address/update"
					}
					this.$request.post(apiUrl, this.sumbitAddressInfo).then((res) => {
						if (res.code == 1) {
							this.tui.toast(res.msg);
							uni.navigateBack({
								delta: 1
							});
						} else {
							if (res.show == 1) {
								this.tui.toast(res.msg);
							}
						}
					}).catch((res) => {})
					uni.setStorageSync('islogin', true);
					this.tui.toast('提交成功');

				} else {
					this.tui.toast(checkRes)
				}

			},
		}
	}
</script>

<style>
	page {
		background-color: #FFFFFF;
	}

	.tui-list-cell::after {
		border-bottom: unset !important
	}

	.tui-cell-arrow::before {
		right: 20px;
	}

	.tui-addr-box {
		padding: 20rpx 0;
	}

	.tui-line-cell {
		width: 100%;
		padding: 24rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}

	.tui-title {
		width: 180rpx;
		font-size: 30rpx;
		flex-shrink: 0;
	}

	.tui-title-city-text {
		width: 180rpx;
		height: 40rpx;
		display: block;
		line-height: 46rpx;
	}

	.tui-input {
		width: 500rpx;
		background-color: #F6F6F6;
		padding: 30rpx 20rpx;
		border-radius: 20rpx;
	}

	.my-input {
		height: 140rpx;
	}

	.tui-pr__30 {
		padding-right: 30rpx;
	}

	.tui-input-city {
		flex: 1;
		height: 40rpx;
		font-size: 28rpx;
		padding-right: 30rpx;
	}

	.tui-phcolor {
		color: #ccc;
		font-size: 28rpx;
	}

	.tui-cell-title {
		font-size: 28rpx;
		flex-shrink: 0;
	}

	.tui-addr-label {
		margin-left: 70rpx;
	}

	.tui-label-item {
		width: 76rpx;
		height: 40rpx;
		border: 1rpx solid rgb(136, 136, 136);
		border-radius: 6rpx;
		font-size: 26rpx;
		text-align: center;
		line-height: 40rpx;
		margin-right: 20rpx;
		display: inline-block;
		transform: scale(0.92);
	}

	.tui-label-active {
		background: #E41F19;
		border-color: #E41F19;
		color: #fff;
	}

	.tui-swipe-cell {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #fff;
		padding: 10rpx 24rpx;
		box-sizing: border-box;
		border-radius: 6rpx;
		overflow: hidden;
		font-size: 28rpx;
	}

	.tui-switch-small {
		transform: scale(0.8);
		transform-origin: 100% center;
	}

	/* #ifndef H5 */
	.tui-switch-small .wx-switch-input {
		margin: 0 !important;
	}

	/* #endif */

	/* #ifdef H5 */
	>>>uni-switch .uni-switch-input {
		margin-right: 0 !important;
	}

	/* #endif */

	.tui-addr-save {
		position: absolute;
		width: 90%;
		left: 5%;
		bottom: 20px;
		background: #fff;
	}

	.tui-del {
		padding: 24rpx 30rpx;
	}
</style>
