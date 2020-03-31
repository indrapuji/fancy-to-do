'use strict';
module.exports = (sequelize, DataTypes) => {

  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Todo extends Model { }

  Todo.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Title cannot be empty'
          }
        }
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Description cannot be empty'
          }
        }
      },
      status: DataTypes.BOOLEAN,
      due_date: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Due date cannot be empty'
          }
        }
      }
    }, { sequelize })

  Todo.associate = function (models) {
    Todo.belongsTo(models.User, { foreignKey: 'userId' })
  };
  return Todo;
};