'use strict';

const { Order } = require('../models')

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Order.bulkCreate([
      {
        user_id: 1,
        address: '345 Real St',
        city: 'Union City',
        state: 'CA',
        zip: '94587',
        amount: 1059.98,
        status: 'Order Received'
      },
      {
        user_id: 2,
        address: '123 Fake St',
        city: 'Fremont',
        state: 'CA',
        zip: '94538',
        amount: 599.99,
        status: 'Order Received'
      },
      {
        user_id: 2,
        address: '585 Jay St',
        city: 'Santa Clara',
        state: 'CA',
        zip: '95051',
        amount: 459.99,
        status: 'Sales In Process'
      },
      {
        user_id: 3,
        address: '2030 Duane Ave',
        city: 'Santa Clara',
        state: 'CA',
        zip: '95051',
        amount: 429.99,
        status: 'Order Shipped'
      }
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Orders';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      user_id: { [Op.in]: ["1","2","3"] }
    }, {});
  }
};
