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

  async getBrickById(req, res) {
    try {
      const brick = await Brick.getBrickById(req.query.id);
      res.status(200).json(brick);
    } catch (error) {
      res.status(400).json({ status: false, message: error.message });
    }
  }

  async createBrick(req, res) {
    try {
          const response = await Brick.createBrick(req.body);
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

module.exports = new BrickController();