// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

/**
 * 众筹，去中心化自动完成，摒弃三方数据信任和安全问题
 * 1. 收款函数
 * 2. 记录投资人并且查看
 * 3. 在锁定期内，达到目标值，生产商可以提款
 * 4. 在锁定期内，为达到目标值，投资人可以在锁定期以后退款
 */
contract FundMe {

    mapping(address => uint256) public fundersToAmount;

    uint256 MINIMUM_VALUE = 1 * 10 ** 18;// 1 eth

    function fund() external payable {
        require(msg.value >= MINIMUM_VALUE, "SEND MORE ETH");
        fundersToAmount[msg.sender] = msg.value;
    }

}
