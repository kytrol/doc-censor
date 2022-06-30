const fs = require('fs/promises');

const { loadFile, outputFile } = require('./util');
const { parseKeywords } = require('./modules/keyword');

const {
  censorKeyword,
  replaceAllKeywords,
  slowNextKeywordIndex,
  nextKeywordIndex
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

    await outputFile(text);

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

    await outputFile(censoredText);

    console.log('Document censored.');
  } catch (err) {
    console.log(err);
  }
}

/**
 * Implementation that considers the previous index searched to.
 *
 * @return {void}
 */
async function implementation3() {
  try {
    let text = await loadFile();
    const keywords = parseKeywords(CENSORED_KEYWORDS);

    for (let i = 0; i < keywords.length; i++) {
      const keyword = keywords[i];
      let prevIndex = 0;
      let nextIndex = nextKeywordIndex(text, keyword, prevIndex);
      while (nextIndex !== -1) {
        text = censorKeyword(text, nextIndex, keyword);
        prevIndex = nextIndex;
        nextIndex = nextKeywordIndex(text, keyword, prevIndex);
      }
    }

    await outputFile(text);

    console.log('Document censored.');
  } catch (err) {
    console.log('Error in implementation3(). ', err);
  }
}


implementation3();
