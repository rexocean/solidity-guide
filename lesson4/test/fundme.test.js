const {ethers, deployments, getNamedAccounts} = require("hardhat")
const {assert} = require("chai")

describe("test fundme contract", async function () {

    let fundMe
    let firstAccount

    this.beforeEach(async function() {
        await deployments.fixture("all")
        firstAccount = (await getNamedAccounts()).firstAccount
        const fundMeDepolyment = await deployments.get("FundMe")
        // getContractAt contractName, contractAddr, ...
        fundMe = await ethers.getContractAt("FundMe", fundMeDepolyment.address)
    })
     
    it("test if the owner is msg.sender", async function () {
        // const [firstAccount] = await ethers.getSigners()
        // const fundMeFactory = await ethers.getContractFactory("FundMe")
        // const fundMe = await fundMeFactory.deploy(180)
        await fundMe.waitForDeployment()
        console.log("owner is {}", await fundMe.owner())
        console.log("firstAccount address is {}", firstAccount)
        // console.log("firstAccount address is {}", firstAccount.address )
        assert.equal((await fundMe.owner()), firstAccount)
    })
 

    it("test if the owner is msg.sender", async function () {
        // const fundMeFactory = await ethers.getContractFactory("FundMe")
        // const fundMe = await fundMeFactory.deploy(180)
        await fundMe.waitForDeployment()
        assert.equal((await fundMe.dataFeed()), "0x694AA1769357215DE4FAC081bf1f309aDC325306")
    })
})