const http = require("http");
const PORT = 8080;
const server = http.createServer((req, res) => {
  const url = req.url;
  console.log(req.url);
  if (url === "/") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end("<h1>Welcome to the home page written with html h1 tag </h1>");
  } else if (url === "/about") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end(
      "<h1>About Us</h1><p>This is a basic Node.js HTTP server example.</p>"
    );
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    res.end(
      "<h1>404 Not Found</h1><p>The page you are looking for does not exist.</p>"
    );
  }
});

server.listen(PORT, () => {
  console.log("Server is running at http://localhost:8080");
});
