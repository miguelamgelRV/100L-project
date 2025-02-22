const Property = require("../models/property.model");

class PropertyController {
  async getAllProperties(req, res) {
    try {
      const properties = await Property.getAllProperties();
      res.status(200).json(properties);
    } catch (error) {
      res.status(400).json({ status: false, message: error.message });
    }
  }

  async addProperty(req, res) {
    try {
      const response = await Property.createProperty(req.body);
      if(response.status){
        res.status(200).json(response);
      } else {
        res.status(500).json({ status: false, message: "Ocurrió un error. Intenta más tarde." });
      }
    } catch (error) {
      res.status(400).json({ status: false, message: error.message });
    }
  }
}

module.exports = new PropertyController();
