// function deployFunction(){
//     console.log("this is a deploy function")
// }
// module.exports.default=deployFunction

const { getNamedAccounts, deployments, network } = require("hardhat");

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
    if(network.name == "hardhat"){
        dataFeedAddr = await deployments.get("MockV3Aggregator")
    }else {
        dataFeedAddr = ""
    }

    await deploy("FundMe",{
        from :firstAccount,
        // args:[180, mockDataFeed.address], 
        args:[180, dataFeedAddr],
        log:true 
    })

}

module.exports.tags = ["all", "fundMe"]