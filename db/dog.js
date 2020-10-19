/** @format */

const Sequelize = require('sequelize');
const db = require('./db');

const Dog = db.define('dog', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  happiness: {
    type: Sequelize.INTEGER,
    defaultValue: 50,
    validate: {
      min: 0,
      max: 100,
    },
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://i.pinimg.com/736x/ce/53/c5/ce53c5bcd350ba856e5c53c343376fb2.jpg',
  },
  color: {
    type: Sequelize.ENUM('red', 'cream', 'blackTan'),
    defaultValue: 'red',
  },
});

module.exports = Dog;
