
// 开发者环境：开|关	【注：方便微信小程序发行测试】
const SWITCH_DEVELOPMENT = false

/** S 是否H5端 **/
// #ifdef H5
const IS_H5 = true
// #endif

// #ifndef H5
const IS_H5 = false
// #endif
/** E 是否H5端 **/


/** S API BaseURL **/
const baseURLMap = {
	// 开发环境
	development: 'https://admin.spiritstones.cn',
	// 生产环境
	production: 'https://admin.spiritstones.cn',
}

const baseURL = SWITCH_DEVELOPMENT ? baseURLMap['development'] : baseURLMap[process.env.NODE_ENV]
/** E API BaseURL **/


module.exports = {
	version: '2.6.9.20220118',			// 版本号
	baseURL,					// API Base URL
	basePath: '/',
}
