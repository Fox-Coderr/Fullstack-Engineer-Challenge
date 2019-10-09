const ForbiddenError = require('apollo-server');
const { skip, combineResolvers } = require('graphql-resolvers');

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
