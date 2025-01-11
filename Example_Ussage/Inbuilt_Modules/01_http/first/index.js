const http = require("http");

const PORT = "8080";

const server = http.createServer((request, response) => {
  response.writeHead(200, {
    "content-type": "text/plain",
  });
  response.wri;
  response.end("Hello world");
});

server.listen(PORT, () => {
  console.log("Server running at http://localhost:8080");
});
