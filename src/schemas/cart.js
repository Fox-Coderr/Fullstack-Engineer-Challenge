const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    carts: [Cart!]
    cart(id: ID!): Cart
  }

  type Cart {
    id: ID!
    soldAt: String!  
  }

`;
