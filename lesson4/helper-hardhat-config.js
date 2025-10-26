const DECIMAL = 8
const INITIAL_ANSWER=300000000000
const developmentChains = ["hardhat","local"]

const networkConfig = {
    // SEPOLIA_CHAINID
    11155111:{
        ethUsdDataFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306"
    },
    // BNB-CHAINID
    97:{
        ethUsdDataFeed: "0xxxxxxxxx"
    }
}

// 下面这么写，拿不到值
// module.exports = {
//   DECIMAL,
//   INITIAL_ANSWER
// }

export default {
    DECIMAL,
    INITIAL_ANSWER,
    developmentChains
}