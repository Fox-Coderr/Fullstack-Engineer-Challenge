module.exports = (sequelize, DataTypes) => {
    
    const Cart = sequelize.define('cart', {
      soldAt: {
        type: DataTypes.DATE,
      },
    });
    const User = sequelize.import('./user')
    const ItemInCart = sequelize.import('./item_in_cart')
    Cart.belongsTo(User);
    Cart.hasMany(ItemInCart, { onDelete: 'CASCADE' , as: 'items'});
  
    return Cart;
  };
