
const ethers = require('ethers');

async function main() {
  const txHash = '0x33075e3e0b255bb4be6ac9731981b11febf9a53d66e47265ea6efbca387ca2a0';
  const contractAddress = '0xBed74Ed65aE59eEa3339Daa215ea1d3B162F4E8B';
  const abi = require('/home/aya/Projects/batch_transfer/artifacts/contracts/batch_transfer.sol/BatchCallAndSponsor.json').abi;

  const provider = new ethers.JsonRpcProvider('https://rpc.sepolia.org');
  const contract = new ethers.Contract(contractAddress, abi, provider);

  const txReceipt = await provider.getTransactionReceipt(txHash);

  if (!txReceipt) {
    console.log("Transaction receipt not found.");
    return;
  }

  for (const log of txReceipt.logs) {
    try {
      const parsedLog = contract.interface.parseLog(log);
      if (parsedLog) {
        console.log('Event:', parsedLog.name);
        console.log('Data:', parsedLog.args.toString());
        console.log('---');
      }
    } catch (error) {
      // Ignore logs that don't match the contract's ABI
    }
  }
}

main().catch(console.error);
