const BrickConstructor = require("../utils/brick.constructor");
const PropertyConstructor = require("../utils/property.constructor");

class Property {
  async getAllProperties() {
    try {
      const properties = await PropertyConstructor.findAll({
        include: [
          {
            model: BrickConstructor,
            as: "bricks",
          },
        ],
      });
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
      const property = await PropertyConstructor.create(data);
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

module.exports = new Property();
