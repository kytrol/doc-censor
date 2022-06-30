const fs = require('fs/promises');

/**
 * Load a text file to scan for censored keywords.
 *
 * @return {void}
 */
async function loadFile() {
  return await fs.readFile('./documents/short-doc.txt', { encoding: 'utf8' });
}

module.exports = {
  loadFile
};
