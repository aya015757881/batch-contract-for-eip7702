// scripts/getNonces.js
async function main() {
  const addresses = [
    "0xBed74Ed65aE59eEa3339Daa215ea1d3B162F4E8B", // Delegate
    "0x6f5ce2e6F2C8D2a6f91FbDeAc835074363c24a6E", // From1
    "0x424Ef693c6F2648983aEc92f35a1143ba9Dd076C", // From2
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