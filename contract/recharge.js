export const regAddress = '0x074DFdA838b7b99954655AA7712A7DCC63782AC8'
export const regAbi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_tokenAddress",
				"type": "address"
			},
			{
				"name": "_tokenId",
				"type": "uint256"
			},
			{
				"name": "remarks",
				"type": "string"
			}
		],
		"name": "rechargeCard",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_tokenAddress",
				"type": "address[]"
			},
			{
				"name": "_amount",
				"type": "uint256[]"
			},
			{
				"name": "_remarks",
				"type": "string"
			},
			{
				"name": "_customeCoin",
				"type": "address[]"
			},
			{
				"name": "_customeUser",
				"type": "address[]"
			},
			{
				"name": "_customeAmount",
				"type": "uint256[]"
			}
		],
		"name": "rechargeSpecifyNew",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_customer",
				"type": "bool"
			}
		],
		"name": "setCustomer",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_mainAddress",
				"type": "address"
			}
		],
		"name": "setMainAddress",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_subcoinAddress",
				"type": "address"
			}
		],
		"name": "setSubcoinAddress",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "userAddress",
				"type": "address"
			},
			{
				"name": "tokenAddress",
				"type": "address"
			},
			{
				"name": "amount",
				"type": "uint256"
			},
			{
				"name": "shoubi",
				"type": "address"
			}
		],
		"name": "withdrawalManage",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_users",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_tokenAddress",
				"type": "address[]"
			},
			{
				"indexed": false,
				"name": "_amount",
				"type": "uint256[]"
			},
			{
				"indexed": false,
				"name": "_remarks",
				"type": "string"
			}
		],
		"name": "saveOrder",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "isCustomer",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "mainAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "subcoinAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]