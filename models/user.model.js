const UserConstructor = require("../utils/user.constructor");

class User {
  async getAllUsers() {
    try {
      const users = await UserConstructor.findAll();
      return users.length === 0
        ? { status: true, datos: [], message: "Sin datos por mostrar." }
        : {
            status: true,
            datos: users,
            message: "Datos obtenidos con éxito.",
          };
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async createUser(data) {
    try {
      const user = await UserConstructor.create(data);
      return {
        status: true,
        datos: user,
        message: "Registrado correctamente.",
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new User();
