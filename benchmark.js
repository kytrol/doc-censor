const { loadFile } = require('./util');
const { parseKeywords } = require('./modules/keyword');

const {
  censorKeyword,
  replaceAllKeywords,
  slowNextKeywordIndex,
  nextKeywordIndex
} = require('./modules/censor');

const CENSORED_KEYWORDS = `Don't happy “Prussian Blue”, ‘gift of imagination’, tree`;

const ITERATIONS = 100000;

/**
 * Benchmark implementation 1, the slow censor implementation.
 *
 * @return {void}
 */
async function implementation1() {
  try {
    const start = Date.now();
    const docText = await loadFile();
    for (let i = 0; i < ITERATIONS; i++) {
      let text = docText;
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
    const text = await loadFile();
    for (let i = 0; i < ITERATIONS; i++) {
      const keywords = parseKeywords(CENSORED_KEYWORDS);
      replaceAllKeywords(text, keywords);
    }

    const end = Date.now() - start;
    console.log('Implementation 2 with replaceAll took ' + end + 'ms to complete.\n');
  } catch (err) {
    console.log('Error in implementation2(). ', err);
  }
}

/**
 * Benchmark implementation 3, the slightly improved implementation
 *
 * @return {void}
 */
async function implementation3() {
  try {
    const start = Date.now();
    const docText = await loadFile();
    for (let i = 0; i < ITERATIONS; i++) {
      let text = docText;
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
    }

    const end = Date.now() - start;
    console.log('Implementation 3 took ' + end + 'ms to complete.\n');
  } catch (err) {
    console.log('Error in implementation3(). ', err);
  }
}

implementation1();

implementation2();

implementation3();
