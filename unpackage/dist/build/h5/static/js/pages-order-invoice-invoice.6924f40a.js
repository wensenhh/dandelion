(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-order-invoice-invoice"],{"03c5":function(t,a,i){var e=i("56f9");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var o=i("4f06").default;o("19e5cbd7",e,!0,{sourceMap:!1,shadowMode:!1})},"04b7":function(t,a,i){var e=i("c5d8");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var o=i("4f06").default;o("0b9e8954",e,!0,{sourceMap:!1,shadowMode:!1})},"13b7":function(t,a,i){"use strict";var e=i("7e26"),o=i.n(e);o.a},"1b86":function(t,a,i){"use strict";i("a9e3"),Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var e={name:"tuiListCell",emits:["click"],props:{arrow:{type:Boolean,default:!1},arrowColor:{type:String,default:""},hover:{type:Boolean,default:!0},unlined:{type:Boolean,default:!1},lineLeft:{type:Boolean,default:!0},lineRight:{type:Boolean,default:!1},padding:{type:String,default:"26rpx 30rpx"},backgroundColor:{type:String,default:"#fff"},size:{type:Number,default:28},color:{type:String,default:"#333"},radius:{type:Boolean,default:!1},arrowRight:{type:Boolean,default:!0},index:{type:Number,default:0}},methods:{handleClick:function(){this.$emit("click",{index:this.index})}}};a.default=e},"23ce":function(t,a,i){"use strict";i.r(a);var e=i("d5e1"),o=i("417e");for(var n in o)"default"!==n&&function(t){i.d(a,t,(function(){return o[t]}))}(n);i("411b");var r,d=i("f0c5"),l=Object(d["a"])(o["default"],e["b"],e["c"],!1,null,"1fcd1729",null,!1,e["a"],r);a["default"]=l.exports},"25ff":function(t,a,i){"use strict";i("a9e3"),Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var e={name:"tuiModal",emits:["click","cancel"],props:{show:{type:Boolean,default:!1},width:{type:String,default:"84%"},backgroundColor:{type:String,default:"#fff"},padding:{type:String,default:"40rpx 64rpx"},radius:{type:String,default:"24rpx"},title:{type:String,default:""},content:{type:String,default:""},color:{type:String,default:"#999"},size:{type:Number,default:28},shape:{type:String,default:"square"},button:{type:Array,default:function(){return[{text:"取消",type:"red",plain:!0},{text:"确定",type:"red",plain:!1}]}},maskClosable:{type:Boolean,default:!0},fadeIn:{type:Boolean,default:!1},custom:{type:Boolean,default:!1},zIndex:{type:Number,default:9997},maskZIndex:{type:Number,default:9990}},data:function(){return{}},methods:{handleClick:function(t){if(this.show){var a=t.currentTarget.dataset;this.$emit("click",{index:Number(a.index)})}},handleClickCancel:function(){this.maskClosable&&this.$emit("cancel")}}};a.default=e},"2b3f":function(t,a,i){"use strict";i.r(a);var e=i("5120"),o=i("977a");for(var n in o)"default"!==n&&function(t){i.d(a,t,(function(){return o[t]}))}(n);i("13b7");var r,d=i("f0c5"),l=Object(d["a"])(o["default"],e["b"],e["c"],!1,null,"01981854",null,!1,e["a"],r);a["default"]=l.exports},"411b":function(t,a,i){"use strict";var e=i("04b7"),o=i.n(e);o.a},"417e":function(t,a,i){"use strict";i.r(a);var e=i("25ff"),o=i.n(e);for(var n in e)"default"!==n&&function(t){i.d(a,t,(function(){return e[t]}))}(n);a["default"]=o.a},4181:function(t,a,i){"use strict";i.r(a);var e=i("cf33"),o=i("f991");for(var n in o)"default"!==n&&function(t){i.d(a,t,(function(){return o[t]}))}(n);i("8f5d");var r,d=i("f0c5"),l=Object(d["a"])(o["default"],e["b"],e["c"],!1,null,"497f7da0",null,!1,e["a"],r);a["default"]=l.exports},4431:function(t,a,i){var e=i("24fb");a=e(!1),a.push([t.i,'.tui-btn-primary-wallet[data-v-01981854]{background:#5b9af3!important;color:#fff}.tui-btn-primary[data-v-01981854]{background:#5677fc!important;color:#fff}.tui-btn-modal-cancel[data-v-01981854]{background:#fff!important;color:#14b35b;border:1px solid #14b35b!important}.tui-btn-modal-primary[data-v-01981854]{background:#14b35b!important;color:#fff}.tui-shadow-modal-cancel[data-v-01981854]{box-shadow:0 %?10?% %?14?% 0 #14b35b}.tui-shadow-modal-primary[data-v-01981854]{box-shadow:0 %?10?% %?14?% 0 #14b35b}.tui-shadow-primary[data-v-01981854]{box-shadow:0 %?10?% %?14?% 0 rgba(86,119,252,.2)}.tui-btn-danger[data-v-01981854]{background:#eb0909!important;color:#fff}.tui-shadow-danger[data-v-01981854]{box-shadow:0 %?10?% %?14?% 0 rgba(235,9,9,.2)}.tui-btn-warning[data-v-01981854]{background:#fc872d!important;color:#fff}.tui-shadow-warning[data-v-01981854]{box-shadow:0 %?10?% %?14?% 0 rgba(252,135,45,.2)}.tui-shadow-primary-wallet[data-v-01981854]{box-shadow:0 %?10?% %?14?% 0 #5b9af3}.tui-btn-green[data-v-01981854]{background:#f73037!important;color:#fff}.tui-btn-primary-wallet[data-v-01981854]{background:#5b9af3!important;color:#fff}.tui-shadow-green[data-v-01981854]{box-shadow:0 %?10?% %?14?% 0 rgba(7,193,96,.2)}.tui-btn-blue[data-v-01981854]{background:#007aff!important;color:#fff}.tui-shadow-blue[data-v-01981854]{box-shadow:0 %?10?% %?14?% 0 rgba(0,122,255,.2)}.tui-btn-white[data-v-01981854]{background:#fff!important;color:#333!important}.tui-btn-gray[data-v-01981854]{background:#bfbfbf!important;color:#fff!important}.tui-btn-black[data-v-01981854]{background:#333!important;color:#fff!important}.tui-btn-brown[data-v-01981854]{background:#ac9157!important;color:#fff!important}.tui-btn-gray-black[data-v-01981854]{background:#f2f2f2!important;color:#333}.tui-btn-gray-primary[data-v-01981854]{background:#f2f2f2!important;color:#5677fc!important}.tui-gray-primary-hover[data-v-01981854]{background:#d9d9d9!important}.tui-btn-gray-green[data-v-01981854]{background:#f2f2f2!important;color:#f73037!important}.tui-gray-green-hover[data-v-01981854]{background:#d9d9d9!important}.tui-btn-gray-danger[data-v-01981854]{background:#f2f2f2!important;color:#eb0909!important}.tui-gray-danger-hover[data-v-01981854]{background:#d9d9d9!important}.tui-btn-gray-warning[data-v-01981854]{background:#f2f2f2!important;color:#fc872d!important}.tui-gray-warning-hover[data-v-01981854]{background:#d9d9d9!important}.tui-shadow-gray[data-v-01981854]{box-shadow:0 %?10?% %?14?% 0 hsla(0,0%,74.9%,.2)}.tui-hover-gray[data-v-01981854]{background:#f7f7f9!important}.tui-black-hover[data-v-01981854]{background:#555!important;color:#e5e5e5!important}.tui-brown-hover[data-v-01981854]{background:#a37f49!important;color:#e5e5e5!important}\n\t/* button start*/.tui-btn[data-v-01981854]{width:100%;position:relative;\n\t\t/* border: 0 !important; */border-radius:%?6?%;padding-left:0;padding-right:0;overflow:visible;display:flex;align-items:center;justify-content:center}.tui-btn[data-v-01981854]::after{content:"";position:absolute;width:200%;height:200%;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scale(.5) translateZ(0);transform:scale(.5) translateZ(0);box-sizing:border-box;left:0;top:0;border-radius:%?12?%;border:0}.tui-text-bold[data-v-01981854]{font-weight:700}.tui-btn-white[data-v-01981854]::after{border:1px solid #bfbfbf}.tui-white-hover[data-v-01981854]{background:#e5e5e5!important;color:#2e2e2e!important}.tui-dark-disabled[data-v-01981854]{opacity:.6!important;color:#fafbfc!important}.tui-dark-disabled-outline[data-v-01981854]{opacity:.5!important}.tui-gray-disabled[data-v-01981854]{background:#f3f3f3!important;color:#919191!important;box-shadow:none}.tui-outline-hover[data-v-01981854]{opacity:.5}.tui-primary-hover[data-v-01981854]{background:#4a67d6!important;color:#e5e5e5!important}.tui-bg-color[data-v-01981854]{background:red!important;color:#e5e5e5!important}.tui-primary-outline[data-v-01981854]::after{border:1px solid #5677fc!important}.tui-primary-outline[data-v-01981854]{color:#5677fc!important;background:transparent}.tui-danger-hover[data-v-01981854]{background:#c80808!important;color:#e5e5e5!important}.tui-danger-outline[data-v-01981854]{color:#eb0909!important;background:transparent}.tui-danger-outline[data-v-01981854]::after{border:1px solid #eb0909!important}.tui-warning-hover[data-v-01981854]{background:#d67326!important;color:#e5e5e5!important}.tui-warning-outline[data-v-01981854]{color:#fc872d!important;background:transparent}.tui-warning-outline[data-v-01981854]::after{border:1px solid #fc872d!important}.tui-green-hover[data-v-01981854]{background:#f73037!important;color:#e5e5e5!important}.tui-green-outline[data-v-01981854]{color:#f73037!important;background:transparent}.tui-green-outline[data-v-01981854]::after{border:1px solid #f73037!important}.tui-blue-hover[data-v-01981854]{background:#0062cc!important;color:#e5e5e5!important}.tui-blue-outline[data-v-01981854]{color:#007aff!important;background:transparent}.tui-blue-outline[data-v-01981854]::after{border:1px solid #007aff!important}\n.tui-btn-gradual[data-v-01981854]{background:linear-gradient(90deg,#ff5926,#f00e2c)!important;color:#fff!important}.tui-shadow-gradual[data-v-01981854]{box-shadow:0 %?10?% %?14?% 0 rgba(235,9,9,.15)}\n.tui-gray-hover[data-v-01981854]{background:#a3a3a3!important;color:#898989}\n.tui-gradual-hover[data-v-01981854]{background:linear-gradient(90deg,#d74620,#cd1225)!important;color:#fff!important}\n.tui-gray-outline[data-v-01981854]{color:#999!important;background:transparent!important}.tui-white-outline[data-v-01981854]{color:#fff!important;background:transparent!important}.tui-black-outline[data-v-01981854]{background:transparent!important;color:#333!important}.tui-gray-outline[data-v-01981854]::after{border:1px solid #ccc!important}.tui-white-outline[data-v-01981854]::after{border:1px solid #fff!important}.tui-black-outline[data-v-01981854]::after{border:1px solid #333!important}.tui-brown-outline[data-v-01981854]{color:#ac9157!important;background:transparent}.tui-brown-outline[data-v-01981854]::after{border:1px solid #ac9157!important}\n\t/*圆角 */.tui-fillet[data-v-01981854]{border-radius:%?50?%}.tui-btn-white.tui-fillet[data-v-01981854]::after{border-radius:%?98?%}.tui-outline-fillet[data-v-01981854]::after{border-radius:%?98?%}\n\t/*平角*/.tui-rightAngle[data-v-01981854]{border-radius:0}.tui-btn-white.tui-rightAngle[data-v-01981854]::after{border-radius:0}.tui-outline-rightAngle[data-v-01981854]::after{border-radius:0}.tui-btn__link[data-v-01981854]::after{border:0!important}',""]),t.exports=a},5120:function(t,a,i){"use strict";var e;i.d(a,"b",(function(){return o})),i.d(a,"c",(function(){return n})),i.d(a,"a",(function(){return e}));var o=function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("v-uni-button",{staticClass:"tui-btn",class:[t.plain?"tui-"+t.type+"-outline":"tui-btn-"+(t.type||"primary"),t.getDisabledClass(t.disabled,t.type,t.plain),t.getShapeClass(t.shape,t.plain),t.getShadowClass(t.type,t.shadow,t.plain),t.bold?"tui-text-bold":"",t.link?"tui-btn__link":""],style:{width:t.width,height:t.height,lineHeight:t.height,fontSize:t.size+"rpx",margin:t.margin},attrs:{"hover-class":t.getHoverClass(t.disabled,t.type,t.plain),loading:t.loading,"form-type":t.formType,"open-type":t.openType,disabled:t.disabled},on:{getuserinfo:function(a){arguments[0]=a=t.$handleEvent(a),t.bindgetuserinfo.apply(void 0,arguments)},getphonenumber:function(a){arguments[0]=a=t.$handleEvent(a),t.bindgetphonenumber.apply(void 0,arguments)},contact:function(a){arguments[0]=a=t.$handleEvent(a),t.bindcontact.apply(void 0,arguments)},error:function(a){arguments[0]=a=t.$handleEvent(a),t.binderror.apply(void 0,arguments)},click:function(a){arguments[0]=a=t.$handleEvent(a),t.handleClick.apply(void 0,arguments)}}},[t._t("default")],2)},n=[]},"56f9":function(t,a,i){var e=i("24fb");a=e(!1),a.push([t.i,".tui-invoice__box[data-v-127f0ee0]{background-color:#fff;margin-top:%?20?%;border-radius:%?20?%;overflow:hidden}.tui-title[data-v-127f0ee0]{display:flex;align-items:center;justify-content:space-between}.tui-notice[data-v-127f0ee0]{font-size:%?24?%;font-weight:400;color:#999}.tui-bold[data-v-127f0ee0]{font-weight:700}.tui-attr__box[data-v-127f0ee0]{padding:%?24?% 0}.tui-pbtm__0[data-v-127f0ee0]{padding-bottom:0}.tui-attr-item[data-v-127f0ee0]{max-width:100%;min-width:%?180?%;height:%?64?%;display:-webkit-inline-flex;display:inline-flex;align-items:center;justify-content:center;background-color:#f7f7f7;border:%?1?% solid #f7f7f7;padding:0 %?26?%;box-sizing:border-box;border-radius:32px;margin-right:%?32?%;font-size:%?26?%}.tui-attr-active[data-v-127f0ee0]{background-color:#fcedea;border-color:#e41f19;color:#e41f19;font-weight:700}.tui-tips[data-v-127f0ee0]{color:#999;font-size:%?24?%;font-weight:400}.tui-input__item[data-v-127f0ee0]{width:100%;display:flex;align-items:center;font-size:%?28?%;padding-top:%?40?%}.tui-input__title[data-v-127f0ee0]{width:%?196?%;flex-shrink:0}.tui-input__item uni-input[data-v-127f0ee0]{font-size:%?28?%;flex:1}.tui-placeholder[data-v-127f0ee0]{color:#bfbfbf}.tui-more__optional[data-v-127f0ee0]{font-size:%?24?%;display:flex;align-items:center;color:#999}.tui-between[data-v-127f0ee0]{justify-content:space-between}.tui-btn__box[data-v-127f0ee0]{padding:%?60?% %?30?% %?80?%}.tui-modal__title[data-v-127f0ee0]{text-align:center;font-weight:700;padding-bottom:%?8?%}.tui-modal__p[data-v-127f0ee0]{font-size:%?26?%;color:#888;padding-top:%?20?%}.tui-modal__btn[data-v-127f0ee0]{width:100%;padding:%?60?% 0 %?20?%;display:flex;justify-content:center}",""]),t.exports=a},7170:function(t,a,i){var e=i("a308");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var o=i("4f06").default;o("4fe95f55",e,!0,{sourceMap:!1,shadowMode:!1})},"7e26":function(t,a,i){var e=i("4431");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var o=i("4f06").default;o("a6def900",e,!0,{sourceMap:!1,shadowMode:!1})},"8f5d":function(t,a,i){"use strict";var e=i("7170"),o=i.n(e);o.a},9614:function(t,a,i){"use strict";i.r(a);var e=i("ae01"),o=i.n(e);for(var n in e)"default"!==n&&function(t){i.d(a,t,(function(){return e[t]}))}(n);a["default"]=o.a},"977a":function(t,a,i){"use strict";i.r(a);var e=i("ddc6"),o=i.n(e);for(var n in e)"default"!==n&&function(t){i.d(a,t,(function(){return e[t]}))}(n);a["default"]=o.a},a308:function(t,a,i){var e=i("24fb");a=e(!1),a.push([t.i,'.tui-list-cell[data-v-497f7da0]{position:relative;width:100%;box-sizing:border-box}.tui-radius[data-v-497f7da0]{border-radius:%?6?%;overflow:hidden}.tui-cell-hover[data-v-497f7da0]{background-color:#f1f1f1!important}.tui-list-cell[data-v-497f7da0]::after{content:"";position:absolute;border-bottom:1px solid #eaeef1;-webkit-transform:scaleY(.5) translateZ(0);transform:scaleY(.5) translateZ(0);-webkit-transform-origin:0 100%;transform-origin:0 100%;bottom:0;right:0;left:0;pointer-events:none}.tui-line-left[data-v-497f7da0]::after{left:%?30?%!important}.tui-line-right[data-v-497f7da0]::after{right:%?30?%!important}.tui-cell-unlined[data-v-497f7da0]::after{border-bottom:0!important}.tui-cell-arrow[data-v-497f7da0]::before{content:" ";height:10px;width:10px;border-width:2px 2px 0 0;border-color:silver;border-style:solid;-webkit-transform:matrix(.5,.5,-.5,.5,0,0);transform:matrix(.5,.5,-.5,.5,0,0);position:absolute;top:50%;margin-top:-6px;right:%?30?%}.tui-arrow-right[data-v-497f7da0]::before{right:0!important}.tui-arrow-gray[data-v-497f7da0]::before{border-color:#666!important}.tui-arrow-white[data-v-497f7da0]::before{border-color:#fff!important}.tui-arrow-warning[data-v-497f7da0]::before{border-color:#ff7900!important}.tui-arrow-success[data-v-497f7da0]::before{border-color:#19be6b!important}.tui-arrow-danger[data-v-497f7da0]::before{border-color:#eb0909!important}',""]),t.exports=a},a955:function(t,a,i){"use strict";i.r(a);var e=i("c622"),o=i("9614");for(var n in o)"default"!==n&&function(t){i.d(a,t,(function(){return o[t]}))}(n);i("d025");var r,d=i("f0c5"),l=Object(d["a"])(o["default"],e["b"],e["c"],!1,null,"127f0ee0",null,!1,e["a"],r);a["default"]=l.exports},ae01:function(t,a,i){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var e={data:function(){return{type:1,invoiceTitle:1,optional:!1,modal:!1}},methods:{switchType:function(t){this.type=t},switchTitle:function(t){this.invoiceTitle=t}}};a.default=e},c5d8:function(t,a,i){var e=i("24fb");a=e(!1),a.push([t.i,'.tui-modal__container[data-v-1fcd1729]{width:100%;height:100%;position:fixed;left:0;top:0;display:flex;align-items:center;justify-content:center;visibility:hidden}.tui-modal-box[data-v-1fcd1729]{position:relative;opacity:0;visibility:hidden;box-sizing:border-box;transition:all .3s ease-in-out}.tui-modal-scale[data-v-1fcd1729]{-webkit-transform:scale(0);transform:scale(0)}.tui-modal-normal[data-v-1fcd1729]{-webkit-transform:scale(1);transform:scale(1)}.tui-modal-show[data-v-1fcd1729]{opacity:1;visibility:visible}.tui-modal-mask[data-v-1fcd1729]{position:fixed;top:0;left:0;right:0;bottom:0;background-color:rgba(0,0,0,.6);transition:all .3s ease-in-out;opacity:0;visibility:hidden}.tui-mask-show[data-v-1fcd1729]{visibility:visible;opacity:1}.tui-modal-title[data-v-1fcd1729]{text-align:center;font-size:%?34?%;color:#333;padding-top:%?20?%;font-weight:700}.tui-modal-content[data-v-1fcd1729]{text-align:center;color:#999;font-size:%?28?%;padding-top:%?20?%;padding-bottom:%?60?%}.tui-mtop[data-v-1fcd1729]{margin-top:%?30?%}.tui-mbtm[data-v-1fcd1729]{margin-bottom:%?30?%}.tui-modalBtn-box[data-v-1fcd1729]{width:100%;display:flex;align-items:center;justify-content:space-between}.tui-flex-column[data-v-1fcd1729]{flex-direction:column}.tui-modal-btn[data-v-1fcd1729]{width:46%;height:%?68?%;line-height:%?68?%;position:relative;border-radius:%?10?%;font-size:%?26?%;overflow:visible;margin-left:0;margin-right:0}.tui-modal-btn[data-v-1fcd1729]::after{content:" ";position:absolute;width:200%;height:200%;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scale(.5) translateZ(0);transform:scale(.5) translateZ(0);left:0;top:0;border-radius:%?20?%;z-index:2}.tui-btn-width[data-v-1fcd1729]{width:80%!important}.tui-primary[data-v-1fcd1729]{background:#5677fc;color:#fff}.tui-primary-hover[data-v-1fcd1729]{background:#4a67d6;color:#e5e5e5}.tui-primary-outline[data-v-1fcd1729]{color:#5677fc;background:transparent}.tui-primary-outline[data-v-1fcd1729]::after{border:1px solid #5677fc}.tui-danger[data-v-1fcd1729]{background:#ed3f14;color:#fff}.tui-danger-hover[data-v-1fcd1729]{background:#d53912;color:#e5e5e5}.tui-danger-outline[data-v-1fcd1729]{color:#ed3f14;background:transparent}.tui-danger-outline[data-v-1fcd1729]::after{border:1px solid #ed3f14}.tui-red[data-v-1fcd1729]{background:#e41f19;color:#fff}.tui-red-hover[data-v-1fcd1729]{background:#c51a15;color:#e5e5e5}.tui-red-outline[data-v-1fcd1729]{color:#e41f19;background:transparent}.tui-red-outline[data-v-1fcd1729]::after{border:1px solid #e41f19}.tui-warning[data-v-1fcd1729]{background:#ff7900;color:#fff}.tui-warning-hover[data-v-1fcd1729]{background:#e56d00;color:#e5e5e5}.tui-warning-outline[data-v-1fcd1729]{color:#ff7900;background:transparent}.tui-warning-outline[data-v-1fcd1729]::after{border:1px solid #ff7900}.tui-green[data-v-1fcd1729]{background:#f73037;color:#fff}.tui-green-hover[data-v-1fcd1729]{background:#f73037;color:#e5e5e5}.tui-green-outline[data-v-1fcd1729]{color:#f73037;background:transparent}.tui-green-outline[data-v-1fcd1729]::after{border:1px solid #f73037}.tui-white[data-v-1fcd1729]{background:#fff;color:#333}.tui-white-hover[data-v-1fcd1729]{background:#f7f7f9;color:#666}.tui-white-outline[data-v-1fcd1729]{color:#333;background:transparent}.tui-white-outline[data-v-1fcd1729]::after{border:1px solid #333}.tui-gray[data-v-1fcd1729]{background:#ededed;color:#999}.tui-gray-hover[data-v-1fcd1729]{background:#d5d5d5;color:#898989}.tui-gray-outline[data-v-1fcd1729]{color:#999;background:transparent}.tui-gray-outline[data-v-1fcd1729]::after{border:1px solid #999}.tui-outline-hover[data-v-1fcd1729]{opacity:.6}.tui-circle-btn[data-v-1fcd1729]{border-radius:%?40?%!important}.tui-circle-btn[data-v-1fcd1729]::after{border-radius:%?80?%!important}',""]),t.exports=a},c622:function(t,a,i){"use strict";i.d(a,"b",(function(){return o})),i.d(a,"c",(function(){return n})),i.d(a,"a",(function(){return e}));var e={tuiListCell:i("4181").default,tuiIcon:i("ac83").default,tuiButton:i("2b3f").default,tuiModal:i("23ce").default},o=function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("v-uni-view",{staticClass:"container"},[i("v-uni-view",{staticClass:"tui-invoice__box"},[i("tui-list-cell",{attrs:{hover:!1}},[i("v-uni-view",{staticClass:"tui-title tui-bold"},[i("v-uni-text",[t._v("发票类型")]),i("v-uni-text",{staticClass:"tui-notice",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.modal=!0}}},[t._v("发票须知")])],1),i("v-uni-view",{staticClass:"tui-attr__box"},[i("v-uni-view",{staticClass:"tui-attr-item",class:{"tui-attr-active":1===t.type},on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.switchType(1)}}},[t._v("电子普通发票")]),i("v-uni-view",{staticClass:"tui-attr-item",class:{"tui-attr-active":2===t.type},on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.switchType(2)}}},[t._v("不开发票")])],1),i("v-uni-view",{staticClass:"tui-tips"},[t._v("ThorUI商城启用电子普通发票，与纸质普通发票具备同等法律效力，订单完成后24小时内在“我的订单”查看")])],1),1===t.type?i("v-uni-view",[i("tui-list-cell",{attrs:{hover:!1}},[i("v-uni-view",{staticClass:"tui-title tui-bold"},[t._v("发票抬头")]),i("v-uni-view",{staticClass:"tui-attr__box tui-pbtm__0"},[i("v-uni-view",{staticClass:"tui-attr-item",class:{"tui-attr-active":1===t.invoiceTitle},on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.switchTitle(1)}}},[t._v("个人")]),i("v-uni-view",{staticClass:"tui-attr-item",class:{"tui-attr-active":2===t.invoiceTitle},on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.switchTitle(2)}}},[t._v("单位")])],1),i("v-uni-view",{staticClass:"tui-form"},[i("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:1===t.invoiceTitle,expression:"invoiceTitle === 1"}],staticClass:"tui-box__personal"},[i("v-uni-view",{staticClass:"tui-input__item"},[i("v-uni-view",{staticClass:"tui-input__title"},[t._v("个人名称名称")]),i("v-uni-input",{attrs:{placeholder:"请填写“个人”或您的姓名","placeholder-class":"tui-placeholder"}})],1)],1),i("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:2===t.invoiceTitle,expression:"invoiceTitle === 2"}],staticClass:"tui-box__enterprise"},[i("v-uni-view",{staticClass:"tui-input__item"},[i("v-uni-view",{staticClass:"tui-input__title"},[t._v("单位名称")]),i("v-uni-input",{attrs:{placeholder:"请填写单位名称","placeholder-class":"tui-placeholder"}})],1),i("v-uni-view",{staticClass:"tui-input__item"},[i("v-uni-view",{staticClass:"tui-input__title"},[t._v("纳税人识别码")]),i("v-uni-input",{attrs:{placeholder:"纳税人识别号/统一社会信用代码","placeholder-class":"tui-placeholder"}})],1),i("v-uni-view",{staticClass:"tui-input__item tui-between"},[i("v-uni-view",{staticClass:"tui-input__title"},[t._v("更多选填项")]),i("v-uni-view",{staticClass:"tui-more__optional",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.optional=!t.optional}}},[i("v-uni-text",[t._v("展开")]),i("tui-icon",{attrs:{name:t.optional?"arrowup":"arrowdown",size:18,color:"#999"}})],1)],1),t.optional?i("v-uni-view",{staticClass:"tui-optional__box"},[i("v-uni-view",{staticClass:"tui-input__item"},[i("v-uni-view",{staticClass:"tui-input__title"},[t._v("注册地址")]),i("v-uni-input",{attrs:{placeholder:"请填写注册地址","placeholder-class":"tui-placeholder"}})],1),i("v-uni-view",{staticClass:"tui-input__item"},[i("v-uni-view",{staticClass:"tui-input__title"},[t._v("注册电话")]),i("v-uni-input",{attrs:{type:"number",placeholder:"请填写注册电话","placeholder-class":"tui-placeholder"}})],1),i("v-uni-view",{staticClass:"tui-input__item"},[i("v-uni-view",{staticClass:"tui-input__title"},[t._v("开户银行")]),i("v-uni-input",{attrs:{placeholder:"请填写单位开户银行","placeholder-class":"tui-placeholder"}})],1),i("v-uni-view",{staticClass:"tui-input__item"},[i("v-uni-view",{staticClass:"tui-input__title"},[t._v("银行账号")]),i("v-uni-input",{attrs:{placeholder:"请填写单位银行账号","placeholder-class":"tui-placeholder"}})],1)],1):t._e()],1)],1)],1),i("tui-list-cell",{attrs:{hover:!1}},[i("v-uni-view",{staticClass:"tui-title tui-bold"},[t._v("收票人信息")]),i("v-uni-view",{staticClass:"tui-input__item"},[i("v-uni-view",{staticClass:"tui-input__title"},[t._v("收票人手机")]),i("v-uni-input",{attrs:{placeholder:"可通过手机号在发票服务平台查询","placeholder-class":"tui-placeholder",value:"188****0088"}})],1),i("v-uni-view",{staticClass:"tui-input__item"},[i("v-uni-view",{staticClass:"tui-input__title"},[t._v("收票人邮箱")]),i("v-uni-input",{attrs:{placeholder:"用来接收电子发票邮件,可选填","placeholder-class":"tui-placeholder"}})],1)],1)],1):t._e()],1),i("v-uni-view",{staticClass:"tui-btn__box"},[i("tui-button",{attrs:{type:"danger",height:"88rpx",shape:"circle"}},[t._v("确定")])],1),i("tui-modal",{attrs:{show:t.modal,shape:"circle",padding:"30rpx 40rpx",custom:!0}},[i("v-uni-view",{staticClass:"tui-modal__title"},[t._v("发票须知")]),i("v-uni-view",{staticClass:"tui-modal__p"},[t._v("1.发票金额不含优惠券、红包等优惠扣减金额；")]),i("v-uni-view",{staticClass:"tui-modal__p"},[t._v("2.请确保发票抬头、纳税人识别号或统一社会信用代码的准确性，开票成功后无法更改；")]),i("v-uni-view",{staticClass:"tui-modal__p"},[t._v("3.增值税普通发票的开具不填写纳税人识别号或统一社会信用代码不得作为税收凭证。")]),i("v-uni-view",{staticClass:"tui-modal__btn"},[i("tui-button",{attrs:{type:"danger",shape:"circle",width:"280rpx",height:"68rpx",size:26},on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.modal=!1}}},[t._v("我知道了")])],1)],1)],1)},n=[]},cf33:function(t,a,i){"use strict";var e;i.d(a,"b",(function(){return o})),i.d(a,"c",(function(){return n})),i.d(a,"a",(function(){return e}));var o=function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("v-uni-view",{staticClass:"tui-list-class tui-list-cell",class:[t.arrow?"tui-cell-arrow":"",t.arrow&&t.arrowRight?"":"tui-arrow-right",t.unlined?"tui-cell-unlined":"",t.lineLeft?"tui-line-left":"",t.lineRight?"tui-line-right":"",t.arrow&&t.arrowColor?"tui-arrow-"+t.arrowColor:"",t.radius?"tui-radius":""],style:{backgroundColor:t.backgroundColor,fontSize:t.size+"rpx",color:t.color,padding:t.padding},attrs:{"hover-class":t.hover?"tui-cell-hover":"","hover-stay-time":150},on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.handleClick.apply(void 0,arguments)}}},[t._t("default")],2)},n=[]},d025:function(t,a,i){"use strict";var e=i("03c5"),o=i.n(e);o.a},d5e1:function(t,a,i){"use strict";var e;i.d(a,"b",(function(){return o})),i.d(a,"c",(function(){return n})),i.d(a,"a",(function(){return e}));var o=function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("v-uni-view",{staticClass:"tui-modal__container",class:[t.show?"tui-modal-show":""],style:{zIndex:t.zIndex},on:{touchmove:function(a){a.stopPropagation(),a.preventDefault(),arguments[0]=a=t.$handleEvent(a)}}},[i("v-uni-view",{staticClass:"tui-modal-box",class:[t.fadeIn||t.show?"tui-modal-normal":"tui-modal-scale",t.show?"tui-modal-show":""],style:{width:t.width,padding:t.padding,borderRadius:t.radius,backgroundColor:t.backgroundColor,zIndex:t.zIndex+1}},[t.custom?i("v-uni-view",[t._t("default")],2):i("v-uni-view",[t.title?i("v-uni-view",{staticClass:"tui-modal-title"},[t._v(t._s(t.title))]):t._e(),i("v-uni-view",{staticClass:"tui-modal-content",class:[t.title?"":"tui-mtop"],style:{color:t.color,fontSize:t.size+"rpx"}},[t._v(t._s(t.content))]),i("v-uni-view",{staticClass:"tui-modalBtn-box",class:[2!=t.button.length?"tui-flex-column":""]},[t._l(t.button,(function(a,e){return[i("v-uni-button",{key:e+"_0",staticClass:"tui-modal-btn",class:["tui-"+(a.type||"primary")+(a.plain?"-outline":""),2!=t.button.length?"tui-btn-width":"",t.button.length>2?"tui-mbtm":"","circle"==t.shape?"tui-circle-btn":""],attrs:{"hover-class":"tui-"+(a.plain?"outline":a.type||"primary")+"-hover","data-index":e},on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.handleClick.apply(void 0,arguments)}}},[t._v(t._s(a.text||"确定"))])]}))],2)],1)],1),i("v-uni-view",{staticClass:"tui-modal-mask",class:[t.show?"tui-mask-show":""],style:{zIndex:t.maskZIndex},on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.handleClickCancel.apply(void 0,arguments)}}})],1)},n=[]},ddc6:function(t,a,i){"use strict";i("c975"),i("a9e3"),Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var e={name:"tuiButton",emits:["click","getuserinfo","contact","getphonenumber","error"],behaviors:["wx://form-field-button"],props:{type:{type:String,default:"primary"},shadow:{type:Boolean,default:!1},width:{type:String,default:"100%"},height:{type:String,default:"96rpx"},size:{type:Number,default:32},bold:{type:Boolean,default:!1},margin:{type:String,default:"0"},shape:{type:String,default:"square"},plain:{type:Boolean,default:!1},link:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},disabledGray:{type:Boolean,default:!1},loading:{type:Boolean,default:!1},formType:{type:String,default:""},openType:{type:String,default:""},index:{type:[Number,String],default:0},preventClick:{type:Boolean,default:!1}},data:function(){return{time:0}},methods:{handleClick:function(){var t=this;if(!this.disabled){if(this.preventClick){if((new Date).getTime()-this.time<=200)return;this.time=(new Date).getTime(),setTimeout((function(){t.time=0}),200)}this.$emit("click",{index:Number(this.index)})}},bindgetuserinfo:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=t.detail,i=void 0===a?{}:a;this.$emit("getuserinfo",i)},bindcontact:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=t.detail,i=void 0===a?{}:a;this.$emit("contact",i)},bindgetphonenumber:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=t.detail,i=void 0===a?{}:a;this.$emit("getphonenumber",i)},binderror:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=t.detail,i=void 0===a?{}:a;this.$emit("error",i)},getShadowClass:function(t,a,i){var e="";return a&&"white"!=t&&!i&&(e="tui-shadow-"+t),e},getDisabledClass:function(t,a,i){var e="";if(t&&"white"!=a&&-1==a.indexOf("-")){var o=this.disabledGray?"tui-gray-disabled":"tui-dark-disabled";e=i?"tui-dark-disabled-outline":o}return e},getShapeClass:function(t,a){var i="";return"circle"==t?i=a?"tui-outline-fillet":"tui-fillet":"rightAngle"==t&&(i=a?"tui-outline-rightAngle":"tui-rightAngle"),i},getHoverClass:function(t,a,i){var e="";return t||(e=i?"tui-outline-hover":"tui-"+(a||"primary")+"-hover"),e}}};a.default=e},f991:function(t,a,i){"use strict";i.r(a);var e=i("1b86"),o=i.n(e);for(var n in e)"default"!==n&&function(t){i.d(a,t,(function(){return e[t]}))}(n);a["default"]=o.a}}]);