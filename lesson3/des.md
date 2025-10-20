函数/变量
public：能继承，能访问。
        内部、子合约、外部合约（变量自动生成 getter）
private：不能继承，合约内部；
internal：能继承，仅内部和继承者能调用
external：外部能调用（子合约内部调用需加 this.）

注意：
external不能修饰变量


ERC20合约
openZeppelin 写了很多标准的合约，审计合约是否安全
标准：
ERC20:FT，Fungible Token, 通用型，可交换，可切分
ERC721:NFT, 独特性，不可交换，不可切分。应用在艺术品、会员卡等

abstract 
virtual虚函数，子合约可以重写，如果有virtual，必须abstract