// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

abstract contract Parent {

    uint256 public a;
    uint256 private b;
    uint256 internal c;

    function addOne() public {
        a++;
    }

    function addTwo() external {
        a+=2;
    }

    function addThree() internal {
        a+=3;
    }

    function addFive() public virtual;

    function addSix() public virtual {
        a += 6;
    }

}


contract Child is Parent{

    function addFour() public {
        a+=4;
        // 子合约通过this调用external的func
        this.addTwo();
        // 子合约可以直接调用 internal的func
        addThree();
    }

    // 虚函数重写用override
    function addFive() public override {
        a +=5;
    }
}