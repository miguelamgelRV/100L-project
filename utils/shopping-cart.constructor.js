const { DataTypes } = require("sequelize");
const database = require("../config/db");
const BricksInCart = require("../utils/bricks-in-cart.constructor");

const ShoppingCart = database.sequelize.define("shopping-carts", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
  },
  dateAdded: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: new Date(),
  },
});

ShoppingCart.hasMany(BricksInCart, {
  as: "bricks-in-carts",
  foreignKey: "shoppingCartId",
});

BricksInCart.belongsTo(ShoppingCart, {
  as: "shopping-carts",
  foreignKey: "shoppingCartId",
});


module.exports = ShoppingCart;
