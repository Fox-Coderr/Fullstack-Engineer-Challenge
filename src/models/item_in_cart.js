const item_in_cart = (sequelize, DataTypes) => {
    const Item_in_cart = sequelize.define('item_in_cart', {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      image: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      price: {
        type: DataTypes.FLOAT,
        validate: {
          notEmpty: true,
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: true,
        },
      },
    });

    Item_in_cart.associate = models => {
        Item_in_cart.belongsTo(models.Cart);
    };
  
    return Item_in_cart;
  };
  
  module.exports = item_in_cart