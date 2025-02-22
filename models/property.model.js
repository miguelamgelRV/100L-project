const { DataTypes } = require("sequelize");
const database = require("../config/db");

class Property {
  constructor() {
    this.model = database.sequelize.define("properties", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      number: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      postal_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      longitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      availability: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total_bricks: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  }

  async getAllProperties() {
    try {
      const properties = await this.model.findAll();
      return properties.length === 0
        ? { status: true, datos: [], message: "Sin datos por mostrar." }
        : {
            status: true,
            datos: properties,
            message: "Datos obtenidos con éxito.",
          };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createProperty(data) {
    try {
      const property = await this.model.create(data);
      return {
        status: true,
        datos: property,
        message: "Registrado correctamente.",
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  
}

const propertyInterface = new Property();
module.exports = propertyInterface;
