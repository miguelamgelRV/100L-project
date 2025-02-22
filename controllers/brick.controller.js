const Brick = require("../models/brick.model");

class BrickController {
  async getAllBricksByProperty(req, res) {
    try {
      const bricks = await Brick.getAllBricks(req.query.id);
      res.status(200).json(bricks);
    } catch (error) {
      res.status(400).json({ status: false, message: error.message });
    }
  }
}

module.exports = new BrickController();