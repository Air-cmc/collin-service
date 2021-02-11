/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
const fs = require('fs');
const faker = require('faker');

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// seed activities
const writeActivities = fs.createWriteStream('./database/sampleData/activities.csv');
writeActivities.write('activity_id,city_id,review_count,activity_description,price,liked');

const seedActivities = async (writer, encoding, callback) => {
  for (let i = 1; i < 10000000; i++) {
    if (String(i / 10000).length === 1) {
      console.log('Activity iteration', i);
    }
    const city = random(1, 25);
    const review_count = random(45, 26000);
    const data = `\n${i},${city},${review_count},${faker.lorem.sentence()},${faker.commerce.price()},false`;
    if (i !== 9999999) {
      if (!writeActivities.write(data, encoding)) {
        await new Promise((resolve) => writeActivities.once('drain', resolve));
      }
    } else {
      writeActivities.write(data, encoding, callback);
    }
  }
};

module.exports.seed = () => (
  seedActivities(writeActivities, 'utf-8', () => { writeActivities.end(); })
);
