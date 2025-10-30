const {task} = require("hardhat/config")

task("refund-fundme", "refund fund to msg.sender")
  .addParam("addr", "fundme contract address")
  .setAction(async (taskArgs, hre) => {
    const fundMeFactory = await ethers.getContractFactory("FundMe");
    const fundMe = fundMeFactory.attach(taskArgs.addr);

    const [firstAccount,secondAccount] = await ethers.getSigners();

    const tx = await fundMe.connect(secondAccount).refund();
    await tx.wait();

    console.log(`✅ Refund success for ${secondAccount.address}`);


    const firstAccountBalanceInFundMe = await fundMe.fundersToAmount(firstAccount.address)
    const secondAccountBalanceInFundMe = await fundMe.fundersToAmount(secondAccount.address)
    console.log(`balance of first account ${firstAccount.address} is ${firstAccountBalanceInFundMe}`)
    console.log(`balance of second account ${secondAccount.address} is ${secondAccountBalanceInFundMe}`)
  });


module.exports={}
