# Technical Assessment
The program will remove given keywords and phrases from document text and insert XXXX at the locations where the text was removed.

## Installation

Install a compatible version Node.js and npm (recommended Node v16.15.1, npm v8.11.0).

Run `npm install` to install necessary dependencies.

## Project Structure
The main program is contained in `app.js`.

The program reads classified documents from the `documents/` directory and outputs censored documents to the `censored-documents/` directory.

## Execution
Run with `npm start`.

Lint with `npm lint`.

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