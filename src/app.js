require('dotenv').config()
const express = require('express');
const http = require('http')
var ApolloServer = require('apollo-server-express').ApolloServer

var schema = require('./schemas/index')
var resolvers = require('./resolvers/index')
let models = require('./models/index')

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
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