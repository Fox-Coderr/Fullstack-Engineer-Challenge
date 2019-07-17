var Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres',
  },
);

const models = {
    User: sequelize.import('./user'),
    Cart: sequelize.import('./cart'),
    Item_in_cart: sequelize.import('./item_in_cart'),
    Item: sequelize.import('./item'),    
  };

module.exports = {sequelize, models}