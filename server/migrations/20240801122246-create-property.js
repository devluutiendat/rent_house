  'use strict';
  /** @type {import('sequelize-cli').Migration} */
  module.exports = {
    async up(queryInterface, Sequelize) {
      await queryInterface.createTable('properties', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          type: Sequelize.STRING,
          allowNull : false
        },
        description: {
          type: Sequelize.STRING,
          allowNull :false
        },
        address: {
          type: Sequelize.STRING,
          allowNull :false
        },
        images: {
          type: Sequelize.TEXT,
          allowNull:false
        },
        price: {
          type: Sequelize.FLOAT,
          allowNull:false
        },
        status: {
          allowNull:false,
          type: Sequelize.ENUM(["already","updating","pending"]),
          defaultValue:"already",
        },
        size: {
          allowNull:false,
          type: Sequelize.INTEGER
        },
        agentid: {
          type: Sequelize.INTEGER,
          references: {
            model: 'users',
            key: 'id'
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          allowNull: false
  
        },
        LaterUpdate: {
          allowNull:false,
          type: Sequelize.DATE
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
      await queryInterface.dropTable('properties');
    }
  };