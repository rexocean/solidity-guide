require("@nomicfoundation/hardhat-toolbox");
require("@chainlink/env-enc").config()
require("./tasks")

const SEPOLIA_URL = process.env.SEPOLIA_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const PRIVATE_KEY_1 = process.env.PRIVATE_KEY_1
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

// 在 module.exports 之前添加
console.log("SEPOLIA_URL:", SEPOLIA_URL ? "已设置" : "未设置");
console.log("PRIVATE_KEY:", PRIVATE_KEY ? "已设置" : "未设置");
console.log("ETHERSCAN_API_KEY:", ETHERSCAN_API_KEY ? "已设置" : "未设置");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks:{
    sepolia:{
      url: SEPOLIA_URL,
      accounts:[
       PRIVATE_KEY,PRIVATE_KEY_1
      ],
      chainId:11155111
    }
  },
  etherscan:{
    apiKey: ETHERSCAN_API_KEY
  }
};
