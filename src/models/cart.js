module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('cart', {
      sold_at: {
        type: DataTypes.DATE,
      },
    });

    Cart.associate = models => {
        Cart.belongsTo(models.User);
    };

    Cart.associate = models => {
        Cart.hasMany(models.Item_in_cart, { onDelete: 'CASCADE' });
    };
  
    return Cart;
  };
