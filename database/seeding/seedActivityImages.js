/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
const fs = require('fs');

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// seed activity images
const writeActivityImages = fs.createWriteStream('./database/sampleData/activityImages.csv');
writeActivityImages.write('activity_image_id,activity_id,url_string');

const seedActivityImages = async (writer, encoding, callback) => {
  for (let i = 1; i < 60000000; i++) {
    if (String(i / 100000).length === 1) {
      console.log('House iteration', i);
    }
    const randomCity = random(1, 25);
    const randomActivity = random(1, 9999999);
    const data = `\n${i},${randomActivity},https://loremflickr.com/320/240/${randomCity}`;
    if (i !== 59999999) {
      if (!writeActivityImages.write(data, encoding)) {
        await new Promise((resolve) => writeActivityImages.once('drain', resolve));
      }
    } else {
      writeActivityImages.write(data, encoding, callback);
    }
  }
};
module.exports.seed = () => {
  seedActivityImages(writeActivityImages, 'utf-8', () => { writeActivityImages.end(); });
};
