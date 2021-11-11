"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Docter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Docter.init(
    {
      docterId: DataTypes.INTEGER,
      clinicId: DataTypes.INTEGER,
      specialtyId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Docter",
      freezeTableName: true, //tránh sequilize tự config lại tên bảng
    }
  );
  return Docter;
};
