const {log} = require('console');
const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./modules/replace-template');

/**fs.readFile('./txt/start.txt', 'utf8', (err, data1) => {
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
 log("Reading asynchronously");

 // const textOut = `This is what we know about Avocado ${textIn}. Created on ${Date.now()}`;
 // fs.writeFileSync('./txt/output.txt', textOut);
 */

// ///////////////SERVER/////////////////////
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);


const server = http.createServer((req, res) => {
    const {query, pathname} = url.parse(req.url, true);
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        });

        const cardsHtml = dataObj.map(element => replaceTemplate(tempCard, element)).join('');
        const output = tempOverview.replace('{%c' +
            '%}', cardsHtml);
        res.end(output);
    } else if (pathname === '/product') {
        res.writeHead(200, {'Content-type': 'text/html'});
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);
        res.end(output);
    } else if (pathname === '/api') {
        res.writeHead(200, {
            'Content-type': 'application/json'
        });
        res.end(data);
    } else {
        res.writeHead(404);
        res.end("Page Not Found!!")
    }
});

server.listen(8000, () => {
    log("Server started on port 8000");
});