// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

contract HelloWorld {

    string strVar = "hello world";

    Info[] infos;

    /**
     * struct 结构体 不同类型
     * array  数组   相同类型
     * mapping 映射  kv
     */
    struct Info {
        string phrase;
        uint256 id;
        address addr;
    }

    mapping(uint256 id => Info info) infoMapping;

    function sayHello(uint256 _id) public view returns (string memory) {
        if (infoMapping[_id].addr == address(0x0){
            return addInfo(strVar);
        }else{
            return addInfo(infoMapping[_id].phrase);
        }
    }

    function setHelloWorld(string memory newString, uint256 _id) public {
        Info memory info = Info(newString, _id, msg.sender);
        infoMapping[_id] = info;
    }

    function addInfo(string memory helloWorldStr) internal pure returns (string memory) {
        return string.concat(helloWorldStr, " from Frank's contract.");
    }

}
