
require("@nomicfoundation/hardhat-toolbox");

// The next line is part of the sample project, you don't need it in your
// project. It imports a Hardhat task definition, allowing you to get
// information about the project's accounts.
// require("./tasks/accounts");

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/fzqj0m1aH-1aBAvLUoEVsdS0rf0qDpmo",
      accounts: ["08d586ed207046d6476f92fd4852be3830a9d651fc148d6fa5a6f15b77ba5df0"]
    }
  }
};
