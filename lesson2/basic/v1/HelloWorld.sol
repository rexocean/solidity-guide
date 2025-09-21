// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

contract HelloWorld {

    string strVar = "hello world";

    /**
     * 6 ways to store variable
     * 1.storage
     * 2.memory
     * 3.call data
     * 4.stack
     * 5.codes
     * 6.logs
     *
     * 基本数据类型是不用指定存储方式的，如uint256，编译器会自动解析
     * storage 默认是合约内部的
     * 函数入参，如string必须要求指定存储方式，如memory还是calldata
     */

    function sayHello() public view returns (string memory) {
        return addInfo(strVar);
    }

    function setHelloWorld(string memory newString) public {
        strVar = newString;
    }

    function addInfo(string memory helloWorldStr) internal pure returns (string memory) {
        return string.concat(helloWorldStr, " from Frank's contract.");
    }

}
