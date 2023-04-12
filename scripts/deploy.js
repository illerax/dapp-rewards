const {ethers, run, network} = require("hardhat");
const {keccak256} = require("hardhat/internal/util/keccak");

async function main() {

    const RewardsToken = await ethers.getContractFactory("RewardsToken");
    const tokenContract = await RewardsToken.deploy();
    await tokenContract.deployed();
    console.log("Token address:", tokenContract.address);

    const RewardsManagement = await ethers.getContractFactory("RewardsManagement");
    const rewardsManagementContract = await RewardsManagement.deploy();
    await rewardsManagementContract.deployed();
    console.log("RewardsManagement address:", rewardsManagementContract.address);

    await tokenContract.grantRole(keccak256("MINTER_ROLE"), rewardsManagementContract.address);

    console.log(network.config);
    if (network.config.chainId === 97) {
        await tokenContract.deployTransaction.wait(6);
        await verify(tokenContract.address, [])

        await rewardsManagementContract.deployTransaction.wait(6);
        await verify(rewardsManagementContract.address, [])
    }
}

async function verify(contractAddress, arguments) {
    await run("verify:verify", {
        address: contractAddress,
        constructorArguments: arguments
    })
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
