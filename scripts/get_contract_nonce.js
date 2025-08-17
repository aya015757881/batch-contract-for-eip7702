// scripts/get_contract_nonce.js
async function main() {
  const contractAddress = "0x6f5ce2e6F2C8D2a6f91FbDeAc835074363c24a6E"; // Replace with your deployed contract address
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