const http = require('http');
const url = require('url');
const quarystring = require('querystring');
const {error} = require('console');
const weatherApp = require('./src/weatherApp');

const port = 3000;

const server = http.createServer((req, res) => {
  
  res.setHeader('Content-Type', 'application/json');

    const parseUrl = url.parse(req.url);
    const parseQuery = quarystring.parse(parseUrl.query);

    if(!parseQuery.address){
        res.statusCode = 400;
        res.end(JSON.stringify({error: 'address is required'}
        ))
        return;
    }

    weatherApp(parseQuery.address)
    .then(data => {
        res.statusCode = 200;
        res.end(JSON.stringify(data));
    })
    .catch(error => {
        res.statusCode = 500;
        res.end(JSON.stringify({
            error: error.message
        }));
    });
});

server.listen(port, () => {
    console.log(`Server running at port ${port}`);
}
);