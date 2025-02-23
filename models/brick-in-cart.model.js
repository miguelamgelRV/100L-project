const BricksInCartConstructor = require("../utils/bricks-in-cart.constructor");
const ShoppingCartConstructor = require("../utils/shopping-cart.constructor");

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
          id: id,
        },
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

  async removeBuyedBrickFromUserCart(userId, brickId){
    try {
      const brickInCartId = await this.findIdByUserBrick(userId, brickId);

      console.log("userId, brickId", userId, brickId);
      console.log("brickInCartId",brickInCartId);

      if(brickInCartId > 0){
        return await this.deleteBrickInCart(brickInCartId);
      }

      return false;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findIdByUserBrick(userId, brickId) {
    try {
      const shoppingCartId = await this.findIdByUser(userId);

      console.log("findIdByUserBrick:shoppingCartId: ",shoppingCartId);

      if (typeof(shoppingCartId) === "number" && shoppingCartId > 0) {
        const shoppingCart = await BricksInCartConstructor.findOne({
          attributes: ["id"],
          where: {
            shoppingCartId: shoppingCartId,
            brickId: brickId,
          },
        });

        return shoppingCart?.id ? shoppingCart.id : 0;
      }

      return 0;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  
  async findIdByUser(userId) {
    try {
      const shoppingCart = await ShoppingCartConstructor.findOne({
        attributes: ["id"],
        where: {
          userId: userId,
        },
      });
      console.log("findIdByUser:shoppingCart: ",shoppingCart.id);
      return shoppingCart?.id ? shoppingCart.id : 0;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new BricksInCart();
