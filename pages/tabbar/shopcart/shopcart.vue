<template>
	<view class="shop-car">
		<commonCar :list="goodsProducts" @delect="delect" @payshop="payshop" @accounts="accounts">
			<!-- <text>123456</text> -->
		</commonCar>
		<image src="" mode=""></image>
	</view>
</template>

<script>
	import commonCar from '@/components/shopCar/shopCar.vue'
	export default {
		data() {
			return {
				goodsProducts: [{
					name: '蒲公英商城',
					checked: 1,
					goods: []
				}],
			}
		},
		components: {
			commonCar
		},
		onLoad() {
		},
		onShow() {
			this.getcartlist()	
		},
		methods: {
			getcartlist(){
				this.$request.post('/cart/cartList').then(res => {
					if(res.code == 1){
						let list = res.data
						let newlist = []
						for(let i=0;i<list.length;i++){
							newlist.push({
								img: list[i].product.main_picture_path,
								title: list[i].product.name,
								remark: '',
								price: list[i].product.price,
								number: list[i].quantity,
								checked: 1,
								id: list[i].product.id
							})
						}
						this.goodsProducts[0].goods = newlist
						console.log(this.goodsProducts)
					}
				})
			},
			payshop(e){
				console.log(e);
				let list = e[0].goods
				let goodid = []
				let numlist = []
				list.filter(item => {
					console.log(item)
					return item.checked == 2
				})
				for(let i=0;i<list.length;i++){
					if(list[i].checked == 2){
						goodid.push(list[i].id)
						numlist.push(list[i].number)
					}
				}
				
				let isLogin = this.tui.isLogin()
				if (isLogin) {
					uni.navigateTo({
						url: '/pages/order/submitOrder/submitOrder?goodsId=' + goodid.toString() + "&num=" +
							numlist.toString() + "&ruleId=0"
					});
				} else {
					uni.redirectTo({
						url: "/pages/tabbar/index/index"
					})
				}
				return false
				this.$request.post('/cart/destroyCart',{
					cart_id: newlist.join(',')
				}).then(res => {
					if(res.code == 1){
						uni.showToast({
							title: '删除成功！',
						})
						this.getcartlist()
					}else{
						uni.showToast({
							title: res.msg,
							icon:'error'
						})
					}
				})
			},
			delect(e){
				console.log(e);
				let list = e[0].goods
				let newlist = []
				list.filter(item => {
					console.log(item)
					return item.checked == 2
				})
				for(let i=0;i<list.length;i++){
					if(list[i].checked == 2){
						newlist.push(list[i].id)
					}
				}
				this.$request.post('/cart/destroyCart',{
					cart_id: newlist.join(',')
				}).then(res => {
					if(res.code == 1){
						uni.showToast({
							title: '删除成功！',
						})
						this.getcartlist()
					}else{
						uni.showToast({
							title: res.msg,
							icon:'error'
						})
					}
				})
			},
			accounts(e){
				console.log(e);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.shop-car {
		width: 750rpx;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: #F5F5F5;
	}
</style>
