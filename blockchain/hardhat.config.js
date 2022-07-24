require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    matic: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [
        "0678c85b937711d5a2640863fee5dbd373df6ce70721a022929640a9f54c30ae",
        "cbeee4be11b543da24822cabaf4fea51d1ef22e32aac15ee93cff77c2d27301e",
        "95a471f00b9f34de9af24d0aefecec53d4bca78c499f607ee1f5ecba6d0abfcf",
      ],
    },
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY,
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
