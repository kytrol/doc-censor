const fs = require('fs/promises');

const { loadFile } = require('./util');
const { parseKeywords } = require('./modules/keyword');

const {
  censorKeyword,
  replaceAllKeywords,
  slowNextKeywordIndex
} = require('./modules/censor');

const CENSORED_KEYWORDS = `Don't happy “Prussian Blue”, ‘gift of imagination’, tree`;

/**
 * Not a great implementation, preserves case but is slower than using String.replaceAll().
 *
 * @return {void}
 */
async function implementation1() {
  try {
    let text = await loadFile();
    const keywords = parseKeywords(CENSORED_KEYWORDS);

    let { nextIndex, keyword } = slowNextKeywordIndex(text, keywords);
    while (nextIndex !== -1) {
      text = censorKeyword(text, nextIndex, keyword);

      ({ nextIndex, keyword } = slowNextKeywordIndex(text, keywords));
    }

    await fs.writeFile('./censored-documents/short-doc-censored.txt', text);

    console.log('Document censored.');
  } catch (err) {
    console.log(err);
  }
}

/**
 * Simple implementation that does not preserve case of the original document.
 *
 * @return {void}
 */
async function implementation2() { // eslint-disable-line no-unused-vars
  try {
    const text = await loadFile();
    const keywords = parseKeywords(CENSORED_KEYWORDS);
    const censoredText = replaceAllKeywords(text, keywords);

    await fs.writeFile('./censored-documents/short-doc-censored.txt', censoredText);

    console.log('Document censored.');
  } catch (err) {
    console.log(err);
  }
}

implementation1();
