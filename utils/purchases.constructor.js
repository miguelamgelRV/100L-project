const { DataTypes } = require("sequelize");
const database = require("../config/db");

const Purchase = database.sequelize.define("purchases", {
  brickId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "bricks",
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
  isTersAccepted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  isBrickPurchased: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
});


module.exports = Purchase;
