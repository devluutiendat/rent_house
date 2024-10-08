'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      role: {
        allowNull:false,
        type: Sequelize.ENUM(["agent","user"])
      },
      name:{
        allowNull:false,
        type:Sequelize.STRING
      },
      email:{
        allowNull:false,
        type:Sequelize.STRING
      },
      password:{
        allowNull:false,
        type:Sequelize.STRING
      },
      avatar:{
        allowNull:false,
        type:Sequelize.STRING
      },   
      phone:{
        allowNull:false,
        type:Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};