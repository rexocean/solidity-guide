// import ether.js
// create main function
// execute main function

const { ethers } = require("hardhat")

async function main() {
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

    // invoke contract by script

    // init 2 accounts
     const [firstAccount, secondAccount] = await ethers.getSigners()

    // fund contract with first account
    const fundTx = await fundMe.fund({value: ethers.parseEther("0.5")})
    await fundTx.wait()

    // check balance of contract
    const balanceOfContract = await ethers.provider.getBalance(fundMe.target)
    console.log(`balance of the contract is ${balanceOfContract}`)

    // fund contract with second account
    const fundTxWithSecondAccount = await fundMe.connect(secondAccount).fund({value: ethers.parseEther("0.5")})
    await fundTxWithSecondAccount.wait()
    
    // check balance of contract
    const balanceOfContractAfterSecondFund = await ethers.provider.getBalance(fundMe.target)
    console.log(`balance of the contract is ${balanceOfContractAfterSecondFund}`)
    // check mapping fundersToAmount
    const firstAccountBalanceInFundMe = await fundMe.fundersToAmount(firstAccount.address)
     const secondAccountBalanceInFundMe = await fundMe.fundersToAmount(secondAccount.address)
    console.log(`balance of first account ${firstAccount.address} is ${firstAccountBalanceInFundMe}`)
    console.log(`balance of second account ${secondAccount.address} is ${secondAccountBalanceInFundMe}`)
}

async function verifyFundMe(fundMeAddr, args) {
    await hre.run("verify:verify",{
        address:fundMeAddr,
        constructorArguments:args,
    })
}

main().then().catch((error)=>{
    console.error(error)
    process.exit(0)
})