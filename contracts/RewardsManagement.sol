// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./RewardsTask.sol";
import "./RewardsToken.sol";

contract RewardsManagement {

    RewardsTask[] tasks;
    mapping(address => RewardsTask[]) ownerTasks;
    mapping(RewardsTask => address) taskOwners;
    mapping(RewardsTask => bool) requireApproval;

    function createTask(string calldata _description, uint256 _reward, RewardsToken _rewardsToken) public {
        RewardsTask task = new RewardsTask(
            _description,
            this,
            _rewardsToken
        );
        _rewardsToken.mint(address(task), _reward);
        tasks.push(task);
        ownerTasks[msg.sender].push(task);
        taskOwners[task] = msg.sender;
        requireApproval[task] = false;
    }

    function notifyRequireApproval(RewardsTask task) public {
        requireApproval[task] = true;
    }

    function approve(RewardsTask _task) public {
        require(taskOwners[_task] == msg.sender, "You cannot approve this task");
        require(requireApproval[_task] == true, "The task is not completed yet");
        _task.approve();
        deleteItemFromArray(_task, tasks);
        deleteItemFromArray(_task, ownerTasks[msg.sender]);
        delete (taskOwners[_task]);
        delete (requireApproval[_task]);

    }

    function reject(RewardsTask _task) public {
        require(taskOwners[_task] == msg.sender, "You cannot reject this task");
        require(requireApproval[_task] == true, "The task is not completed yet");
        _task.reject();
        requireApproval[_task] = false;
    }

    function getTasks() public view returns (RewardsTask[] memory){
        return tasks;
    }

    function getOwnerTasks() public view returns (RewardsTask[] memory){
        return ownerTasks[msg.sender];
    }

    function isRequireApproval(RewardsTask _task) public view returns (bool){
        return requireApproval[_task];
    }

    function deleteItemFromArray(RewardsTask _task, RewardsTask[] storage _tasks) internal {
        for (uint256 i = 0; i < _tasks.length; i++) {
            if (_tasks[i] == _task) {
                _tasks[i] = _tasks[_tasks.length - 1];
                _tasks.pop();
                break;
            }
        }
    }

}