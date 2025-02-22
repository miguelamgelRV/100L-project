const { DataTypes } = require("sequelize");
const database = require("../config/db");

class User {
  constructor() {
    this.model = database.sequelize.define("users", {
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

  async createUser(data) {
    try {
      const user = await this.model.create(data);
      return {
        status: true,
        datos: user,
        message: "Registrado correctamente.",
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

}

module.exports = new User();
