const { log } = require('console');
const fs = require('fs');
const http = require('http');
const url = require('url');

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
log("Reading asynchrnously");

// const textOut = `This is what we know about Avocado ${textIn}. Created on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
 */

// ///////////////SERVER/////////////////////
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%productName%}/g, product.productName);
    output = output.replace(/{%image%}/g, product.image);
    output = output.replace(/{%price%}/g, product.price);
    output = output.replace(/{%from%}/g, product.from);
    output = output.replace(/{%nutrients%}/g, product.nutrients);
    output = output.replace(/{%quantity%}/g, product.quantity);
    output = output.replace(/{%productDescription%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);
    if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    return output;
}
const server = http.createServer((req, res) => {
    const pathName = req.url;
    if (pathName === '/' || pathName ===  '/overview') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        });

        const cardsHtml = dataObj.map(element => replaceTemplate(tempCard, element)).join('');
        const output = tempOverview.replace('{%productCards%}', cardsHtml);
        res.end(output);
    } else if (pathName === '/product') {
        res.end("This is product");
    } else if (pathName === '/api') {
        res.writeHead(200, {
            'Content-type': 'application/json'
        });
        res.end(data);
    }
    else {
        res.writeHead(404);
        res.end("Page Not Found!!")
    }
});

server.listen(8000, () => {
    log("Server started on port 8000");
});