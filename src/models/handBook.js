"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class HandBook extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    HandBook.init(
        {
            nameBook: DataTypes.STRING,
            image: DataTypes.BLOB('long'),
            contentHTML: DataTypes.TEXT('long'),
            contentMarkdown: DataTypes.TEXT('long'),
        },
        {
            sequelize,
            modelName: "HandBook",
        }
    );
    return HandBook;
};
