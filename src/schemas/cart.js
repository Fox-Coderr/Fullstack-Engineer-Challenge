const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    cart: Cart!    
    carts(
      soldAt:String!
    ): [Cart!] 
  }

  extend type Mutation {
    addItem(
      itemId:ID!
      quantity:Int!
    ): Boolean!
  }

  type Cart {
    id: ID!
    soldAt: String  
    user: User!
    items: [ItemInCart!]
  }

`;
