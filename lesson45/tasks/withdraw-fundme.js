const {task} = require("hardhat/config")

task("withdraw-fundme","withdraw all funds from FundMe contract")
  .addParam("addr", "fundme contract address")
  .setAction(async (taskArgs, hre) => {
    const fundMeFactory = await ethers.getContractFactory("FundMe");
    const fundMe = fundMeFactory.attach(taskArgs.addr);

    const [owner] = await ethers.getSigners();

    const tx = await fundMe.connect(owner).getFund();
    await tx.wait();

    console.log(`✅ Fund withdrawn to ${owner.address}`);
  });


module.exports={}
