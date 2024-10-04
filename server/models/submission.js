'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class submission extends Model {
    static associate(models) {
      submission.belongsTo(models.Property, {
        foreignKey: 'propertyId',
        as: 'property',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });

      submission.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }

  submission.init({
    message: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    propertyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Properties',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'submission',
  });

  return submission;
};
