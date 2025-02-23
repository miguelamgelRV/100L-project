const { DataTypes } = require("sequelize");
const database = require("../config/db");

const BricksInCart = database.sequelize.define("bricks-in-carts", {
  shoppingCartId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "shopping-carts",
      key: "id",
    },
  },
  brickId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "bricks",
      key: "id",
    },
  },
});


module.exports = BricksInCart;
