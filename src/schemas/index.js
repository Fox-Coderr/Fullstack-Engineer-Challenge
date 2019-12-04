const { gql } = require('apollo-server-express');
const userSchema = require('./user');
const itemSchema = require('./item');
const itemInCartSchema = require('./item_in_cart');
const cartSchema = require('./cart');

const linkSchema = gql`

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
