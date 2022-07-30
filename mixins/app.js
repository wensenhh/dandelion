
import {
	mapGetters,
	mapMutations
} from 'vuex'
import wechath5 from '@/utils/wechath5'

import {isWeixinClient, currentPage, paramsToStr, acountList} from '@/utils/tools'
import Cache from "@/utils/cache"
import {inputInviteCode} from "@/api/user"
import {BACK_URL} from '@/config/cachekey'
export default {
	data() {
		return {
            primaryColor: "#FF2C3C"
		};
	},
	async onLoad(option) {
     // #ifdef H5
	 const route = currentPage().route
	 // 记录登录后要返回的路径
	 if (!acountList.includes(route) && !this.isLogin) {
	 	Cache.set(BACK_URL, `/${route}${paramsToStr(option)}`)
	 }
     if (isWeixinClient()) {
		 // jssdk配置
        await wechath5.config()
        if((['pages/goods_details/goods_details', "bundle/pages/bargain_process/bargain_process"].includes(route))) {
            return;
        }
     }
     // #endif
        
	},
	methods: {
		wxShare(options) {
			const shareInfo = Cache.get("shareInfo")
			const sym = window.location.href.includes('?') ? '&' : '?'
			const option = {
				shareTitle: "100%开源免费商用电商系统",
				shareLink: window.location.href + sym + "invite_code=" +  this.$store.getters.inviteCode,
				shareImage: "",
				shareDesc: "likeshop已经把小程序、安卓APP、苹果APP都免费开源出来了"
			}
            if(!options) {
				if(shareInfo) {
					option.shareImage = shareInfo.h5_share_image
					option.shareTitle = shareInfo.h5_share_title
					option.shareDesc = shareInfo.h5_share_intro
				}
                wechath5.share(option)
            } else {
                wechath5.share(options)
            }
		}
	},
	computed: {
		// ...mapGetters(['isLogin']),
	},
	
	// 全局配置分享
	onShareAppMessage() {
		const shareInfo = Cache.get("shareInfo")
		const share = {
			title: "蒲公英",
			path: "/pages/tabbar/index/index",
			imageUrl: shareInfo.mnp_share_image
		}
		return share
	},
	
	onShareTimeline() {	
		const shareInfo = Cache.get("shareInfo")
		const share = {
			title: shareInfo.mnp_share_title,
			imageUrl: shareInfo.mnp_share_image
		}
		return share
	}
};
