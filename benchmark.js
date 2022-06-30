const { loadFile } = require('./util');
const { parseKeywords } = require('./modules/keyword');

const {
  censorKeyword,
  replaceAllKeywords,
  slowNextKeywordIndex,
} = require('./modules/censor');

const CENSORED_KEYWORDS = `Don't happy “Prussian Blue”, ‘gift of imagination’, tree`;

/**
 * Benchmark implementation 1, the slow censor implementation.
 *
 * @return {void}
 */
async function implementation1() {
  try {
    const start = Date.now();
    for (let i = 0; i < 10000; i++) {
      let text = await loadFile();
      const keywords = parseKeywords(CENSORED_KEYWORDS);

      let { nextIndex, keyword } = slowNextKeywordIndex(text, keywords);
      while (nextIndex !== -1) {
        text = censorKeyword(text, nextIndex, keyword);

        ({ nextIndex, keyword } = slowNextKeywordIndex(text, keywords));
      }
    }

    const end = Date.now() - start;
    console.log('Implementation 1 took ' + end + 'ms to complete.\n');
  } catch (err) {
    console.log('Error in implementation1(). ', err);
  }
}

/**
 * Benchmark implementation2, the replaceAll implementation.
 *
 * @return {void}
 */
async function implementation2() {
  try {
    const start = Date.now();
    for (let i = 0; i < 10000; i++) {
      const text = await loadFile();
      const keywords = parseKeywords(CENSORED_KEYWORDS);
      replaceAllKeywords(text, keywords);
    }

    const end = Date.now() - start;
    console.log('Implementation 2 with replaceAll took ' + end + 'ms to complete.\n');
  } catch (err) {
    console.log('Error in implementation2(). ', err);
  }
}

implementation1();

implementation2();
