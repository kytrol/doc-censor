const CENSOR_PHRASE = 'XXXX';

/**
 * Return text with passed in keyword censored.
 *
 * @param  {string}  text       Text to censor
 * @param  {number}  nextIndex  Index of next keyword
 * @param  {string}  keyword    Keyword to censor
 * @return {string}             Censored text
 */
function censorKeyword(text, nextIndex, keyword) {
  return text.substring(0, nextIndex) + CENSOR_PHRASE + text.substring(nextIndex + keyword.length, text.length);
}

/**
 * Return index of the next censored keyword.
 *
 * NOTE: Slow because it iterates from the beginning of the text each time,
 *       dependent on the number of keyword matches in the text.
 *
 * @param  {string}    text      Text to censor
 * @param  {string[]}  keywords  Censor keywords
 * @return {Keyword}             Keyword and index
 */
function slowNextKeywordIndex(text, keywords) {
  const lowercaseText = text.toLowerCase();
  for (let i = 0; i < keywords.length; i++) {
    const keyword = keywords[i];
    const keywordIndex = lowercaseText.indexOf(keyword);
    if (keywordIndex !== -1) {
      return {
        nextIndex: keywordIndex,
        keyword
      };
    }
  }

  return {
    nextIndex: -1,
    keyword: null
  };
}

/**
 * Return index of the next censored keyword.
 *
 * @param  {string}    text       Text to censor
 * @param  {string}    keyword    Censor keyword
 * @param  {number}    prevIndex  Index to start search from
 * @return {Keyword}              Keyword and index
 */
function keywordIndex(text, keyword, prevIndex) {
  const nextIndex = text.toLowerCase().indexOf(keyword, prevIndex);

  return {
    nextIndex,
    keyword
  };
}

/**
 * Return index of the next censored keyword.
 *
 * NOTE: Does not preserve case of the original text.
 *
 * @param  {String}    text      Text to censor
 * @param  {String[]}  keywords  Censor keywords
 * @return {Keyword}             Keyword and index
 */
function replaceAllKeywords(text, keywords) {
  let lowercaseText = text.toLowerCase();

  keywords.forEach(keyword => {
    lowercaseText = lowercaseText.replaceAll(keyword, CENSOR_PHRASE);
  });

  return lowercaseText;
}

module.exports = {
  censorKeyword,
  keywordIndex,
  replaceAllKeywords,
  slowNextKeywordIndex
};
