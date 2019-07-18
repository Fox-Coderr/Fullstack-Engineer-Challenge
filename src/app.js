require('dotenv').config()
const express = require('express');
const http = require('http')

let models = require('./models/index')

const app = express();
const httpServer = http.createServer(app);

models.sequelize.sync().then(async () => {
  
    httpServer.listen({ port: 8100 }, () => {
        console.log('Apollo Server on http://localhost:8100/graphql');
    });
});
