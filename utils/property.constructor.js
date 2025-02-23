const { DataTypes } = require("sequelize");
const database = require("../config/db");
const Brick = require("./brick.constructor");

const Property = database.sequelize.define("properties", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  postal_code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  latitude: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  longitude: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  availability: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  total_bricks: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Property.hasMany(Brick, {
  as: "bricks",
  foreignKey: "propertyId",
});

Brick.belongsTo(Property, {
  as: "property",
  foreignKey: "propertyId",
});

module.exports = Property;
