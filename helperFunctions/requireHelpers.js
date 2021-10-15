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

const writeToFile = (finalFile, content) =>
    fs.writeFile(finalFile, JSON.stringify(content, null, 4), (err) =>
        err ? console.error(err) : console.info(`\nNote data written can be found in the file ${finalFile}`)
);

module.exports = { read, readAppend, writeToFile };