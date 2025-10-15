// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

contract HelloWorld {
    string default_hello = "hello world";

    struct Info {
        address addr;
        uint256 id;
        string phrase;
    }

    Info[] infos;
    mapping(uint256 id =>Info info) infoMapping;

    constructor(){

    }

    function setHelloWorld(uint256 _id, string memory newString) public  {
        Info memory info = Info(msg.sender, _id, newString);
        infoMapping[_id] = info;
        infos.push(info);
    }

    function sayHelloByMapping(uint256 _id) public view returns(string memory) {
        if(infoMapping[_id].addr == address(0x0)) {
            return addInfo(default_hello);
        }else {
            return addInfo(infoMapping[_id].phrase);
        }
    }

    function sayHelloByArray(uint256 _id) public view returns(string memory) {
        for(uint256 i = 0; i < infos.length; i++) {
            if(infos[i].id == _id) {
                return addInfo(infos[i].phrase);
            }
        }
        return addInfo(default_hello);
    }

    function addInfo(string memory _phrase) internal pure returns(string memory) {
        return string.concat(_phrase, " from Fay's contract");
    }
}
