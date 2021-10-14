"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class allCode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //Xác lập mỗi quan hệ với các bảng
      allCode.hasMany(models.User, { foreignKey: 'positionId', as: 'positionData' }),
        allCode.hasMany(models.User, { foreignKey: 'gender', as: 'genderData' })
    }
  }
  allCode.init(
    {
      keyMap: DataTypes.STRING,
      type: DataTypes.STRING,
      valueEn: DataTypes.STRING,
      valueVi: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "allCode",
    }
  );
  return allCode;
};
