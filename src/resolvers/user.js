const jwt = require('jsonwebtoken');
const combineResolvers = require('graphql-resolvers').combineResolvers;
const { AuthenticationError, UserInputError } = require('apollo-server');
const isAdmin = require('./authorization').isAdmin;

const createToken = async (user, secret, expiresIn) => {
  const { id, email, username, role } = user;
  return await jwt.sign({ id, email, username, role }, secret, {
    expiresIn,
  });
};

module.exports = {
    Query: {
      me: async (_, __, { models, me }) => {
        if (!me) {
          return null;
        }
        return await models.User.findByPk(me.id);
      },
    },

    Mutation: {
      signUp: async (
        parent,
        { username, email, password },
        { models, secret }
      ) => {
        const user = await models.User.create({
          username,
          email,
          password,
        });
  
        return { token: createToken(user, secret, '30m') };
      },
      
      signIn: async (
        parent,
        { login, password },
        { models, secret },
      ) => {
        const user = await models.User.findByLogin(login);
  
        if (!user) {
          throw new UserInputError(
            'No user found with this login credentials.',
          );
        }
  
        const isValid = await user.validatePassword(password);
  
        if (!isValid) {
          throw new AuthenticationError('Invalid password.');
        }
  
        return { token: createToken(user, secret, '30m') };
      },

      deleteUser: combineResolvers(
        isAdmin,
        async (parent, { id }, { models }) => {
          return await models.User.destroy({
            where: { id },
          });
        },
      ),
  
    },
    
}
