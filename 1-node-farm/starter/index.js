const { log } = require('console');
const fs = require('fs');

const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
log(textIn);

const textOut = `This is what we know about Avocado ${textIn}. Created on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', textOut);