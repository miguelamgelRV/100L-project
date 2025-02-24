const { DataTypes } = require("sequelize");
const database = require("../config/db");
const Brick = require("../utils/brick.constructor");
const ShoppingCart = require("../utils/shopping-cart.constructor");
const Purchase = require("../utils/purchases.constructor");

const User = database.sequelize.define("users", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nickname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
});

User.hasMany(Brick, {
  as: "bricks",
  foreignKey: "userId",
});

Brick.belongsTo(User, {
  as: "user",
  foreignKey: "userId",
});

User.hasOne(ShoppingCart, {
    as: "shopping-carts",
    foreignKey: "userId",
  });
  
ShoppingCart.belongsTo(User, {
as: "user",
foreignKey: "userId",
});

User.hasMany(Purchase, {
  as: "purchases",
  foreignKey: "userId",
});

Purchase.belongsTo(User, {
  as: "user",
  foreignKey: "userId",
});

module.exports = User;
