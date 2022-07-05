const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Book extends Model {}

// book info
Book.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
  
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      has_read: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },

      favorite: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: "false",
      },

      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
      },

      genre_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'genre',
            key: 'id'
        }
      },

      review_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'review',
            key: 'id'
        }
      },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'book',
    }
  );

module.exports = Book;