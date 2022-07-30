import request from '@/utils/request'
import{client} from '@/utils/tools'

//下单
export function orderBuy(data) {
	return request.post("order/buy", {...data, order_source:client});
}
//删除订单
export function delOrder(id) {
	return request.post('order/del', {
		id
	})
}

// 获取配送方式
export function getDelivery() {
	return request.get('order/getDeliveryType')
}

//订单列表
export function getOrderList(data) {
	console.log(data)
	return request.post('orders/orderList', data)
}
//订单详情
export function getOrderDetail(id) {
	return request.get('order/detail', {
		params: {
			id
		}
	})
}

//取消订单
export function cancelOrder(id) {
	return request.post('orders/cancel', {
		order_id: id
	})
}

//物流
export function orderTraces(id) {
	return request.get("order/orderTraces", {
		params: {
			id
		}
	})
}

//确认收货
export function confirmOrder(id) {
	return request.post("orders/submit", {
		order_id: id
	})
}


//下单获取优惠券
export function getOrderCoupon(data) {
  return request.post("coupon/orderCoupon", data);
} 


// 核销订单
export function getVerifyLists(data) {
	return request.get('order/verificationLists', {
		params: data
	})
}
// 核销详情
export function verification(data) {
	return request.post('order/verification', data)
}

// 确认核销
export function verificationConfirm(data) {
	return request.post('order/verificationConfirm', data)
}
