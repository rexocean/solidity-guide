// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;
import {HelloWorld} from "../HelloWorld.sol";
import {HelloWorld} from "../basic/v1/HelloWorld.sol";

// 1. 直接引入同一个文件系统下的合约
// 2. 引入github上的合约
// 3. 通过包引入

contract HelloWorldFactory {
    HelloWorld hw;
    HelloWorld[] hws;

    function createHelloWorld() public {
        hw = new HelloWorld();
        hws.push(hw);
    }

    function getHelloWorldByIndex(uint256 _index) public view returns(HelloWorld) {
        return hws[_index];
    }

    // 通过一个合约调用另一个合约，这里就是通过工厂合约调用了hw合约的某个func
    function callSayHelloFromFactory(uint256 _index, uint256 id)
        public
        view
        returns(string memory) {
            return hws[_index].sayHello(id);
    }

    function callSetHelloWorldFromFactory(uint256 _index, string memory newString, uint256 _id) public  {
        hws[_index].setHelloWorld(newString, _id);
    }
}
