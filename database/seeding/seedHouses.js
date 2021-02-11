/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
const fs = require('fs');
const faker = require('faker');

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// seed houses
const writeHouses = fs.createWriteStream('./database/sampleData/houses.csv');
writeHouses.write('home_id,city_id,reservation_type_id,house_description,price,beds,review_count,liked,superhost');

const seedHouses = async (writer, encoding, callback) => {
  for (let i = 1; i < 10000000; i++) {
    if (String(i / 10000).length === 1) {
      console.log('House iteration', i);
    }
    const city = random(1, 25);
    const reservation_type_id = random(1, 4);
    const review_count = random(15, 30000);
    const beds = random(1, 5);
    const data = `\n${i},${city},${reservation_type_id},${faker.lorem.sentence()},${faker.commerce.price()},${beds},${review_count},false,false`;
    if (i !== 9999999) {
      if (!writeHouses.write(data, encoding)) {
        await new Promise((resolve) => writeHouses.once('drain', resolve));
      }
    } else {
      writeHouses.write(data, encoding, callback);
    }
  }
};

module.exports.seed = () => {
  seedHouses(writeHouses, 'utf-8', () => { writeHouses.end(); });
};
