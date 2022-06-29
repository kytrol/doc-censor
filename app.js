const fs = require('fs/promises');

const CENSORED_KEYWORDS = `Don't happy “Prussian Blue”, ‘gift of imagination’, tree`;

const INVALID_KEYWORD_FORMAT_MSG = 'Invalid format for censored keywords.';
const DELIMITERS = [' ', ','];

const SingleQuote = {
  LEFT: '‘',
  RIGHT: '’',
};

const DoubleQuote = {
  LEFT: '“',
  RIGHT: '”'
};

loadFile();

/**
 * Load a text file to scan for censored keywords.
 *
 * @return {void}
 */
async function loadFile() {
  try {
    await fs.readFile('./documents/doc.txt', { encoding: 'utf8' });
    const words = parseKeywords(CENSORED_KEYWORDS);
    console.log('words', words);
  } catch (err) {
    console.log(err);
  }
}

/**
 * Parse an input string to determine the specified keywords.
 *
 * @param  {string} censoredInput  String of censored keywords
 * @return {string[]}              Array of censored keywords
 */
function parseKeywords(censoredInput) {
  const keywords = [];

  let openingQuote = '';
  let keyword = '';
  for (let i = 0; i < CENSORED_KEYWORDS.length; i++) {
    const currentChar = CENSORED_KEYWORDS[i];

    // "Phrase mode" ignores all delimiters and creates a key phrase of whatever is inside quotes
    const isPhraseMode = openingQuote !== '';
    if (isPhraseMode) {
      const closingQuote = getCloseQuote(openingQuote);
      // Reached closing quote, record the keyword and reset
      if (currentChar === closingQuote) {
        keywords.push(keyword);
        keyword = '';
        openingQuote = '';

      // Still inside the phrase, continuing building out key phrase
      } else {
        keyword += currentChar;
      }

    // Outside of "phrase mode", all delimiters are used to create keywords
    } else {
      // If a closing quote is reached with no opening quote, the keyword format is invalid
      if ((currentChar === SingleQuote.RIGHT || currentChar === DoubleQuote.RIGHT) && openingQuote === '') {
        throw new Error(INVALID_KEYWORD_FORMAT_MSG);

        // Toggles "phrase mode" and advances to the next character
      } else if (currentChar === SingleQuote.LEFT || currentChar === DoubleQuote.LEFT) {
        openingQuote = currentChar;

        // If char is a delimiter, we've reached the end of keyword
      } else if (DELIMITERS.includes(currentChar)) {
        if (keyword !== '') {
          keywords.push(keyword);
        }

        keyword = '';

      // Otherwise append the char to the current keyword being built
      } else {
        keyword += currentChar;
      }
    }
  }

  // If openingQuote still exists, the input has an invalid format
  if (openingQuote !== '') {
    throw new Error(INVALID_KEYWORD_FORMAT_MSG);
  }

  // If end of string is reached, push the last keyword if it exists
  if (keyword) {
    keywords.push(keyword);
  }

  return keywords;
}

/**
 * Return a matching closing quote for the passed in opening quote.
 *
 * @param  {SingleQuote | DoubleQuote} openingQuote  Opening quote
 * @return {SingleQuote | DoubleQuote}               Corresponding closing quote
 */
function getCloseQuote(openingQuote) {
  if (openingQuote === SingleQuote.LEFT) {
    return SingleQuote.RIGHT;
  }

  if (openingQuote === DoubleQuote.LEFT) {
    return DoubleQuote.RIGHT;
  }

  // This should never be reached
  throw new Error('Could not get closing quote. Check use of getCloseQuote()');
}
