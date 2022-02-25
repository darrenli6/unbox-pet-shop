
const HDWalletProvider = require('@truffle/hdwallet-provider');
//
const fs = require('fs');
// 助记词
const mnemonic = fs.readFileSync(".secret").toString().trim();


module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    develop: {
      port: 8545
    },

    goerli: {
      provider: () => new HDWalletProvider(mnemonic, `https://goerli.infura.io/v3/18c8ae876f7f46e881287af88b7bee80`),
      network_id: 5,       // Ropsten's id
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
      },


  },
  compilers: {
    solc: {
        version: "0.4.25", // A version or constraint - Ex. "^0.5.0"
        // Can also be set to "native" to use a native solc
        parser: "solcjs", // Leverages solc-js purely for speedy parsing
    }
}
 
  

};
