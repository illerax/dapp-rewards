const {
    loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const {expect} = require("chai");
const {keccak256} = require("hardhat/internal/util/keccak");

describe("RewardsManagement", function () {

    async function deployFixture() {

        const [owner, otherAccount1, otherAccount2] = await ethers.getSigners();
        const RewardsManagement = await ethers.getContractFactory("RewardsManagement");
        const RewardsToken = await ethers.getContractFactory("RewardsToken");
        const contract = await RewardsManagement.deploy();
        const token = await RewardsToken.deploy();
        await contract.deployed();
        await token.deployed();

        await token.grantRole(keccak256("MINTER_ROLE"), contract.address);

        return {contract, token, owner, otherAccount1, otherAccount2};
    }

    describe("Create Task", function () {

        it("Should create rewards task", async function () {
            const {contract, token} = await loadFixture(deployFixture);

            const taskDescription = "test description";
            const taskReward = 123;

            await contract.createTask(
                taskDescription,
                taskReward,
                token.address
            );

            expect(await contract.getTasks())
                .to.have.lengthOf(1);
            expect(await contract.getOwnerTasks())
                .to.have.lengthOf(1);

            const tasks = await contract.getTasks();
            const taskAddress = tasks[0];

            const RewardsTask = await ethers.getContractFactory("RewardsTask");
            const task = await RewardsTask.attach(taskAddress);

            expect(await task.getRewardToken())
                .to.equal(token.address);

            expect(await token.balanceOf(taskAddress))
                .to.equal(taskReward);

            expect(await task.getRewardAmount())
                .to.equal(taskReward);

        });

    });

    describe("Task approval", function () {

        it("Should reject task completion", async function () {
            const {contract, token, owner, otherAccount1, otherAccount2} = await loadFixture(deployFixture);

            const taskDescription = "test description";
            const taskReward = 123;

            await contract.connect(owner).createTask(
                taskDescription,
                taskReward,
                token.address
            );

            const tasks = await contract.getTasks();
            const taskAddress = tasks[0];
            const RewardsTask = await ethers.getContractFactory("RewardsTask");
            const task = await RewardsTask.attach(taskAddress);

            expect(await contract.isRequireApproval(task.address))
                .to.be.false;

            await task.connect(otherAccount1).completeTask();

            expect(await contract.isRequireApproval(task.address))
                .to.be.true;

            await expect(contract.connect(otherAccount2).reject(task.address))
                .to.be.revertedWith("You cannot reject this task");

            await contract.connect(owner).reject(task.address);

            expect(await contract.isRequireApproval(task.address))
                .to.be.false;

            expect(await task.getPayee())
                .to.equal(ethers.constants.AddressZero);

        });

        it("Should approve task completion", async function () {
            const {contract, token, owner, otherAccount1, otherAccount2} = await loadFixture(deployFixture);

            const taskDescription = "test description";
            const taskReward = 123;

            await contract.connect(owner).createTask(
                taskDescription,
                taskReward,
                token.address
            );

            const tasks = await contract.getTasks();
            const taskAddress = tasks[0];
            const RewardsTask = await ethers.getContractFactory("RewardsTask");
            const task = await RewardsTask.attach(taskAddress);

            expect(await contract.isRequireApproval(task.address))
                .to.be.false;

            await task.connect(otherAccount1).completeTask();

            expect(await contract.isRequireApproval(task.address))
                .to.be.true;

            await expect(contract.connect(otherAccount2).approve(task.address))
                .to.be.revertedWith("You cannot approve this task");

            await contract.connect(owner).approve(task.address);

            expect(await contract.getTasks())
                .to.have.lengthOf(0);
            expect(await contract.connect(owner).getOwnerTasks())
                .to.have.lengthOf(0);

            expect(await token.balanceOf(taskAddress))
                .to.equal(0);

        });

    });


});
