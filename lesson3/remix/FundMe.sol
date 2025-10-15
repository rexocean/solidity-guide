// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import {AggregatorV3Interface} from "../FundMe_flattened.sol";

contract FundMe {
    mapping(address => uint256) public fundersToAmount;
    address public owner;
    address erc20Addr;

    uint256 constant MINUMUM_VALUE= 100 *10 ** 18;
    uint256 constant TARGET = 1000*10**18;

    uint256 deploymentTimestamp;
    uint256 lockTime;
    bool  public getFundSuccess = false;

    AggregatorV3Interface internal dataFeed;


    constructor(uint256 _lockTime){
        dataFeed = AggregatorV3Interface(0x2345435243415243);
        owner = msg.sender;
        lockTime = _lockTime;
        deploymentTimestamp = block.timestamp;
    }

    function fund() external payable {
        require(convertEthToUsd(msg.value) >= MINUMUM_VALUE,"Send more ETH");
        require(block.timestamp < deploymentTimestamp + lockTime, "window is closed");
        fundersToAmount[msg.sender] = msg.value;
    }

    function getFund() external windowClosed onlyOwner{
        require(convertEthToUsd(address(this).balance) >= TARGET, "Target is not reached");
        bool success;
        // transfer 失败了会回滚
        // paybale(msg.sender).transfer(address(this).balance);

        // send 失败了返回false
        // bool success = payable(msg.sender).send(address(this).balance);
        // require(success, "tx failed");

        // call 可以携带数据，返回函数和是否成功

        (success) = payable(msg.sender).call{value:address(this).balance}("");
        require(success,"transfer tx failed");
        fundersToAmount[msg.sender] = 0;
        getFundSuccess = true;
    }

    function refund() external windowClosed {
        require(convertEthToUsd(address(this).balance) < TARGET, "Traget is reached");
        require(fundersToAmount[msg.sender] !=0, "there is no fund for you");
        bool success;
        (success, ) = payable(msg.sender).call{value:fundersToAmount[msg.sender]}("");
        require(success, "tranfer tx failed");
        fundersToAmount[msg.sender] = 0;
    }

    function setFunderToAmount(address funder, uint256 amountToUpdate) external {
        require(msg.sender == erc20Addr, "you do not have permission to call this function");
        fundersToAmount[funder] = amountToUpdate;
    }

    function setErc20Addr(address _erc20Addr) public onlyOwner {
        erc20Addr = _erc20Addr;
    }
    

    function convertEthToUsd(uint256 ethAmount) internal view returns (uint256) {
        uint256 ethPrice = uint256(getChainlinkDataFeedLatestAnswer());
        return ethAmount * ethPrice / (10 ** 8);
    }

    function getChainlinkDataFeedLatestAnswer() public view returns (int) {
        (int answer) = dataFeed.latestRoundData();
        return answer;
    }

    function transferOwnership(address newOwner) public onlyOwner {
        owner = newOwner;
    }

    modifier onlyOwner(){
        require(msg.sender == owner, "this function can only be called by owner");
        _;
    }

    modifier windowClosed(){
        require(block.timestamp >= deploymentTimestamp + lockTime, "window is not closed");
        _;
    }
}
