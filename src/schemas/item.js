var apollo = require('apollo-server-express');

module.exports = apollo.gql`
  extend type Query {
    items: [Item!]
    item(id: ID!): Item
  }

  type Item {
    id: ID!
    name: String!  
    image: String!
    price: Float!
    stock: Int!
  }

`;