const Property = require("../utils/property.constructor");

const PropertyModel = require("../models/property.model");
const UserModel = require("../models/user.model");
const BrickModel = require("../models/brick.model");
const ShoppingCartModel = require("../models/shopping-cart.model");

const fs = require("fs");
const path = require("path");

class Init {
  async initProperties() {
    const count = await Property.count();
    if (count === 0) {
      const filePath = path.join(__dirname, "../data/properties.json");
      const jsonData = fs.readFileSync(filePath, "utf-8");
      const properies = JSON.parse(jsonData);

      properies.forEach((element) => {
        PropertyModel.createProperty(element);
      });

      return true;
    } else {
      console.log(`Properties count is: ${count}`);
      return false;
    }
  }

  async initUser() {
    const filePath = path.join(__dirname, "../data/users.json");
    const jsonData = fs.readFileSync(filePath, "utf-8");
    const users = JSON.parse(jsonData);

    users.forEach((element) => {
      UserModel.createUser(element).then((response) => {
        if (response.status) {
          ShoppingCartModel.createShoppingCart({
            userId: response.datos.id,
          });
        }
      });
    });
  }

  async initBricks() {
    const properties = await PropertyModel.getAllProperties();

    properties.datos.forEach((property) => {
      for (let index = 0; index <= property.availability; index++) {
        BrickModel.createBrick({
          propertyId: property.id,
          userId: null,
          shoppingCartId: null,
          cost: 1000,
          buyed: false,
        });
      }
    });
  }
}

module.exports = new Init();
