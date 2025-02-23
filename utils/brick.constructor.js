const { DataTypes } = require("sequelize");
const database = require("../config/db");
const BricksInCart = require("../utils/bricks-in-cart.constructor");


const Brick = database.sequelize.define("bricks", {
  propertyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "properties",
      key: "id",
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "users",
      key: "id",
    },
  },
  cost: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  buyed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
});

Brick.hasMany(BricksInCart, {
  as: "bricks-in-carts",
  foreignKey: "brickId",
});

BricksInCart.belongsTo(Brick, {
  as: "bricks",
  foreignKey: "brickId",
});


module.exports = Brick;
