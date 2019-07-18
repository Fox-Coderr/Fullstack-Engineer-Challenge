var apollo = require('apollo-server-express');
var userSchema = require('./user');
var itemSchema = require('./item');
var itemInCartSchema = require('./item_in_cart');
var cartSchema = require('./cart');

const linkSchema = apollo.gql`

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

module.exports = [
  linkSchema, 
  userSchema,
  itemSchema,
  itemInCartSchema,
  cartSchema 
]
