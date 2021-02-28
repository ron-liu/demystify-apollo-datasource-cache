const { ApolloServer, gql } = require("apollo-server");
const { RESTDataSource } = require("apollo-datasource-rest");

const typeDefs = gql`
  type Pet {
    name: String
    species: String
  }

  type Query {
    pets(query: String!): [Pet]
  }
`;

class PetsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:3000/";
  }
  async queryPets(query) {
    return this.get(`pets/?query=${query}`);
  }

  async getPetById(id) {
    return this.get(`pet/${id}`);
  }
}

const resolvers = {
  Query: {
    pets: async (_source, { query }, { dataSources }) =>
      dataSources.petsAPI.queryPets(query),
  },
  Pet: {
    name: async (id, _args, { dataSources }) => {
      const pet = await dataSources.petsAPI.getPetById(id);
      return pet.name;
    },
    species: async (id, _args, { dataSources }) => {
      const pet = await dataSources.petsAPI.getPetById(id);
      return pet.species;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      petsAPI: new PetsAPI(),
    };
  },
});

server.listen(4000).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
