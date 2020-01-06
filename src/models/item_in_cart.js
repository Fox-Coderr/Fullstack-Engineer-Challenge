module.exports = (sequelize, DataTypes) => {
    const ItemInCart = sequelize.define('itemInCart', {
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
  
    return ItemInCart;
  };
