// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./RewardsManagement.sol";

contract RewardsTask is AccessControl {

    bytes32 public constant APPROVER_ROLE = keccak256("APPROVER_ROLE");

    event Approved(address payee, uint256 reward);
    event Rejected(address payee);

    string description;
    RewardsManagement mgt;
    address payee;
    bool isCompleted = false;
    ERC20 rewardToken;

    constructor(string memory _description, RewardsManagement _mgt, ERC20
        _rewardToken) {
        _grantRole(APPROVER_ROLE, address(_mgt));
        description = _description;
        mgt = _mgt;
        rewardToken = _rewardToken;
    }

    function completeTask() public {
        require(payee == address(0), "The task is already completed");
        payee = msg.sender;
        mgt.notifyRequireApproval(this);
    }

    function approve() public onlyRole(APPROVER_ROLE) {
        require(isCompleted == false, "The task is already completed");
        require(payee != address(0), "The payee address is empty");
        uint256 reward = getRewardAmount();
        rewardToken.transfer(payee, reward);
        isCompleted = true;
        emit Approved(payee, reward);
    }

    function reject() public onlyRole(APPROVER_ROLE) {
        emit Rejected(payee);
        delete payee;
    }

    function getRewardToken() public view returns (address){
        return address(rewardToken);
    }

    function getRewardAmount() public view returns (uint256){
        return rewardToken.balanceOf(address(this));
    }

    function getPayee() public view returns (address){
        return payee;
    }

    function getDescription() public view returns (string memory){
        return description;
    }

    function getIsCompleted() public view returns (bool){
        return isCompleted;
    }

}