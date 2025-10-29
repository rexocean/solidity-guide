const {DECIMAL, INITIAL_ANSWER, developmentChains} = require('../helper-hardhat-config')

module.exports = async({getNamedAccounts, deployments})=>{


     if(developmentChains.includes(network.name)){
        const {firstAccount} = await getNamedAccounts()
        const {deploy} = deployments
        await deploy("MockV3Aggregator",{
            from :firstAccount,
            // 代币用USD则是8位精度，eth则是18位精度,假设是3000U,则是3000后面8个0
            // 第一位是精度，第二位是mock的值
            args:[DECIMAL, INITIAL_ANSWER],
            log:true,
        })
     }else {
        console.log("enviroment is not local, verification skipped...")
     }
    

}

module.exports.tags = ["all", "mock"]