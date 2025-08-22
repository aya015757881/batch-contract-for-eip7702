
async function main() {
  const TransferContract = await ethers.getContractFactory("TransferContract");
  const transferContract = await TransferContract.deploy();
  await transferContract.waitForDeployment();

  console.log("TransferContract deployed to:", transferContract.target);

  const BatchContract = await ethers.getContractFactory("BatchContract");
  const batchContract = await BatchContract.deploy();
  await batchContract.waitForDeployment();

  console.log("BatchContract deployed to:", batchContract.target);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
