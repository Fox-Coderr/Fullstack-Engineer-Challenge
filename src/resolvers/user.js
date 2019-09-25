let jwt = require('jsonwebtoken');
let combineResolvers = require('graphql-resolvers').combineResolvers;
let apollo = require('apollo-server');
let AuthenticationError = apollo.AuthenticationError;
let UserInputError = apollo.UserInputError;
let isAdmin = require('./authorization').isAdmin;

const createToken = async (user, secret, expiresIn) => {
  const { id, email, username, role } = user;
  return await jwt.sign({ id, email, username, role }, secret, {
    expiresIn,
  });
};

module.exports = {
    Query: {
      me: async (parent, args, { models, me }) => {
        if (!me) {
          return null;
        }
        return await models.models.User.findByPk(me.id);
      },
    },

    Mutation: {
      signUp: async (
        parent,
        { username, email, password },
        { models, secret }
      ) => {
        const user = await models.models.User.create({
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
        const user = await models.models.User.findByLogin(login);
  
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
          return await models.models.User.destroy({
            where: { id },
          });
        },
      ),
  
    },
    
}