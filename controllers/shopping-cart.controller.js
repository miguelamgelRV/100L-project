const ShoppingCart = require("../models/shopping-cart.model");

class ShoppingCartController {
  async getShoppingCart(req, res) {
    try {
      const shoppingCart = await ShoppingCart.getShoppingCartByUser(
        req.query.id
      );
      res.status(200).json(shoppingCart);
    } catch (error) {
      res.status(400).json({ status: false, message: error.message });
    }
  }

  async addBrickToShoppingCart(req, res) {
    try {
      const { brickId, shoppingCartId } = req.body;
      const shoppingCart = await ShoppingCart.addBrickToShoppingCart(
        brickId,
        shoppingCartId
      );
      res.status(200).json(shoppingCart);
    } catch (error) {
      res.status(400).json({ status: false, message: error.message });
    }
  }

  async deleteBrickToShoppingCart(req, res) {
    try {
      const idBrickInCart = req.query.id;
      const shoppingCart = await ShoppingCart.deleteBrickToShoppingCart(idBrickInCart);
      res.status(200).json(shoppingCart);
    } catch (error) {
      res.status(400).json({ status: false, message: error.message });
    }
  }
}

module.exports = new ShoppingCartController();
