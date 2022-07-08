// user seed data
const { User } = require('../models');

const userData = [
  {
    username: 'jimmyjohn',
    email: 'jimmy.john@james.com',
    password: 'ilikebooks',
  },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
