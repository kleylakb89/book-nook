const seedBook = require('./bookData');
const seedGenre = require('./genreData');
const seedReview = require('./reviewData');
const seedUser = require('./userData');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedUser();
  console.log('\n----- USERS SYNCED -----\n');

  await seedGenre();
  console.log('\n----- GENRES SYNCED -----\n');

  await seedBook();
  console.log('\n----- BOOKS SYNCED -----\n');

  await seedReview();
  console.log('\n----- REVIEWS SYNCED -----\n');


  process.exit(0);
};

seedAll();
