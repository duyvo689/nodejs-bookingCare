'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'duythanh@gmail.com',
      password: 'duythanh',
      firstName: 'Duy',
      lastName: 'Vo',
      address: 'Tp HCM',
      phoneNumber: '09828394810',

      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
