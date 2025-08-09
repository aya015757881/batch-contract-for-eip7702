
async function main() {
  const BatchCallAndSponsor = await ethers.getContractFactory("BatchCallAndSponsor");
  const batchCallAndSponsor = await BatchCallAndSponsor.deploy();
  await batchCallAndSponsor.waitForDeployment();

  console.log("BatchCallAndSponsor deployed to:", batchCallAndSponsor.target);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
