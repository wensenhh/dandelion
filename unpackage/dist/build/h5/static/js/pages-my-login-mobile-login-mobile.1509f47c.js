(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-my-login-mobile-login-mobile"],{"3f3b":function(e,t,i){"use strict";var n=i("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,i("96cf");var o=n(i("1da1")),a=n(i("5bf5")),c=i("4d75"),s={data:function(){return{show:!0,count:"",timer:null,checkbox:!1,loginInfo:{account:"",code:""}}},onLoad:function(){this.loginInfo.account=uni.getStorageSync("wsf_account")},methods:{href:function(e){var t="";switch(e){case 1:t="/pages/my/service-agreement/service-agreement";break;case 2:t="/pages/my/privacy-policy/privacy-policy";break;case 3:t="/pages/tabbar/index/index";break;default:break}3==e?uni.redirectTo({url:t}):this.tui.href(t)},checkBoxClick:function(){this.checkbox?this.checkbox=!1:this.checkbox=!0},sumbit:function(){var e=this;return(0,o.default)(regeneratorRuntime.mark((function t(){var i,n,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(i=[{name:"account",rule:["required","isMobile"],msg:["请输入手机号","请输入正确的手机号"]}],n=a.default.validation(e.loginInfo,i),n){t.next=12;break}if(e.checkbox){t.next=6;break}return e.tui.toast("请打勾同意"),t.abrupt("return",!1);case 6:return t.next=8,(0,c.smsCodeLogin)(e.loginInfo);case 8:o=t.sent,1==o.code?(uni.setStorageSync("wsf_account",e.loginInfo.account),e.tui.toast(o.msg),e.tui.setToken(o.data.token),e.tui.setIsLogin(!0),uni.reLaunch({url:"/pages/tabbar/my/my"})):1==o.show&&e.tui.toast(o.msg),t.next=13;break;case 12:e.tui.toast(n);case 13:case"end":return t.stop()}}),t)})))()},getCode:function(){var e=this,t=[{name:"account",rule:["required","isMobile"],msg:["请输入手机号","请输入正确的手机号"]}],i=a.default.validation(this.loginInfo,t);if(i)this.tui.toast(i);else{if(!this.checkbox)return this.tui.toast("请打勾同意"),!1;this.tui.request("/sms/send","POST",{mobile:this.loginInfo.account,key:"YZMDL"}).then((function(t){(1==t.code||1==t.show)&&e.tui.toast(t.msg)})).catch((function(e){})),this.codeTime()}},codeTime:function(){var e=this,t=60;this.timer||(this.count=t,this.show=!1,this.timer=setInterval((function(){e.count>0&&e.count<=t?e.count--:(e.show=!0,clearInterval(e.timer),e.timer=null)}),1e3))}}};t.default=s},"7cc9":function(e,t,i){"use strict";i.r(t);var n=i("da9b"),o=i("7fcd");for(var a in o)"default"!==a&&function(e){i.d(t,e,(function(){return o[e]}))}(a);i("f416");var c,s=i("f0c5"),r=Object(s["a"])(o["default"],n["b"],n["c"],!1,null,"b7e4717e",null,!1,n["a"],c);t["default"]=r.exports},"7fcd":function(e,t,i){"use strict";i.r(t);var n=i("3f3b"),o=i.n(n);for(var a in n)"default"!==a&&function(e){i.d(t,e,(function(){return n[e]}))}(a);t["default"]=o.a},b8b9:function(e,t,i){var n=i("24fb");t=n(!1),t.push([e.i,".h-80[data-v-b7e4717e]{height:80%}.container[data-v-b7e4717e]{padding:%?30?% %?50?% %?30?%}.withdrawalStyle[data-v-b7e4717e]{border-top:%?2?% solid #eee;margin:auto}.div_style[data-v-b7e4717e]{display:flex;padding:%?28?% %?0?%;position:relative}.div_style .available[data-v-b7e4717e]{width:%?180?%}.div_style .serviceCharge[data-v-b7e4717e]{margin-left:%?28?%}.div_style .serviceCharge[data-v-b7e4717e]{position:absolute;right:0;width:%?200?%}.div_style uni-button[data-v-b7e4717e]{width:%?237?%;background-color:#f73037;border-radius:%?5?%;font-size:%?26?%;color:#fff}.btnSure[data-v-b7e4717e]{position:fixed;bottom:%?64?%;width:100%}.btnSure uni-button[data-v-b7e4717e]{width:95%;border-radius:%?60?%;background-color:#f73037;color:#fff;font-size:%?26?%;padding:%?18?%}.div_style .money[data-v-b7e4717e]{color:#f55}.div_style .choice[data-v-b7e4717e]{color:#f73037}.sczm uni-image[data-v-b7e4717e]{width:%?165?%;height:%?165?%}.btn-top[data-v-b7e4717e]{margin-top:%?60?%}.info-box[data-v-b7e4717e]{font-size:%?34?%;color:#2c2d2c}.info-title[data-v-b7e4717e]{margin:%?40?% %?0?%;font-size:%?44?%;font-weight:bolder}.info-desc[data-v-b7e4717e]{font-size:%?28?%;color:#999;margin-bottom:%?40?%}.hrea-center[data-v-b7e4717e]{font-size:%?32?%;text-align:center;margin-top:%?60?%;font-weight:bolder}.bottom-center[data-v-b7e4717e]{display:flex;text-align:center;font-size:%?28?%;margin-top:%?40?%;align-items:center}.bottom-service[data-v-b7e4717e]{position:fixed;bottom:%?60?%;z-index:999;width:87%}.color-blue[data-v-b7e4717e]{color:#003ce9}",""]),e.exports=t},da9b:function(e,t,i){"use strict";i.d(t,"b",(function(){return o})),i.d(t,"c",(function(){return a})),i.d(t,"a",(function(){return n}));var n={tuiButton:i("2b3f").default},o=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",{staticClass:"container"},[i("v-uni-view",{staticClass:"h-80"},[i("v-uni-view",{staticClass:"info-box"},[i("v-uni-view",{staticClass:"info-title"},[e._v("手机快捷登录")]),i("v-uni-view",{staticClass:"info-desc"},[e._v("所有用户均可通过手机验证码直接登录")]),i("v-uni-view",{},[i("v-uni-view",{staticClass:"div_style"},[i("v-uni-input",{attrs:{type:"number",name:"account",placeholder:"请输入手机号"},model:{value:e.loginInfo.account,callback:function(t){e.$set(e.loginInfo,"account",t)},expression:"loginInfo.account"}})],1)],1),i("v-uni-view",{staticClass:"withdrawalStyle",staticStyle:{"border-bottom":"2rpx solid #EEEEEE"}},[i("v-uni-view",{staticClass:"div_style"},[i("v-uni-input",{attrs:{type:"text",placeholder:"请输入手机验证码"},model:{value:e.loginInfo.code,callback:function(t){e.$set(e.loginInfo,"code",t)},expression:"loginInfo.code"}}),i("v-uni-button",{directives:[{name:"show",rawName:"v-show",value:e.show,expression:"show"}],attrs:{type:"default"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.getCode.apply(void 0,arguments)}}},[e._v("获取验证码")]),i("v-uni-button",{directives:[{name:"show",rawName:"v-show",value:!e.show,expression:"!show"}],attrs:{type:"default"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.getCode.apply(void 0,arguments)}}},[e._v(e._s(e.count)+"s")])],1)],1)],1),i("v-uni-view",{staticClass:"hrea-center",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.href(3)}}},[e._v("账户密码登录")])],1),i("v-uni-view",{staticClass:"bottom-service"},[i("v-uni-view",{staticClass:"btn-top",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.sumbit.apply(void 0,arguments)}}},[i("tui-button",{attrs:{height:"90rpx",size:34,type:"green",shape:"circle"}},[e._v("登录")])],1),i("v-uni-view",{staticClass:"bottom-center"},[i("v-uni-label",[i("v-uni-checkbox",{staticStyle:{transform:"scale(0.7)"},attrs:{checked:e.checkbox},on:{click:function(t){t.stopPropagation(),arguments[0]=t=e.$handleEvent(t),e.checkBoxClick.apply(void 0,arguments)}}})],1),i("v-uni-view",{},[e._v("你同意蒲公英")]),i("v-uni-view",{staticClass:"color-blue",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.href(1)}}},[e._v("《服务协议》")]),e._v("与"),i("v-uni-view",{staticClass:"color-blue",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.href(2)}}},[e._v("《隐私政策》")])],1)],1)],1)},a=[]},dcbe:function(e,t,i){var n=i("b8b9");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var o=i("4f06").default;o("986450bc",n,!0,{sourceMap:!1,shadowMode:!1})},f416:function(e,t,i){"use strict";var n=i("dcbe"),o=i.n(n);o.a}}]);