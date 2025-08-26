// scripts/getContractNonces.js
async function main() {
  const addresses = [
    "0x7eE4c635d204eBE65fc8987CE6570CFA1651E8Af",
    "0x424Ef693c6F2648983aEc92f35a1143ba9Dd076C",
    "0x6f5ce2e6F2C8D2a6f91FbDeAc835074363c24a6E",
    "0xBed74Ed65aE59eEa3339Daa215ea1d3B162F4E8B",
  ];

  const contractABI = require("../artifacts/contracts/transfer.sol/TransferContract.json").abi;

  for (const address of addresses) {
    const contract = await ethers.getContractAt(contractABI, address);
    const nonce = await contract.get_nonce();
    console.log(`Nonce for ${address}: ${nonce}`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });