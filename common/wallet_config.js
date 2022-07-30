const wallet_config = {
		"factoryAddress": "0x01D3b79487C9Caa8af14ed9E3318C0D055797525",
		"USDT": {
			"tokenAddress": "0x55d398326f99059ff775485246999027b3197955",
			"decimal": 18,
		},
		"OAS": {
			"tokenAddress": "0x2280F1E7840790F03af19f190e7c276A18683b91",
			"decimal": 18,
		},
		'abi': {
			'allowance': [{
				"constant": true,
				"inputs": [{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "spender",
						"type": "address"
					}
				],
				"name": "allowance",
				"outputs": [{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			}],
			'approve': [{
				"constant": false,
				"inputs": [{
						"internalType": "address",
						"name": "spender",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "value",
						"type": "uint256"
					}
				],
				"name": "approve",
				"outputs": [{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "function"
			}],
			'balance': [{
				"constant": true,
				"inputs": [{
					"internalType": "address",
					"name": "owner",
					"type": "address"
				}],
				"name": "balanceOf",
				"outputs": [{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			}],
			'factory': [{
					"constant": false,
					"inputs": [{
							"name": "_oasToken",
							"type": "address"
						},
						{
							"name": "_usdtToken",
							"type": "address"
						}
					],
					"name": "setToken",
					"outputs": [],
					"payable": false,
					"stateMutability": "nonpayable",
					"type": "function"
				},
				{
					"constant": false,
					"inputs": [{
						"name": "value",
						"type": "uint256"
					}],
					"name": "invest",
					"outputs": [{
						"name": "",
						"type": "bool"
					}],
					"payable": false,
					"stateMutability": "nonpayable",
					"type": "function"
				},
				{
					"constant": false,
					"inputs": [{
							"name": "isUsdtPay",
							"type": "bool"
						},
						{
							"name": "value",
							"type": "uint256"
						}
					],
					"name": "buyEnergy",
					"outputs": [{
						"name": "",
						"type": "bool"
					}],
					"payable": false,
					"stateMutability": "nonpayable",
					"type": "function"
				},
				{
					"constant": false,
					"inputs": [{
						"name": "value",
						"type": "uint256"
					}],
					"name": "buyBlindBox",
					"outputs": [{
						"name": "",
						"type": "bool"
					}],
					"payable": false,
					"stateMutability": "nonpayable",
					"type": "function"
				},
				{
					"constant": false,
					"inputs": [{
						"name": "value",
						"type": "uint256"
					}],
					"name": "buyMagicBox",
					"outputs": [{
						"name": "",
						"type": "bool"
					}],
					"payable": false,
					"stateMutability": "nonpayable",
					"type": "function"
				},
				{
					"constant": true,
					"inputs": [],
					"name": "owner",
					"outputs": [{
						"name": "",
						"type": "address"
					}],
					"payable": false,
					"stateMutability": "view",
					"type": "function"
				},
				{
					"constant": false,
					"inputs": [{
							"name": "user",
							"type": "address"
						},
						{
							"name": "value",
							"type": "uint256"
						}
					],
					"name": "withdrawToken",
					"outputs": [{
						"name": "",
						"type": "bool"
					}],
					"payable": false,
					"stateMutability": "nonpayable",
					"type": "function"
				},
				{
					"constant": true,
					"inputs": [],
					"name": "usdtToken",
					"outputs": [{
						"name": "",
						"type": "address"
					}],
					"payable": false,
					"stateMutability": "view",
					"type": "function"
				},
				{
					"constant": true,
					"inputs": [],
					"name": "oasToken",
					"outputs": [{
						"name": "",
						"type": "address"
					}],
					"payable": false,
					"stateMutability": "view",
					"type": "function"
				},
				{
					"constant": false,
					"inputs": [{
							"name": "token",
							"type": "address"
						},
						{
							"name": "value",
							"type": "uint256"
						},
						{
							"name": "to",
							"type": "address"
						}
					],
					"name": "takeToken",
					"outputs": [{
						"name": "",
						"type": "bool"
					}],
					"payable": false,
					"stateMutability": "nonpayable",
					"type": "function"
				},
				{
					"inputs": [],
					"payable": false,
					"stateMutability": "nonpayable",
					"type": "constructor"
				},
				{
					"anonymous": false,
					"inputs": [{
							"indexed": true,
							"name": "user",
							"type": "address"
						},
						{
							"indexed": false,
							"name": "value",
							"type": "uint256"
						},
						{
							"indexed": false,
							"name": "consumeType",
							"type": "uint8"
						},
						{
							"indexed": false,
							"name": "timestamp",
							"type": "uint256"
						}
					],
					"name": "Consume",
					"type": "event"
				}
			]

		},
	}

		export default wallet_config;
