require('dotenv').config()
const express = require('express');
const http = require('http')
let apollo = require('apollo-server-express')
let cors = require('cors')
let jwt = require('jsonwebtoken')
let ApolloServer = apollo.ApolloServer
let AuthenticationError = apollo.AuthenticationError
let DataLoader = require('dataloader')

let schema = require('./schemas/index')
let resolvers = require('./resolvers/index')
let models = require('./models/index')

const app = express();
const httpServer = http.createServer(app);

const getMe = async req => {
  const token = req.headers['x-token'];
  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET);
    } catch (e) {
      throw new AuthenticationError(
        'Your session expired. Sign in again.',
      );
    }
  }
};

app.use(cors());

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    formatError: error => {
      // remove the internal sequelize error message
      // leave only the important validation error
      const message = error.message
        .replace('SequelizeValidationError: ', '')
        .replace('Validation error: ', '');
  
      return {
        ...error,
        message,
      };
    },

    context: async ({ req, connection }) => {
      if (connection) {
        return {
          models,
          loaders: {
            user: new DataLoader(keys =>
              loaders.user.batchUsers(keys, models),
            ),
          },
        };
      }
  
      if (req) {
        const me = await getMe(req);
        return {
          models,
          me,
          secret: process.env.SECRET,
          loaders: {
            user: new DataLoader(keys =>
              loaders.user.batchUsers(keys, models),
            ),
          },
        };
      }
    },

  });

server.applyMiddleware({ app, path: '/graphql' });

const eraseDatabaseOnSync = true;

models.sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
    if (eraseDatabaseOnSync) {
        createUsers();
    }
  
    httpServer.listen({ port: 8100 }, () => {
        console.log('Apollo Server on http://localhost:8100/graphql');
    });
});

const createUsers = async () => {
    await models.models.User.create(
      {
        username: 'teste1',
        email: 'teste1@email.com',
        password: '123123123',
      },
    );
  
    await models.models.User.create(
      {
        username: 'teste2',
        email: 'teste2@email.com',
        password: '123123123',
      },
    );
  };
  