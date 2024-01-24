const http = require("http");

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.end('Welcome to our homepage');
    } else if (req.url === '/about') {
        res.end('Here is the about page');
    } else {
        res.end(`<h1 style="color: blue">Failed to load</h1>\n\n
        <p>We could not load the page:</p>
        <a href="/">Homepage</a>`);
    }
});

server.listen(5000);