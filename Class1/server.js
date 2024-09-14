const http = require("http");

const server = http.createServer((req, res)=> {
    // handle incoming request
    // res.setHeader("Content-Type", "text/plain");
    res.setHeader("Content-Type", "text/html");
    // res.write("Hello, World!");
    res.write("<h1>Hello World!</h1>")
    res.end();
});

const port = 1234;
const host = "localhost";
server.listen(port, host, ()=> {
    console.log(`Server is running on http://${host}:${port}`)
});