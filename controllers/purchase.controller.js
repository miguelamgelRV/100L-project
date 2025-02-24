const Purchase = require("../models/purchase.model");

class PurchaseController {

  async createPurchase(req, res) {
    try {
      const response = await Purchase.createPurchase(req.body);
      if (response.status) {
        res.status(200).json(response);
      } else {
        res
          .status(500)
          .json({
            status: false,
            message: "Ocurrió un error. Intenta más tarde.",
          });
      }
    } catch (error) {
      res.status(400).json({ status: false, message: error.message });
    }
  }
}

module.exports = new PurchaseController();
