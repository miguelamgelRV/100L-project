const { Sequelize } = require("sequelize");

class Database {
  constructor() {
    this.sequelize = new Sequelize({
      dialect: "sqlite",
      storage: "./bricks.sqlite",
    });
  }

  async connect() {
    try {
      await this.sequelize.authenticate();
      console.log("Conexión establecida correctamente");
    } catch (error) {
      console.error("No se pudo conectar a la base de datos:", error);
    }
  }

  async sync() {
    try {
      await this.sequelize.sync();
      console.log("Base de datos sincronizada");
    } catch (error) {
      console.error("Error al sincronizar la base de datos:", error);
    }
  }
}

module.exports = new Database();
