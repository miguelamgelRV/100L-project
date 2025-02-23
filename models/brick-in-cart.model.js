const BricksInCartConstructor = require("../utils/bricks-in-cart.constructor");

class BricksInCart {
  async addBrickInCart(data) {
    try {
      const user = await BricksInCartConstructor.create(data);
      return {
        status: true,
        datos: user,
        message: "Registrado correctamente.",
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteBrickInCart(id) {
    try {
      const rowsAffected = await BricksInCartConstructor.destroy({
        where: {
            id: id
        }
      });
      return rowsAffected > 0 ? true : false;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getShoppingCartById(id) {
    try {
      const shoppingCart = await BricksInCartConstructor.findAll({
        where: {
          shoppingCartId: id,
        },
      });
      return shoppingCart.length === 0 ? [] : shoppingCart;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new BricksInCart();
