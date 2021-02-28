const { ApolloServer, gql } = require("apollo-server");
const { RESTDataSource } = require("apollo-datasource-rest");
const fetch = require("node-fetch");

const typeDefs = gql`
  type Pet {
    name: String
    species: String
  }

  type Query {
    pets(query: String!): [Pet]
  }
`;

const resolvers = {
  Query: {
    pets: async (_source, { query }, { dataSources }) =>
      fetch(`http://localhost:3000/pets?query=${query}`).then((x) => x.json()),
  },
  Pet: {
    name: async (id, _args, { dataSources }) => {
      const pet = await fetch(`http://localhost:3000/pet/${id}`).then((x) =>
        x.json()
      );
      return pet.name;
    },
    species: async (id, _args, { dataSources }) => {
      const pet = await fetch(`http://localhost:3000/pet/${id}`).then((x) =>
        x.json()
      );
      return pet.species;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(4000).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
