// create web server
const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

const server = http.createServer((req, res) => {
    // console.log(req.url);
    // console.log(req.method);
    const myUrl = url.parse(req.url, true);
    // console.log(myUrl);
    // console.log(myUrl.pathname);
    // console.log(myUrl.query);
    // console.log(myUrl.query.name);
    // console.log(myUrl.query.age);

    if (myUrl.pathname === '/') {
        fs.readFile(path.join(__dirname, 'public', 'index.html'), 'utf8', (err, data) => {
            if (err) throw err;
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else if (myUrl.pathname === '/about') {
        fs.readFile(path.join(__dirname, 'public', 'about.html'), 'utf8', (err, data) => {
            if (err) throw err;
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else if (myUrl.pathname === '/api/users') {
        const users = [
            { name: 'John Doe', age: 30 },
            { name: 'Jane Doe', age: 25 }
        ];
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));
    } else {
        fs.readFile(path.join(__dirname, 'public', '404.html'), 'utf8', (err, data) => {
            if (err) throw err;
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});