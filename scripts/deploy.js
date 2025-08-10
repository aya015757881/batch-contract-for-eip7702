
async function main() {
  const One2ManyTransfer = await ethers.getContractFactory("One2ManyTransfer");
  const one2ManyTransfer = await One2ManyTransfer.deploy();
  await one2ManyTransfer.waitForDeployment();

  console.log("One2ManyTransfer deployed to:", one2ManyTransfer.target);

  const Scheduler = await ethers.getContractFactory("Scheduler");
  const scheduler = await Scheduler.deploy();
  await scheduler.waitForDeployment();

  console.log("Scheduler deployed to:", scheduler.target);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
