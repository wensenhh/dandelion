import Web3 from 'web3'
import Vue from 'vue'
import {
	div
} from './number'
import {
	regAbi
} from './recharge'
import {
	usdtAbi,
	usdtAddress
} from './usdt'
import {
	formatLongNumer
} from './util'
var regAddress = '0x074DFdA838b7b99954655AA7712A7DCC63782AC8'
export const usdtCoin = {
	coinName: 'USDT',
	precision: 18,
	ads: '0x55d398326f99059ff775485246999027b3197955'
}
export const coin = {
	coinName: 'TESTCOIN',
	precision: 18,
	ads: '0xEFfFAcAABCCe5349E1f819b54554b25d23E2e124'
}

// 查询代币余额
export const getCoinBalance = ({
	coinName,
	ads,
	precision
}) => {
	return new Promise((resolve, reject) => {
		if (window.web3) {
			try {
				let web3 = new Web3(window.web3.currentProvider)
				let fromAddress = web3.eth.accounts[0]
				let ethContract = web3.eth.contract(usdtAbi) //所有代币的abi可以通用
				let functionInstance = ethContract.at(ads) //切换不同的代币地址
				functionInstance.balanceOf(fromAddress, (err, res) => {
					if (!err) {
						const blance = div(res.toNumber() / Math.pow(10, precision))
						console.log(`${coinName} 我的代币余额==`, blance)
						resolve(blance)
					}
				})
			} catch (err) {
				console.log('getCoinBalance::err==>', err)
				reject(err)
			}
		}
	})
}

// 查询BNB余额
export const getBalance = () => {
	return new Promise((resolve, reject) => {
		if (window.web3) {
			try {
				let web3 = new Web3(window.web3.currentProvider)
				let fromAddress = web3.eth.accounts[0]
				web3.eth.getBalance(fromAddress, (err, res) => {
					if (!err) {
						const blance = div(res.toNumber(), Math.pow(10, 18))
						console.log('我的BNB余额==', res.toNumber() / Math.pow(10, 18))
						resolve(blance)
					}
				})
			} catch (err) {
				reject(err)
			}
		}
	})
}

//查询授权数量
export const getAllowance = ({
	coinName,
	ads,
	precision
}) => {
	return new Promise((resolve, reject) => {
		if (window.web3) {
			let web3 = new Web3(window.web3.currentProvider)
			let abiContract = web3.eth.contract(usdtAbi) //所有代币的ABI 可以通用
			//切换不同的 代币地址
			let contractInstance = abiContract.at(ads)
			//当前钱包地址
			let fromAddress = web3.eth.accounts[0]
			let dappAddress = regAddress //充币合约地址
			contractInstance.allowance(fromAddress, dappAddress, (err, res) => {
				if (!err && res) {
					const approveNum = div(res.toNumber(), Math.pow(10, precision))
					console.log(`${coinName}授权数量==`, approveNum)
					resolve(approveNum)
					//如果代币授权数量 大于等于投资数量 就直接调用 质押方法
					//如果代币授权数量 小于投资数量 就先调用 授权 getApprove方法 在调用 质押方法
				} else {
					reject(err)
				}
			})
		}
	})
}

//授权 如果是2个代币的组合  2个代币都需要授权
//只有2个代币都授权后 才可以操作 投资
export const getApprove = ({
	ads,
	precision
}) => {
	return new Promise((resolve, reject) => {
		if (window.web3) {
			let web3 = new Web3(window.web3.currentProvider)
			let abiContract = web3.eth.contract(usdtAbi) //所有代币的ABI 可以通用
			//切换不同的 代币地址
			let contractInstance = abiContract.at(ads)
			//当前钱包地址
			var fromAddress = web3.eth.accounts[0]
			//授权数量 直接授权一个亿 第二次投资的时候 可以查询授权数量还有 就不用再次授权
			var amount = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
			contractInstance.approve(
				regAddress,
				amount, {
					gas: 100000,
					gasPrice: 5000000000,
					from: fromAddress
				},
				(err, result) => {
					if (!err && result) {
						resolve(result)
					} else {
						reject(err)
					}
				}
			)
		}
	})
}

export const rechargeCoin = async ({
	coinName,
	ads,
	amount,
	precision,
	remarks,
	regaddress
}) => {
	regAddress = regaddress
	// const money = amount * Math.pow(10, precision)
	const balance = await getCoinBalance({
		coinName,
		ads,
		precision
	})
	const approveNum = await getAllowance({
		coinName,
		ads,
		precision
	})
	if (approveNum < +amount) {
		await getApprove({
			ads,
			precision
		})
		return rechagreToken({
			coinName,
			ads,
			amount,
			precision,
			remarks
		})
	} else if (balance < +amount) {
		uni.showToast({
			title: '余额不足！',
			icon:'error'
		})
		// todo
		// toast (余额不足)
	} else {
		return rechagreToken({
			coinName,
			ads,
			amount,
			precision,
			remarks
		})
	}
}

// export const rechargeOne = ({ coinName, ads, amount, precision, remarks }) => {
//   // '代币地址','质押数量','备注',
//   return new Promise((resolve, reject) => {
//     if (window.web3) {
//       let web3 = new Web3(window.web3.currentProvider)
//       let ethContract = web3.eth.contract(regAbi)
//       let functionInstance = ethContract.at(regAddress)
//       //当前钱包地址
//       let money = formatLongNumer(amount * Math.pow(10, precision))

//       let fromAddress = web3.eth.accounts[0]
//       let conAds = coinName == 'BNB' ? '0x1000000000000000000000000000000000000000' : ads
//       //注；如果代币是 BNB 请写死 BNB代币地址 = 0x1000000000000000000000000000000000000000  其他获取后台配置的
//       //单币质押 --or 升级投资    备注 需要和json沟通传什么 最好是字符串 有多个参数 & 就拼接到一起
//       console.log('rechargeOne params', conAds, money, remarks)
//       try {
//         functionInstance.rechargeOne(
//           conAds,
//           money,
//           remarks,
//           {
//             gas: 500000,
//             gasPrice: 5000000000,
//             // gas: 500000,
//             // gasPrice: 50000000000,
//             from: fromAddress,
//             value: coinName == 'BNB' ? money : 0 //注：只有是投资有 BNB的时候 才传 value数量  或者value写死 0
//           },
//           (err, result) => {
//             if (!err && result) {
//               Vue.prototype.$toast('等待上链')
//               resolve(result)
//             } else {
//               reject(err)
//             }
//           }
//         )
//       } catch (err) {
//         Vue.prototype.$toast(err.message)
//       }
//     }
//   })
// }

export const rechargeTwoCoin = async ({
	ads1,
	num1,
	precision1,
	ads2,
	num2,
	precision2,
	remarks
}) => {
	// const money = num * Math.pow(10, precision)
	const balance1 = await getCoinBalance({
		ads: ads1,
		precision: precision1
	})
	const balance2 = await getCoinBalance({
		ads: ads2,
		precision: precision2
	})
	const approveNum1 = await getAllowance({
		ads: ads1,
		precision: precision1
	})
	const approveNum2 = await getAllowance({
		ads: ads2,
		precision: precision2
	})

	console.log('balance1', balance1)
	console.log('balance2', balance2)
	console.log('approveNum1', approveNum1)
	console.log('approveNum2', approveNum2)
	if (+balance1 < +num1 || +balance2 < +num2) {
		// todo toast('Insufficient balance')
		console.log('Insufficient balance')
		return
	}

	if (+approveNum1 === 0 && +approveNum2 !== 0) {
		await getApprove({
			ads: ads1,
			precision: precision1
		})
		return rechagreToken2({
			ads1,
			num1,
			precision1,
			ads2,
			num2,
			precision2,
			remarks
		})
	} else if (+approveNum1 !== 0 && +approveNum2 === 0) {
		await getApprove({
			ads: ads2,
			precision: precision2
		})
		return rechagreToken2({
			ads1,
			num1,
			precision1,
			ads2,
			num2,
			precision2,
			remarks
		})
	} else if (+approveNum1 === 0 && +approveNum2 === 0) {
		await getApprove({
			ads: ads1,
			precision: precision1
		})
		await getApprove({
			ads: ads2,
			precision: precision2
		})
		return rechagreToken2({
			ads1,
			num1,
			precision1,
			ads2,
			num2,
			precision2,
			remarks
		})
	} else {
		return rechagreToken2({
			ads1,
			num1,
			precision1,
			ads2,
			num2,
			precision2,
			remarks
		})
	}
}

// export const rechargeTwo = ({ ads1, num1, ads2, num2, precision1, precision2, remarks }) => {
//   return new Promise((resolve, reject) => {
//     if (window.web3) {
//       let web3 = new Web3(window.web3.currentProvider)
//       let ethContract = web3.eth.contract(regAbi)
//       let functionInstance = ethContract.at(regAddress)
//       let money1 = formatLongNumer(num1 * Math.pow(10, precision1))
//       let money2 = formatLongNumer(num2 * Math.pow(10, precision2))
//       let fromAddress = web3.eth.accounts[0]
//       try {
//         functionInstance.rechargeTwo(
//           ads1,
//           money1,
//           ads2,
//           money2,
//           remarks,
//           {
//             gas: 600000,
//             gasPrice: 6000000000,
//             from: fromAddress
//             // value: '质押数量' //注：只有是投资有 BNB的时候 才传 value数量  或者value写死 0
//           },
//           (err, result) => {
//             if (!err && result) {
//               console.log('recharge hash', result)
//               Vue.prototype.$toast('等待上链')
//               resolve(result)
//             } else {
//               reject(err)
//             }
//           }
//         )
//       } catch (err) {
//         Vue.prototype.$toast(err.message)
//       }
//     }
//   })
// }

export const rechargeBNB = () => {
	return new Promise((resolve, reject) => {
		if (window.web3) {
			let web3 = new Web3(window.web3.currentProvider)
			let ethContract = web3.eth.contract(regAbi)
			// let functionInstance = ethContract.at(regAddress)
			let functionInstance = ethContract.at('0xe0cc3940218a40cebf303333c87147f4609ef4b8')
			//当前钱包地址
			let fromAddress = web3.eth.accounts[0]
			//注；如果代币是 BNB 请写死 BNB代币地址 = 0x1000000000000000000000000000000000000000  其他获取后台配置的
			const tokens = ['0x1000000000000000000000000000000000000000']
			const money = formatLongNumer(0.001 * Math.pow(10, 18))
			const tokenAmounts = [money]
			//通用充值方法rechargeSpecifyNew
			// var coinAddress = [coin1] //无论是否自定义归集地址，这里都必须填币种集合
			// var amount = [1000000000000000000] //无论是否自定义归集地址，这里都必须数量集合

			//以下三个参数配置为自定义归集地址，需要确定合约已设置为可自定义归集地址方可使用
			const customeCoin = [] //归集币种数组
			const customeUser = [] //归集地址数组
			const customeAmount = [] //归集数量数组
			console.log('token params', tokens, tokenAmounts)
			try{
				functionInstance.rechargeSpecifyNew(
					tokens,
					tokenAmounts,
					'',
					customeCoin,
					customeUser,
					customeAmount, {
						gas: 350000,
						gasPrice: 5000000000,
						from: fromAddress,
						value: money //注：只有是投资有 BNB的时候 才传 value数量  或者value写死 0
					},
					(err, result) => {
						if (!err && result) {
							// Vue.prototype.$toast('等待上链')
							resolve(result)
						} else {
							console.log("合约失败=" + err)
							reject(err)
						}
					}
				)
			}catch(e){
				console.log("合约错误=" + e)
				//TODO handle the exception
			}
			
		}
	})
}

export const rechagreToken = ({
	ads,
	amount,
	precision,
	remarks
}) => {
	return new Promise((resolve, reject) => {
		//通用充值方法
		if (window.web3) {
			let web3 = new Web3(window.web3.currentProvider)
			let ethContract = web3.eth.contract(regAbi)
			let functionInstance = ethContract.at(regAddress)
			//当前钱包地址
			let fromAddress = web3.eth.accounts[0]
			//注；如果代币是 BNB 请写死 BNB代币地址 = 0x1000000000000000000000000000000000000000  其他获取后台配置的
			const tokens = [ads]
			const money = formatLongNumer(amount * Math.pow(10, precision))
			const tokenAmounts = [money]
			//通用充值方法rechargeSpecifyNew
			// var coinAddress = [coin1] //无论是否自定义归集地址，这里都必须填币种集合
			// var amount = [1000000000000000000] //无论是否自定义归集地址，这里都必须数量集合

			//以下三个参数配置为自定义归集地址，需要确定合约已设置为可自定义归集地址方可使用
			const customeCoin = [] //归集币种数组
			const customeUser = [] //归集地址数组
			const customeAmount = [] //归集数量数组
			console.log('token params', tokens, tokenAmounts, remarks)
			try{
				functionInstance.rechargeSpecifyNew(
					tokens,
					tokenAmounts,
					remarks,
					customeCoin,
					customeUser,
					customeAmount, {
						gas: 350000,
						gasPrice: 5000000000,
						from: fromAddress,
						value: 0 //注：只有是投资有 BNB的时候 才传 value数量  或者value写死 0
					},
					(err, result) => {
						if (!err && result) {
							// Vue.prototype.$toast('等待上链')
							console.log('等待上链')
							console.log("合约成功=" + result)
							resolve(result)
						} else {
							console.log("合约错误=" + err)
							reject(err)
						}
					}
				)
			}catch(e){
				console.log("合约错误=" + e)
				//TODO handle the exception
			}
		}
	})
}

export const rechagreToken2 = ({
	ads1,
	num1,
	ads2,
	num2,
	precision1,
	precision2,
	remarks
}) => {
	return new Promise((resolve, reject) => {
		//通用充值方法
		if (window.web3) {
			let web3 = new Web3(window.web3.currentProvider)
			let ethContract = web3.eth.contract(regAbi)
			let functionInstance = ethContract.at(regAddress)
			//当前钱包地址
			let fromAddress = web3.eth.accounts[0]
			//注；如果代币是 BNB 请写死 BNB代币地址 = 0x1000000000000000000000000000000000000000  其他获取后台配置的
			const tokens = [ads1, ads2]
			const money1 = formatLongNumer(num1 * Math.pow(10, precision1))
			const money2 = formatLongNumer(num2 * Math.pow(10, precision2))
			const tokenAmounts = [money1, money2]
			//通用充值方法rechargeSpecifyNew
			// var coinAddress = [coin1] //无论是否自定义归集地址，这里都必须填币种集合
			// var amount = [1000000000000000000] //无论是否自定义归集地址，这里都必须数量集合

			//以下三个参数配置为自定义归集地址，需要确定合约已设置为可自定义归集地址方可使用
			const customeCoin = [] //归集币种数组
			const customeUser = [] //归集地址数组
			const customeAmount = [] //归集数量数组
			console.log('token params', tokens, tokenAmounts, remarks)

			functionInstance.rechargeSpecifyNew(
				tokens,
				tokenAmounts,
				remarks,
				customeCoin,
				customeUser,
				customeAmount, {
					gas: 350000,
					gasPrice: 5000000000,
					from: fromAddress,
					value: 0 //注：只有是投资有 BNB的时候 才传 value数量  或者value写死 0
				},
				(err, result) => {
					if (!err && result) {
						// Vue.prototype.$toast('等待上链')
						resolve(result)
					} else {
						reject(err)
					}
				}
			)
		}
	})
}
