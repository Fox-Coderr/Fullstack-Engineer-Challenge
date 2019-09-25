let ForbiddenError = require('apollo-server');
let graphqlResolvers = require('graphql-resolvers');
let skip = graphqlResolvers.skip
let combineResolvers = graphqlResolvers.combineResolvers

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