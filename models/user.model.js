const { DataTypes } = require("sequelize");
const database = require("../config/db");

class User {
  constructor() {
    this.model = database.sequelize.define("bricks", {
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
  }
}

module.exports = new User();
