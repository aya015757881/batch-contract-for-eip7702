require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/fzqj0m1aH-1aBAvLUoEVsdS0rf0qDpmo",
      accounts: ["0x08d586ed207046d6476f92fd4852be3830a9d651fc148d6fa5a6f15b77ba5df0"]
    }
  }
};