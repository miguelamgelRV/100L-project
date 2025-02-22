const Property = require("../models/property.model");
const User = require("../models/user.model");
const Brick = require("../models/brick.model");

const fs = require("fs");
const path = require("path");

class Init {
  async initProperties() {
    if (await Property.model.count() === 0) {
      let counter = 0;

      const filePath = path.join(__dirname, "../data/properties.json");
      const jsonData = fs.readFileSync(filePath, "utf-8");
      const properies = JSON.parse(jsonData);

      properies.forEach((element) => {
        Property.createProperty(element);
      });

      return true;
    } else {
        console.log(`Properties count is: ${Property.model.count()}`)
        return false;
    }
  }

  async initUser() {
    let counter = 0;

    const filePath = path.join(__dirname, "../data/users.json");
    const jsonData = fs.readFileSync(filePath, "utf-8");
    const users = JSON.parse(jsonData);

    users.forEach((element) => {
      User.createUser(element).then((response) => {
        if (response.status) {
          counter++;
        }
      });
    });

    return counter;
  }

  async initBricks() {
    const properties = await Property.getAllProperties();
    console.log("llega");
    properties.datos.forEach((property) => {
      for (let index = 0; index <= property.availability; index++) {
        Brick.createBrick({
          propertyId: property.id,
          userId: null,
          cost: 1000,
          buyed: false,
        });
      }
    });
  }
}

module.exports = new Init();
