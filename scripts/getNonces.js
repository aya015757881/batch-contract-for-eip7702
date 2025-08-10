// scripts/getNonces.js
async function main() {
  const addresses = [
    "0x7eE4c635d204eBE65fc8987CE6570CFA1651E8Af", // Delegate
    "0x424Ef693c6F2648983aEc92f35a1143ba9Dd076C", // From1
    "0x6f5ce2e6F2C8D2a6f91FbDeAc835074363c24a6E", // From2
  ];

  for (const address of addresses) {
    const nonce = await ethers.provider.getTransactionCount(address);
    console.log(`Nonce for ${address}: ${nonce}`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });