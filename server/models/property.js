'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Property extends Model {
    static associate(models) {
      Property.belongsTo(models.User, {
        foreignKey: 'agentId',
        as: 'agent',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });

      Property.hasMany(models.submission, {
        foreignKey: 'id',
        as: 'submissions',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });      
    }
  }

  Property.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    images: {
      type: DataTypes.TEXT,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue('images');
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(arrayImages) {
        this.setDataValue('images', JSON.stringify(arrayImages));
      }
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('already', 'updating', 'pending'),
      allowNull: false,
      defaultValue: 'already'
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    agentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    LaterUpdate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Property',
  });

  return Property;
};
