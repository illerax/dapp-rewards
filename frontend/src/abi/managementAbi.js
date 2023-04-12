export default [
    {
        "inputs": [
            {
                "internalType": "contract RewardsTask",
                "name": "_task",
                "type": "address"
            }
        ],
        "name": "approve",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_description",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_reward",
                "type": "uint256"
            },
            {
                "internalType": "contract RewardsToken",
                "name": "_rewardsToken",
                "type": "address"
            }
        ],
        "name": "createTask",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getOwnerTasks",
        "outputs": [
            {
                "internalType": "contract RewardsTask[]",
                "name": "",
                "type": "address[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getTasks",
        "outputs": [
            {
                "internalType": "contract RewardsTask[]",
                "name": "",
                "type": "address[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract RewardsTask",
                "name": "_task",
                "type": "address"
            }
        ],
        "name": "isRequireApproval",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract RewardsTask",
                "name": "task",
                "type": "address"
            }
        ],
        "name": "notifyRequireApproval",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract RewardsTask",
                "name": "_task",
                "type": "address"
            }
        ],
        "name": "reject",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]