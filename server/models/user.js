'use strict';
module.exports = (sequelize, DataTypes) => {

  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  const { bcrypt } = require('../helpers/bcrypt')

  class User extends Model { }

  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Title cannot be empty'
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Password cannot be empty"
          }
        }
      }
    }, {
    hooks: {
      beforeCreate: (instance, options) => {
        return bcrypt(instance.password)
          .then(bcrypt => {
            instance.password = bcrypt
          })
      }
    },
    sequelize
  })

  User.associate = function (models) {
    User.hasMany(models.Todo, { foreignKey: 'userId' })
  };
  return User;
};