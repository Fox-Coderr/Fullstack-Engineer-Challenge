const userResolvers = require('./user');
const itemResolvers = require('./item');
const cartResolvers = require('./cart');

module.exports = [userResolvers, itemResolvers,cartResolvers];
