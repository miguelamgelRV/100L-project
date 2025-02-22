const { DataTypes } = require("sequelize");
const database = require("../config/db");

class Brick {
  constructor() {
    this.model = database.sequelize.define("bricks", {
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
  }

  async getAllBricks(id) {
    try {
      const bricks = await this.model.findAll({
        where: {
          propertyId: id,
        },
      });
      return bricks.length === 0
        ? { status: true, datos: [], message: "Sin datos por mostrar." }
        : {
            status: true,
            datos: bricks,
            message: "Datos obtenidos con éxito.",
          };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createBrick(data) {
    try {
      const brick = await this.model.create(data);
      return {
        status: true,
        datos: brick,
        message: "Registrado correctamente.",
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

const brickInterface = new Brick();
module.exports = brickInterface;
