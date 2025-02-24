const PurchaseConstructor = require("../utils/purchases.constructor");

class Purchase {
  async createPurchase(data) {
    try {
      const purchase = await PurchaseConstructor.create(data);
      return {
        status: true,
        datos: purchase,
        message: "Registrado correctamente.",
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findTermsAccpted(userId, brickId) {
    try {
      const purchase = await PurchaseConstructor.findOne({
        attributes: ["id", "isTersAccepted"],
        where: {
          userId: userId,
          brickId: brickId,
        },
      });

      return purchase?.id ? purchase : {id: 0, isTersAccepted: false};
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new Purchase();
