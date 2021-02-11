/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
const fs = require('fs');

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// seed house images
const houseImageURL = 'http://d3je10agycmwlv.cloudfront.net/house_house%20interior_';
const writeHouseImages = fs.createWriteStream('./database/sampleData/houseImages.csv');
writeHouseImages.write('house_image_id,home_id,url_string');

const seedHouseImages = async (writer, encoding, callback) => {
  for (let i = 1; i < 60000000; i++) {
    if (String(i / 100000).length === 1) {
      console.log('HouseImage iteration', i);
    }
    const home_id = random(1, 9999999);
    const data = `\n${i},${home_id},${houseImageURL}${i}.jpg`;
    if (i !== 59999999) {
      if (!writeHouseImages.write(data, encoding)) {
        await new Promise((resolve) => writeHouseImages.once('drain', resolve));
      }
    } else {
      writeHouseImages.write(data, encoding, callback);
    }
  }
};
module.exports.seed = () => {
  seedHouseImages(writeHouseImages, 'utf-8', () => { writeHouseImages.end(); });
};
