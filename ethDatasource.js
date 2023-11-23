/**
 * Imports the RESTDataSource class from the apollo-datasource-rest package. 
 * This will be extended to create a custom data source for making calls to 
 * the Etherscan API.
*/
const { RESTDataSource } = require("apollo-datasource-rest");

//Vitalik's Ethereum Address
const eth_address = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";

//Etherscan Data Source Class
class EtherDataSource extends RESTDataSource {
  // Set the base URL for making API requests to Etherscan
  constructor() {
    super();
    this.baseURL = "https://api.etherscan.io/api"; // Etherscan API endpoint
  }

  async etherBalanceByAddress() { // Get ether balance by address
    return this.get(
      `?module=account&action=balance&address=${eth_address}&tag=latest&apikey=${process.env.ETHERSCAN_API}`
    );
  }

  async totalSupplyOfEther() { // Get total supply of ether
    return this.get(
      `?module=stats&action=ethsupply&apikey=${process.env.ETHERSCAN_API}`
    );
  }

  //Paste Code Here For New API Endpoints
  async getLatestEthereumPrice() { // Get latest ethereum price
    return this.get(
      `?module=stats&action=ethprice&apikey=${process.env.ETHERSCAN_API}`
    );
  }

  async getBlockConfirmationTime() { // Get block confirmation time estimate
    return this.get(
      `?module=gastracker&action=gasestimate&gasprice=2000000000&apikey=${process.env.ETHERSCAN_API}`
    );
  }
}

module.exports = EtherDataSource;
