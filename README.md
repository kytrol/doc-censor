# Technical Assessment
The program will remove given keywords and phrases from document text and insert XXXX at the locations where the text was removed.

## Installation

Install a compatible version of Node.js and npm (recommended Node v16.15.1, npm v8.11.0).

Run `npm install` to install necessary dependencies.

## Project Structure
The main program is contained in `app.js`.

Benchmarks for different implementations contained in `benchmark.js`.

`documents/` - Location for classified documents that need to be censored.

`censored-documents/` - Location for output censored documents.

`modules/censor.js` - Functions for censoring documents.

`modules/keyword.js` - Functions for parsing keyword input.

`util` - Utility for loading and writing `.txt` files.

## Execution
Run with `npm start`.

Lint with `npm run lint`.

Benchmark with `npm run benchmark`.

## Assumptions

#### Document Input
Assuming that the input documents format will be `.txt` files.

Since the prompt specifies that the input documents will be in "text format", this was assumed to be `.txt` files. The program will look for a `.txt` file in the `documents/` directory.

#### Censored Keywords Input
Assuming that the specific single and double quotes in the example input are used to denote phrases.

Example input uses `‘’` and `“”` specifically, which are different characters than `'` and `"`.

#### File Size
Assuming that file size is reasonable and not too large.

`fs.readFile()` loads the entire file into memory before it is useable, so large files would affect how the program performs.
If larger files are expected, it would be better to switch to an implementation using streams.

## Design Decisions

#### Lowercasing Text
The classified document is lowercased to better catch words or phrases that need to be censored. Two implementations are able to preserve the case of the original document while one is not. It is probably desirable for the original case to be preserved.  

#### Censoring Substrings
Say a censored word is `what`. For the word `whatever`, the censor would result in `XXXXever`. This could give context as to what the censored word could be. Might be worth considering censoring an entire word if it contains a substring to censor. Though this program does not implement this route.

#### Replacement Performance
There are many ways to replace substrings in a string. The main impact on performance will be how many times the implementation iterates over the classified document.

Implementation 1 has a number of iterations is dependent on the number of keyword matches in the document.

Implementation 2 has a number of iterations dependent on the number of keywords passed in.

Implementation 3 has a number of iterations dependent on the number of keywords, but uses the previously found index when initiating another search.