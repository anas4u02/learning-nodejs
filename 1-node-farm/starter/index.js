const { log } = require('console');
const fs = require('fs');

const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
log(textIn);