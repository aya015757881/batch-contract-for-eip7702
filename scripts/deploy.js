const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance));

  const batchCallAndSponsor = await ethers.deployContract("BatchCallAndSponsor");

  await batchCallAndSponsor.waitForDeployment();

  console.log("BatchCallAndSponsor deployed to:", batchCallAndSponsor.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});