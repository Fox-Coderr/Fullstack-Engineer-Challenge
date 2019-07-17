require('dotenv').config()
var express = require('express');
var http = require('http')

var models = require('./models/index')

const app = express();
const httpServer = http.createServer(app);

models.sequelize.sync().then(async () => {
  
    httpServer.listen({ port: 8100 }, () => {
        console.log('Apollo Server on http://localhost:8100/graphql');
    });
});
