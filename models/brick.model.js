const BrickConstructor = require("../utils/brick.constructor");

class Brick {
  async getAllBricks(id) {
    try {
      const bricks = await BrickConstructor.findAll({
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

  async getBrickById(brickId) {
    try {
      const brick = await BrickConstructor.findOne({
        where: {
          id: brickId,
        },
      });
      return !brick?.id
        ? { status: false, datos: {}, message: "Sin datos por mostrar." }
        : {
            status: true,
            datos: brick,
            message: "Datos obtenidos con éxito.",
          };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createBrick(data) {
    try {
      const brick = await BrickConstructor.create(data);
      return {
        status: true,
        datos: brick,
        message: "Registrado correctamente.",
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateIdCartInBrick(brickId, shoppingCartId) {
    try {
      const [rowsUpdated] = await BrickConstructor.update(
        { shoppingCartId: shoppingCartId },
        {
          where: {
            id: brickId,
          },
        }
      );
      return rowsUpdated > 0 ? {
        status: true,
        datos: rowsUpdated,
        message: "Registrado correctamente.",
      } : {
        status: false,
        datos: rowsUpdated,
        message: "Ocurrió un error.",
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new Brick();
