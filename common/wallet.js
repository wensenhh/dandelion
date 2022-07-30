"use strict"
import {
    ethers
} from "ethers";
import wallet_config from "./wallet_config.js";
import tools from "./tools.js";
import {
		ayaaddress,
		staking,
		ayaabi
	} from "@/common/abi/aya";
const {
    ethereum
} = window;
const WAValidator = require('wallet-address-validator');
var tp = require('tp-js-sdk')
let wallet = {};

const chain_name = 'bsc';
const chain_id = 56;

async function metaMaskPermiss() {
    await ethereum.request({
        method: 'wallet_requestPermissions',
        params: [{
            eth_accounts: {}
        }],
    }).catch(err => {
        throw '授权失败';
    })
}

wallet.changeNetwork = async () => {
    let isMetamaskWallet = ethereum && ethereum.isMetaMask;
    let isTpWallet = tp.isConnected();

    if (isTpWallet) {
        let currentWallt = await tp.getCurrentWallet();
        if (!currentWallt || !currentWallt.result) {
            await wallet.selectTpWallet(chain_name);
        }
        let blockChain = currentWallt.data.blockchain.toLowerCase();
        if (blockChain !== chain_name) {
            await wallet.selectTpWallet(chain_name);
        }
    } else if (isMetamaskWallet) {
        let networkId = await wallet.getNetWorkId();
        if (networkId != chain_id) {
            await wallet.metaMaskWallet(chain_id);
            await metaMaskPermiss();
        }
    }
}

wallet.metaMaskWallet = async (chainId) => {
    try {
        await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{
                'chainId': ethers.utils.hexValue(chainId),
            }]
        });
    } catch (error) {
        if (error.code === 4902 && chainId == 56) {
            await addBscNetwork();
        } else {
            throw '切换网络失败';
        }
    }
}

wallet.getAddress = async () => {
	let isTpWallet = tp.isConnected();
	if (isTpWallet) {
		let currentWallt = await tp.getCurrentWallet();
		return currentWallt.data.address;
	} else {
		let accounts = await ethereum.request({
			method: 'eth_requestAccounts'
		});
		return accounts[0];
	}
}

async function addBscNetwork() {
    await ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
            chainId: ethers.utils.hexValue(56),
            rpcUrls: ['https://bsc-dataseed.binance.org/'],
            chainName: 'BSC Chain',
            blockExplorerUrls: ['https://bscscan.com/'],
        },],
    });
}

wallet.selectTpWallet = async (chain) => {
    await tp.getWallet({
        walletTypes: [chain],
        switch: true
    });
}

wallet.authTpWallet = async (chain) => {
    return await tp.getWallet({
        walletTypes: [chain],
        switch: false
    });
}

wallet.getTransactionReceipt = async (txHash) => {
	 let provider = new ethers.providers.Web3Provider(window.ethereum);
	  return provider.getTransactionReceipt(txHash);
	  
    // return getProvider().getTransactionReceipt(txHash);
}

wallet.validEthAddr = (addr) => {
    return WAValidator.validate(addr, 'ETH')
}

wallet.buyMagicBox = async (price) => {
    let transferSigner = getTransferSigner();
	let approveAmount = ethers.utils.parseUnits(price, 18);
    return await transferSigner.buyMagicBox(approveAmount);
}

wallet.buyBlindBox = async (price) => {
    let transferSigner = getTransferSigner();
	let approveAmount = ethers.utils.parseUnits(price, 18);
    return await transferSigner.buyBlindBox(approveAmount);
}

wallet.buyEnergy = async (isPayUsdt,value) => {
    let transferSigner = getTransferSigner();
	let amount = ethers.utils.parseUnits(value + '', 18);
    return await transferSigner.buyEnergy(isPayUsdt,amount);
}

wallet.invest = async (value) => {
    let transferSigner = getTransferSigner();
    let transferValue = ethers.utils.parseUnits(value + "", 18)
    return await transferSigner.invest(transferValue);
}

wallet.allowanceOas = async (addr) => {
    return await allowance(addr, wallet_config.OAS.tokenAddress);
}

wallet.allowanceUsdt = async (addr) => {
    return await allowance(addr, wallet_config.USDT.tokenAddress);
}

async function allowance(addr, token) {
    let factory_address = wallet_config.factoryAddress;
	console.log("factory_address====>>",factory_address);
    let provider = new ethers.providers.Web3Provider(window.ethereum);
	console.log("provider====>>",provider);
	console.log("token====>>",token);
	console.log("allowance====>>",wallet_config.abi.allowance);
    let tokenContract = new ethers.Contract(token, wallet_config.abi.allowance, provider);
    let res = await tokenContract.allowance(addr, factory_address);
    return ethers.utils.formatUnits(res, 18);
}

wallet.approveOas = async (token, value) => {
    return await approve(wallet_config.OAS.tokenAddress, value);
}

wallet.approveUsdt = async (token, value) => {
    return await approve(wallet_config.USDT.tokenAddress, value);
}

wallet.approveAya = async (token, value) => {
    return await approve(staking, value);
}

async function approve(token, value) {
	console.log("token====>>",token);
	console.log("value====>>",value);
    let factory_address = wallet_config.factoryAddress;
	console.log("factory_address====>>",factory_address);
    let approveAmount = ethers.utils.parseUnits(value, 18);
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = provider.getSigner();
    let tokenContract = new ethers.Contract(token, wallet_config.abi.approve, provider);
    let tokentTransferSinger = tokenContract.connect(signer);
    let res = await tokentTransferSinger.approve(factory_address, approveAmount);
    return res;
}


function getTransferSigner() {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let factoryAddress = wallet_config.factoryAddress;
    let abi = wallet_config.abi.factory;
    let contract = new ethers.Contract(factoryAddress, abi, provider);
    let signer = provider.getSigner();
    return contract.connect(signer);
}

export default wallet;
