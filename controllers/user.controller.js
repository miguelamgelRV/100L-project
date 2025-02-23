const User = require("../models/user.model");

class UserController {
  async getUsers(req, res) {
    try {
      const users = await User.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json({ status: false, message: error.message });
    }
  }

  async createUser(req, res) {
    try {
          const response = await User.createUser(req.body);
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

module.exports = new UserController();