// create web server
// 1. create web server
// 2. create a route
// 3. create a response
// 4. send response
// 5. listen to the port

const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
    const pathName = url.parse(req.url, true).pathname;
    const name = url.parse(req.url, true).query.name;
    const comment = url.parse(req.url, true).query.comment;

    if (pathName === '/comment') {
        fs.readFile(`${__dirname}/comments.json`, 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
                res.end('Error');
            } else {
                const comments = JSON.parse(data);
                comments.comments.push({ name, comment });
                fs.writeFile(`${__dirname}/comments.json`, JSON.stringify(comments), (err) => {
                    if (err) {
                        console.log(err);
                        res.end('Error');
                    } else {
                        res.end('Success');
                    }
                });
            }
        });
    } else {
        res.end('Invalid Request');
    }
});

server.listen(3000, '