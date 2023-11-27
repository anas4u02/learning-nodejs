const { log } = require('console');
const fs = require('fs');

fs.readFile('./txt/start.txt', 'utf8', (err, data1) => {
    fs.readFile(`./txt/${data1}.txt`, 'utf8', (err, data2) => {
        fs.readFile('./txt/append.txt', 'utf8', (err, data3) => {
            log(data3);
            fs.writeFile('./txt/final.txt',`${data2}\n${data3}` ,'utf8', err => {
                log("Your file has been written");
            });
        });
        log(data2);
    });
    log(data1);
});
log("Reading asynchrnously");

// const textOut = `This is what we know about Avocado ${textIn}. Created on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);