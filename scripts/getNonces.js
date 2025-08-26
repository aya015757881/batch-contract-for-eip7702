// scripts/getNonces.js
async function main() {
  const addresses = [
    "0x7eE4c635d204eBE65fc8987CE6570CFA1651E8Af", // Delegate
    "0x424Ef693c6F2648983aEc92f35a1143ba9Dd076C", // From1
    "0x6f5ce2e6F2C8D2a6f91FbDeAc835074363c24a6E", // From2
    "0xBed74Ed65aE59eEa3339Daa215ea1d3B162F4E8B",
    "0x3c41f0ECF6Fe8d544A4632525f00F1471C8E6018", // alex delegate
    "0x79854722abfb5EEE2D0C473535C6861F136bA524", // alex from
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