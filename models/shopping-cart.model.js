const { DataTypes } = require("sequelize");
const database = require("../config/db");

class ShoppingCart {
  constructor() {
    this.model = database.sequelize.define("bricks", {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      brickId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "bricks",
          key: "id",
        },
      },
      dateAdded: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date()
      }
    });
  }
}

module.exports = new ShoppingCart();
