"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User, { foreignKey: 'patientId', targetKey: 'id', as: 'patientData' }),
        Booking.belongsTo(models.allCode, { foreignKey: 'timeType', targetKey: 'keyMap', as: 'timeTypeDataPatient' })//1-n:(1 allcode nhiều booking)
    }
  }
  Booking.init(
    {
      statusId: DataTypes.STRING,
      doctorId: DataTypes.INTEGER,
      patientId: DataTypes.INTEGER,
      date: DataTypes.STRING,
      timeType: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Booking",
      freezeTableName: true,//để sequilize không tự config lại tên table tránh khỏi bị lỗi sai tên 
    }
  );
  return Booking;
};
