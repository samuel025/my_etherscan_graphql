const { ApolloServer } = require("apollo-server"); // Creates an ApolloServer instance with the GraphQL schema and resolvers.
const { importSchema } = require("graphql-import"); // Imports the schema from the schema.graphql file using graphql-import. 
const EtherDataSource = require("./datasource/ethDatasource"); // Creates a data source instance to retrieve data from the Ethereum network.
const typeDefs = importSchema("./schema.graphql");// Exports the server to be used by the app.

require("dotenv").config();

// Resolvers map for GraphQL schema. Defines resolver functions for each field in the Query type.
// Uses the ethDataSource data source instance to retrieve data from the Ethereum network.
const resolvers = {
  Query: {
    etherBalanceByAddress: (root, _args, { dataSources }) => // Returns the balance of the Ethereum address.
      dataSources.ethDataSource.etherBalanceByAddress(),

    totalSupplyOfEther: (root, _args, { dataSources }) => // Returns the total supply of the Ethereum token.
      dataSources.ethDataSource.totalSupplyOfEther(),

    latestEthereumPrice: (root, _args, { dataSources }) => // Returns the latest price of Ethereum.
      dataSources.ethDataSource.getLatestEthereumPrice(),

    blockConfirmationTime: (root, _args, { dataSources }) => // Returns the block confirmation time of Ethereum.
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

// Creates an ApolloServer instance with the GraphQL schema and resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({ // Creates a data source instance to retrieve data from the Ethereum network.
    ethDataSource: new EtherDataSource(),
  }),
});


// Sets the server timeout to 0 to disable timeouts. 
server.timeout = 0;
server.listen("9000").then(({ url }) => { // Starts the GraphQL server on port 9000 and logs a message with the server URL when ready.
  console.log(`🚀 Server ready at ${url}`);
});
