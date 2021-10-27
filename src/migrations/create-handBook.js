"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("HandBooks", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            contentHTML: {
                allowNull: false,
                type: Sequelize.TEXT('long'),
            },
            nameBook: {
                type: Sequelize.STRING,
            },
            image: {
                type: Sequelize.BLOB('long'),
            },
            contentMarkdown: {
                allowNull: false,
                type: Sequelize.TEXT('long'),
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("HandBooks");
    },
};
