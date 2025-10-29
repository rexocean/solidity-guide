// function deployFunction(){
//     console.log("this is a deploy function")
// }
// module.exports.default=deployFunction

const { getNamedAccounts, deployments, network } = require("hardhat");
const {developmentChains,networkConfig,LOCK_TIME,CONFIRMATIONS} = require("../helper-hardhat-config")

// module.exports = async(hre)=> {
//     const getNamedAccounts = hre.getNamedAccounts
//     const depolyments = hre.depolyments
//     console.log("this is a deploy function")
// }

module.exports = async({getNamedAccounts, deployments})=>{
    // 
    const {firstAccount} = await getNamedAccounts()
    // const firstAccount = (await getNamedAccounts()).firstAccount
    // const {secondAccount} = (await getNamedAccounts())
    // const deploy = deployments.deploy
    const {deploy}= deployments
    // const mockDataFeed = await deployments.get("MockV3Aggregator")
    
    // console.log(`first account is ${firstAccount}`)
    // console.log(`second account is ${secondAccount}`)
    // console.log("this is a deploy function")

    let dataFeedAddr
    if(developmentChains.includes(network.name)){
        const mockV3Aggregator = await deployments.get("MockV3Aggregator")
        dataFeedAddr = mockV3Aggregator.address
    }else {
        dataFeedAddr = networkConfig[network.config.chainId].ethUsdDataFeed
    }

    const fundMe = await deploy("FundMe",{
        from :firstAccount,
        // args:[180, mockDataFeed.address], 
        args:[LOCK_TIME, dataFeedAddr],
        log:true,
        waitConfirmations:CONFIRMATIONS
    })

    // remove deployments directory or add --reset flag if you redeploy contract

     // verify fundme
    if(hre.network.config.chainId == 11155111 && process.env.ETHERSCAN_API_KEY){
        await hre.run("verify:verify",{
            address:fundMe.address,
            constructorArguments:[LOCK_TIME, dataFeedAddr],
        });
    }else{
        console.log("network is not sepolia, verification skipped...")
    }

}

module.exports.tags = ["all", "fundMe"]