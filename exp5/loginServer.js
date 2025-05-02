const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

const PORT = 3000;

 
const validUser = {
    username: "visnu",
    password: "123456"
};

const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url === "/login") {
        
        fs.readFile(path.join(__dirname, "login.html"), (err, data) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Internal Server Error");
            } else {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(data);
            }
        });
    } else if (req.method === "POST" && req.url === "/login") {
       
        let body = "";
        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {
            const parsedData = querystring.parse(body);
            const { username, password } = parsedData;

            if (username === validUser.username && password === validUser.password) {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(<h2>Welcome, ${username}! Login successful.</h2>);
            } else {
                res.writeHead(401, { "Content-Type": "text/html" });
                res.end(<h2 style="color: red;">Invalid username or password.</h2><a href="/login">Try Again</a>);
            }
        });
    } else {
    
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Page Not Found");
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/login`);
});