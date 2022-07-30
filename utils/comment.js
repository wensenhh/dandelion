export default {
	mamberCodeOpen(){
		uni.navigateTo({
			url:'/pages/my/memberCode/memberCode'
		})
	},
	scanCode(){
		uni.scanCode({
		    success: function (res) {
		        console.log('条码类型：' + res.scanType);
		        console.log('条码内容：' + res.result);
		    }
		});
	}
}