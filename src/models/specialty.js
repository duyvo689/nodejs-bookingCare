"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Specialty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Specialty.init(
    {
      name: DataTypes.STRING,
      descriptionHTML: DataTypes.TEXT,
      descriptionMarkdown: DataTypes.TEXT,
      image: DataTypes.TEXT,//STRING bị giới hạn kí tự nên chuyển sang TEXT
    },
    {
      sequelize,
      modelName: "Specialty",
      freezeTableName: true,//để sequilize không tự config lại tên table tránh khỏi bị lỗi sai tên
    }
  );
  return Specialty;
};
