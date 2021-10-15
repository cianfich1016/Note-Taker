const util = require('util');
const fs = require('fs');

const read = util.promisify(fs.readFile);

const readAppend = (info, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedInfo = JSON.parse(data);
        parsedInfo.push(info);
        writeToFile(file, parsedInfo);
      }
    });
  };

module.exports = { read, readAppend };