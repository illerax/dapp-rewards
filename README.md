# Rewards dApp

Rewards application on BNB Chain

## Demo
**Application**: [https://illerax.github.io/dapp-rewards/](https://illerax.github.io/dapp-rewards/)

## Contracts
**Token Contract:**: [https://testnet.bscscan.com/address/0x015733614A4017C23F94658B41870acd1E8380D7](https://testnet.bscscan.com/address/0x015733614A4017C23F94658B41870acd1E8380D7)
**Management Contract:**: [https://testnet.bscscan.com/address/0xCFAA10eD49dC51aF5dfbD6412d6413E6523CA6f7](https://testnet.bscscan.com/address/0xCFAA10eD49dC51aF5dfbD6412d6413E6523CA6f7)

### Development

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

### Deploy to BNB testnet

1. Configure environment variables
    - BNB_TESTNET_RPC_URL
    - BNB_TESTNET_PRIVATE_KEY
    - BSCSCAN_API_KEY
2. Run deploy script
```shell
npx hardhat run scripts/deploy.js --network bnbtestnet
```

## Frontend

### Development
```shell
npm --prefix frontend start
```

### Deploy
```shell
npm --prefix frontend run deploy
```