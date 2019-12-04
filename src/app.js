require('dotenv').config()
const express = require('express');
const http = require('http')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const { AuthenticationError, ApolloServer } = require('apollo-server-express');
const path = require('path');
const DataLoader = require('dataloader')

const schema = require('./schemas/index')
const resolvers = require('./resolvers/index')
const {models, sequelize} = require('./models/index')

const app = express();
app.use(cors())

app.get('/images/:file(*)',(req, res) => {
  var file = req.params.file;
  var fileLocation = path.join('./images',file);
  console.log(fileLocation);
  res.download(fileLocation, file); 
});

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

//Erasing the database on start for better test purposes.
sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
    if (eraseDatabaseOnSync) {
        createUsers();
        createItems();
    }
  
    httpServer.listen({ port: 8101 }, () => {
        console.log('Apollo Server on http://localhost:8100/graphql');
    });
});

const createUsers = async () => {
  await models.User.create(
    {
      username: 'user1',
      email: 'user1@email.com',
      password: '123123123',
    },
  );

  await models.User.create(
    {
      username: 'user2',
      email: 'user2@email.com',
      password: '123123123',
    },
  );
};


const createItems = async () => {
  await models.Item.create(
    {
      name: 'item1' , 
      image: '250x250.png',
      price: 10,
      stock: 10
    },
  );

  await models.Item.create(
    {
      name: 'item2' , 
      image: '250x250.png',
      price: 20,
      stock: 20
    },
  );

  await models.Item.create(
    {
      name: 'item3' , 
      image: '250x250.png',
      price: 30,
      stock: 30
    },
  );

  await models.Item.create(
    {
      name: 'item4' , 
      image: '250x250.png',
      price: 40,
      stock: 40
    },
  );

  await models.Item.create(
    {
      name: 'item5' , 
      image: '250x250.png',
      price: 50,
      stock: 50
    },
  );

  await models.Item.create(
    {
      name: 'item6' , 
      image: '250x250.png',
      price: 60,
      stock: 60
    },
  );

  await models.Item.create(
    {
      name: 'item7' , 
      image: '250x250.png',
      price: 70,
      stock: 70
    },
  );

  await models.Item.create(
    {
      name: 'item8' , 
      image: '250x250.png',
      price: 80,
      stock: 80
    },
  );

};