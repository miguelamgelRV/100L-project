const BrickConstructor = require("../utils/brick.constructor");
const UserModel = require("../models/user.model");
// const ShoppingCartModel = require("../models/shopping-cart.model");
const BrickInCartModel = require("../models/brick-in-cart.model");

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

  async getBricksBuyedByUser(userId) {
    try {
      if (await UserModel.userExists(userId)) {
        const bricks = await BrickConstructor.findAll({
          where: {
            buyed: true,
            userId: userId,
          },
        });
        return bricks?.length === 0
          ? { status: false, datos: {}, message: "Sin datos por mostrar." }
          : {
              status: true,
              datos: bricks,
              message: "Datos obtenidos con éxito.",
            };
      } else {
        return {
          status: false,
          datos: {},
          message: "Ocurrió un error. El usuario ingresado no existe.",
        };
      }
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

  async buyBrick(data) {
    try {
      const { userId, brickId } = data;
      if (await UserModel.userExists(userId)) {
        if (await this.brickExists(brickId)) {
          if (!(await this.isBrickFree(brickId))) {
            const [rowsUpdated] = await BrickConstructor.update(
              { buyed: true, userId: userId },
              {
                where: {
                  id: brickId,
                },
              }
            );
            if (rowsUpdated > 0) {
              const isRemovedFromCart = await BrickInCartModel.removeBuyedBrickFromUserCart(userId, brickId);

              console.log("isRemovedFromCart",isRemovedFromCart)
              
              return {
                status: true,
                datos: rowsUpdated,
                message: `Ladrillo comprado correctamente correctamente. ${isRemovedFromCart ? 'Se removió de carrito.' : ''}`,
              };
            } else {
              return {
                status: false,
                datos: rowsUpdated,
                message: "Ocurrió un error.",
              };
            }
          } else {
            return {
              status: false,
              datos: 0,
              message: "El ladrillo ya fue comprado por otro cliente.",
            };
          }
        } else {
          return {
            status: false,
            datos: 0,
            message: "El ladrillo ingresado no existe.",
          };
        }
      } else {
        return {
          status: false,
          datos: 0,
          message: "El usuario ingresado no existe.",
        };
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async brickExists(brickId) {
    try {
      const brick = await BrickConstructor.findOne({ where: { id: brickId } });
      return brick?.id;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async isBrickFree(brickId) {
    try {
      const brick = await BrickConstructor.findOne({ where: { id: brickId } });
      return brick.buyed;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  
}

module.exports = new Brick();
