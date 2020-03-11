const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLNonNull } = require("graphql");
const axios = require("axios");

// customer type
const CustomerType = new GraphQLObjectType({
  name: "Customer",
  fields: () => ({
    id: { type: GraphQLString },
    age: { type: GraphQLInt },
    name: { type: GraphQLString },
    email: { type: GraphQLString }
  })
});

// root query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    customer: {
      type: CustomerType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return axios.get("http://localhost:3000/customers/" + args.id).then(res => res.data);
        // for (let i = 0; i < customers.length; i++) {
        //   if (customers[i].id == args.id) {
        //     return customers[i];
        //   }
        // }
      }
    },
    customers: {
      type: new GraphQLList(CustomerType),
      resolve(parentValue, args) {
        return axios.get("http://localhost:3000/customers/").then(res => res.data);
        // return customers;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
