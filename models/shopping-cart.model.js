const ShoppingCartConstructor = require("../utils/shopping-cart.constructor");
const BricksInCartConstructor = require("../utils/bricks-in-cart.constructor");
const BricksConstructor = require("../utils/brick.constructor");
const BrickModel = require("../models/brick.model");
const BrickInCartModel = require("../models/brick-in-cart.model");
const brickInCartModel = require("../models/brick-in-cart.model");

class ShoppingCart {
  async createShoppingCart(data) {
    try {
      const cart = await ShoppingCartConstructor.create(data);
      return {
        status: true,
        datos: cart,
        message: "Registrado correctamente.",
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getShoppingCartByUser(userId) {
    try {
      const shoppingCart = await ShoppingCartConstructor.findAll({
        include: [
          {
            model: BricksInCartConstructor,
            as: "bricks-in-carts",
            include: [
              {
                model: BricksConstructor,
                as: "bricks",
                attributes: ["id", "cost", "buyed"],
              },
            ],
          },
        ],
        where: {
          userId: userId,
        },
      });
      return shoppingCart.length === 0
        ? { status: true, datos: [], message: "Sin datos por mostrar." }
        : {
            status: true,
            datos: shoppingCart,
            message: "Datos obtenidos con éxito.",
          };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async addBrickToShoppingCart(brickId, shoppingCartId) {
    try {
      const brick = await BrickModel.getBrickById(brickId);

      if (brick.status) {
        if (!brick.datos.buyed) {
          if (!(await this.isBrickInCurrentCart(brickId, shoppingCartId))) {
            const transaction = await BrickInCartModel.addBrickInCart({
              shoppingCartId,
              brickId,
            });
            return transaction;
          } else {
            return {
              status: false,
              datos: {},
              message:
                "No se puede registrar el ladrillo porque ya está en este carrito.",
            };
          }
        } else {
          return {
            status: false,
            datos: {},
            message:
              "No se puede registrar el ladrillo porque ya fue comprado.",
          };
        }
      } else {
        return {
          status: false,
          datos: {},
          message: "No se puede registrar el ladrillo porque no existe.",
        };
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteBrickToShoppingCart(idBrickInCart) {
    try {
      const element = await BricksInCartConstructor.findOne({
        where: { id: idBrickInCart },
      });

      console.log("idBrickInCart",idBrickInCart)

      if(element?.id){
        const transaction = BrickInCartModel.deleteBrickInCart(element.id);

        return transaction ? {
          status: true,
          datos: 0,
          message: "Removido correctamente.",
        } : {
          status: false,
          datos: 0,
          message: "No sé pudo eliminar el registro, intenta más tarde.",
        }
      } else {
        return {
          status: false,
          datos: 0,
          message: "No sé pudo eliminar el registro, ya que no se encontro coincidencia de ID.",
        }
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async isBrickInCurrentCart(brickId, shoppingCartId) {
    const bricksInCart = await BrickInCartModel.getShoppingCartById(
      shoppingCartId
    );

    return bricksInCart.some((brick) => brick.brickId === brickId);
  }
}

module.exports = new ShoppingCart();
