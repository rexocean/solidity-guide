const {task} = require("hardhat/config")

task("deploy-fundme","depoly and verify fundme contract").setAction(async(TASK_COMPILE_GET_REMAPPINGS, hre) =>{
     // create factory
    const fundMeFactory = await ethers.getContractFactory("FundMe")
    console.log("contract depolying")
    // depoly contract from factory
    const fundMe = await fundMeFactory.deploy(300)
    await fundMe.waitForDeployment()
    console.log("contract has been deployed successfully, FundMe deployed to:", await fundMe.getAddress())

    // verify fundme
    if(hre.network.config.chainId == 11155111 && process.env.ETHERSCAN_API_KEY){
        console.log("Waitting for 1 confirmations")
        // await fundMe.deploymentTransaction.wait(1)
        const deploymentTx = await fundMe.deploymentTransaction() // 注意这里加了 ()
        await deploymentTx.wait(1) // 等待1个区块确认
        await verifyFundMe(fundMe.target, [300])
    }else {
        console.log("verification skip....")
    }
})

async function verifyFundMe(fundMeAddr, args) {
    await hre.run("verify:verify",{
        address:fundMeAddr,
        constructorArguments:args,
    })
}

module.exports={}