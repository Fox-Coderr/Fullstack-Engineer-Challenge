var apollo = require('apollo-server-express');

module.exports = apollo.gql`
  extend type Query {
    itemsInCart: [ItemInCart!]
    itemInCart(id: ID!): ItemInCart
  }

  type ItemInCart {
    id: ID!
    name: String!  
    image: String!
    price: Float!
    quantity: Int!
    cart: [Cart!]
  }
`;