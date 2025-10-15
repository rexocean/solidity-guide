// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import {HelloWorld} from "./HelloWorld.sol";


contract HelloWorldFactory {

    HelloWorld hw;
    HelloWorld[] hws;

    constructor(){

    }

    function createHelloWorld() public {
        hw = new HelloWorld();
        hws.push(hw);
    }

    function getHelloWorldByIndex(uint256 _idx) public view returns(HelloWorld) {
        return hws[_idx];
    }

    // 查询合约的长度
    function getHelloWorldContractLength() public view returns(uint256) {
        return hws.length;
    }

    // 委托，通过合约工厂来调用内部合约的func，首先要idx来找到是哪个合约，剩下的就是参数传递了
    function callSayHelloFromFactory(uint256 _idx, uint256 _id) public view returns (string memory) {
        return hws[_idx].sayHelloByMapping(_id);
    }

    function callSetHelloWorldFromFactory(uint256 _idx, uint256 _id, string memory newString) public {
        hws[_idx].setHelloWorld(_id, newString);
    }
}
