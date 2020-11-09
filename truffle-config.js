
const HDWalletProvider = require("truffle-hdwallet-provider");

const {projectId, privateKeys} = require('./secrets_me.json');
module.exports = {
  // Uncommenting the defaults below 
  // provides for an easier quick-start with Ganache.
  // You can also follow this format for other networks;
  // see <http://truffleframework.com/docs/advanced/configuration>
  // for more details on how to specify configuration options!
  //
  networks: {
   dev: {
     provider: () => new HDWalletProvider(privateKeys, `http://127.0.0.1:8545`),
     network_id: "*"
   },
   // test: {
   //   host: "127.0.0.1",
   //   port: 8545,
   //   network_id: "*"
   // }
  },
  compilers: {
    solc: {
      version: "0.5.17",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    },
  }
  //
};
