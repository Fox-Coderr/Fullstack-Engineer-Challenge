const { gql } = require('apollo-server-express');
let userSchema = require('./user');
let itemSchema = require('./item');
let itemInCartSchema = require('./item_in_cart');
let cartSchema = require('./cart');

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
