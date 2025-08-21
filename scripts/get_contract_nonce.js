// scripts/get_contract_nonce.js
async function main() {
  const contractAddress = "0x7eE4c635d204eBE65fc8987CE6570CFA1651E8Af"; // Replace with your deployed contract address
  const One2ManyTransfer = await ethers.getContractFactory("One2ManyTransfer");
  const one2ManyTransfer = One2ManyTransfer.attach(contractAddress);

  const nonce = await one2ManyTransfer.get_nonce();
  console.log(`Nonce for the contract at ${contractAddress}: ${nonce}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });