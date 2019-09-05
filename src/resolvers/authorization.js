var ForbiddenError = require('apollo-server');
var graphqlResolvers = require('graphql-resolvers');
var skip = graphqlResolvers.skip
var combineResolvers = graphqlResolvers.combineResolvers

const isAuthenticated = (parent, args, { me }) =>
  me ? skip : new ForbiddenError('Not authenticated as user.');


const isAdmin = combineResolvers(
  isAuthenticated,
  (parent, args, { me: { role } }) =>
    role === 'ADMIN'
      ? skip
      : new ForbiddenError('Not authorized as admin.'),
);

module.exports = {isAuthenticated, isAdmin}