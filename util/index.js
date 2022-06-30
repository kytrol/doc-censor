const fs = require('fs/promises');

const FILE_NAME = 'short-doc';
/**
 * Load a text file to scan for censored keywords.
 *
 * @return {Promise}
 */
async function loadFile() {
  return await fs.readFile(`./documents/${FILE_NAME}.txt`, { encoding: 'utf8' });
}

/**
 * Load a text file to scan for censored keywords.
 *
 * @return {Promise}
 */
async function outputFile(text) {
  return await fs.writeFile(`./censored-documents/${FILE_NAME}-censored.txt`, text);
}

module.exports = {
  loadFile,
  outputFile
};
