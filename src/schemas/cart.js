var apollo = require('apollo-server-express');

module.exports = apollo.gql`
  extend type Query {
    carts: [Cart!]
    cart(id: ID!): Cart
  }

  type Cart {
    id: ID!
    sold_at: String!  
  }

`;