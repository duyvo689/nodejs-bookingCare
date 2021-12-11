'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.allCode, { foreignKey: 'positionId', targetKey: 'keyMap', as: 'positionData' }) //1-n:(1 allcode nhiều user)
      User.belongsTo(models.allCode, { foreignKey: 'gender', targetKey: 'keyMap', as: 'genderData' })//1-n:(1 allcode nhiều user)
      User.hasOne(models.Markdown, { foreignKey: 'doctorId' })//1-1
      User.hasOne(models.Doctor_Infor, { foreignKey: 'doctorId' }) //1-1
      User.hasMany(models.Schedule, { foreignKey: 'doctorId', as: 'doctorData' }) //1-n: quan hệ 1 nhiều
      User.hasMany(models.Booking, { foreignKey: 'patientId', as: 'patientData' }) //1-n: quan hệ 1 nhiều
    }
  };
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    gender: DataTypes.STRING,
    roleId: DataTypes.STRING,
    positionId: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};