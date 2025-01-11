const http = require("http");
const url = require("url");
const querystring = require("querystring");
const PORT = 8080;

const server = http.createServer((req, res) => {
  const method = req.method;
  const parsedUrl = url.parse(req.url, true);

  if (method === "POST" && parsedUrl.pathname === "/submit") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      const formData = querystring.parse(body);
      console.log(formData); // Log the form data for debugging

      // Respond with a success message
      res.writeHead(200, { "content-type": "text/html" });
      res.end(
        "<h1>Form Submitted Successfully</h1><p>Thank you for your submission!</p>"
      );
    });
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    res.end(
      "<h1>404 Not Found</h1><p>The page you are looking for does not exist.</p>"
    );
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
