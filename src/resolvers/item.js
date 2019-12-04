const jwt = require('jsonwebtoken');
const combineResolvers = require('graphql-resolvers').combineResolvers;
const { AuthenticationError, UserInputError } = require('apollo-server');
const isAdmin = require('./authorization').isAdmin;

module.exports = {
    Query: {
      items: async (_, __, { models}) => {
        return await models.Item.findAll();
      },
    },
    
}
