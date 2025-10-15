// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

contract FundToken {

    string public tokenName;
    string public tokenSymbol;
    uint256 public totalSupply;
    address public owner;
    mapping(address=>uint256) public balances;

    constructor(string memory _tokenName, string memory _tokenSymbol){
        tokenName = _tokenName;
        tokenSymbol = _tokenSymbol;
        owner = msg.sender;
    }

    // mint
    function mint(uint256 amountToMint) public {
        balances[msg.sender] += amountToMint;
        totalSupply += amountToMint;
    }

    // transfer
    function transfer(address payee, uint256 amount) public {
        require(balances[msg.sender] >= amount, "You do not have enough balance to transfer");
        balances[msg.sender] -= amount;
        balances[payee] +=amount;
    }

    // balanceOf
    function balanceOf(address addr) public view returns(uint256) {
        return balances[addr];
    }
}
