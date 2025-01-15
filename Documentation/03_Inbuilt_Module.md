# Node.js Built-in Modules: Complete Guide

## Table of Contents

1. [HTTP Module](#http-module)
2. [File System (fs) Module](#file-system-module)
3. [Path Module](#path-module)
4. [URL Module](#url-module)
5. [Events Module](#events-module)
6. [OS Module](#os-module)
7. [Process Module](#process-module)
8. [Stream Module](#stream-module)
9. [Crypto Module](#crypto-module)
10. [Timers](#timers)
11. [Cluster Module](#cluster-module)
12. [Child Process Module](#child-process-module)
13. [Util Module](#util-module)
14. [QueryString Module](#querystring-module)
15. [DNS Module](#dns-module)

# 1. HTTP Module in Node.js

The `http` module in Node.js is used to create an HTTP server and client. It provides the capability to interact with the HTTP protocol, enabling Node.js to act as a server for receiving requests and sending responses. The `http` module is a core module in Node.js, meaning it is built-in and does not require installation.

## Key Features of the HTTP Module

- Create HTTP servers to handle client requests.
- Create HTTP clients to send requests to other servers.
- Provide utilities for parsing and formatting URLs, headers, and payloads.

---

## 1. Importing the HTTP Module

To use the `http` module, you need to import it in your script:

```javascript
const http = require("http");
```

---

## 2. Creating an HTTP Server

The `http.createServer()` method is used to create an HTTP server. This method takes a callback function that is executed whenever a request is received.

### Example:

```javascript
const http = require("http");

const server = http.createServer((req, res) => {
  res.statusCode = 200; // HTTP Status: OK
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello, World!");
});

server.listen(3000, () => {
  console.log("Server is running at http://localhost:3000/");
});
```

### Explanation:

- **req (IncomingMessage):** Represents the HTTP request and contains details like URL, headers, and method.
- **res (ServerResponse):** Represents the HTTP response that will be sent to the client.

---

## 3. Handling HTTP Requests

### Request Object Properties:

- **`req.url`**: The URL of the incoming request.
- **`req.method`**: The HTTP method (GET, POST, etc.).
- **`req.headers`**: An object containing request headers.

### Example:

```javascript
const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>Welcome to the Home Page!</h1>");
  } else {
    res.statusCode = 404;
    res.end("Page Not Found");
  }
});
```

---

## 4. Handling HTTP Responses

### Response Object Methods:

- **`res.writeHead(statusCode, headers)`**: Sets the status code and headers.
- **`res.setHeader(name, value)`**: Sets a single header.
- **`res.write(data)`**: Sends data to the client.
- **`res.end([data])`**: Ends the response process.

---

## 5. HTTP Methods

The common HTTP methods are:

- **GET**: Retrieve data from the server.
- **POST**: Send data to the server.
- **PUT**: Update existing data on the server.
- **DELETE**: Remove data from the server.

### Example of Handling Methods:

```javascript
const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/submit") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString(); // Convert Buffer to string
    });

    req.on("end", () => {
      res.end(`Data Received: ${body}`);
    });
  } else {
    res.statusCode = 405; // Method Not Allowed
    res.end("Unsupported HTTP Method");
  }
});
```

---

## 6. Streams in HTTP

The `http` module uses streams for both requests and responses. This allows efficient handling of large data.

### Example of Streaming Data:

```javascript
const fs = require("fs");
const server = http.createServer((req, res) => {
  const readStream = fs.createReadStream("./file.txt");
  res.writeHead(200, { "Content-Type": "text/plain" });
  readStream.pipe(res);
});
```

---

## 7. HTTP Headers

Headers provide additional information about the request/response. Common headers include:

- **Content-Type**: Indicates the MIME type of the content.
- **Content-Length**: Size of the content body in bytes.
- **Authorization**: Contains credentials for authentication.

### Setting Headers:

```javascript
res.setHeader("Content-Type", "application/json");
```

---

## 8. HTTP Status Codes

Status codes indicate the result of the HTTP request:

- **1xx**: Informational
- **2xx**: Success (e.g., 200 OK, 201 Created)
- **3xx**: Redirection (e.g., 301 Moved Permanently)
- **4xx**: Client Errors (e.g., 404 Not Found, 401 Unauthorized)
- **5xx**: Server Errors (e.g., 500 Internal Server Error)

### Setting Status Codes:

```javascript
res.writeHead(200, { "Content-Type": "text/plain" });
```

---

## 9. HTTP Clients

The `http` module can also be used to create HTTP clients to send requests to other servers.

### Example:

```javascript
const options = {
  hostname: "jsonplaceholder.typicode.com",
  path: "/posts/1",
  method: "GET",
};

const req = http.request(options, (res) => {
  let data = "";

  res.on("data", (chunk) => {
    data += chunk;
  });

  res.on("end", () => {
    console.log("Response:", data);
  });
});

req.on("error", (error) => {
  console.error(error);
});

req.end();
```

---

## 10. HTTPS Module

For secure communication, use the `https` module, which works similarly to the `http` module but uses SSL/TLS encryption.

---

## Conclusion

The `http` module is fundamental in building networked applications in Node.js. Understanding how to create servers, handle requests and responses, and work with headers and streams is crucial for backend development.

# 2. File System (fs) Module in Node.js

The `fs` module in Node.js provides an API to interact with the file system in a way modeled on standard POSIX functions. This module is one of the core modules and doesn't require installation.

## Importing the `fs` Module

To use the `fs` module, you must require it in your Node.js file:

```javascript
const fs = require("fs");
```

Alternatively, for promises-based functions:

```javascript
const fsPromises = require("fs/promises");
```

---

## Categories of Methods

The `fs` module offers three sets of methods to work with files and directories:

1. **Synchronous Methods**: Blocking operations.
2. **Asynchronous Methods**: Non-blocking operations.
3. **Promise-based Methods**: Return `Promise` objects for better asynchronous handling.

---

## Commonly Used Methods

### File Operations

#### 1. Reading Files

- **Asynchronous**

```javascript
fs.readFile("example.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
```

- **Synchronous**

```javascript
try {
  const data = fs.readFileSync("example.txt", "utf8");
  console.log(data);
} catch (err) {
  console.error(err);
}
```

- **Promises-based**

```javascript
const fsPromises = require("fs/promises");

fsPromises
  .readFile("example.txt", "utf8")
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
```

#### 2. Writing Files

- **Asynchronous**

```javascript
fs.writeFile("example.txt", "Hello, World!", (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("File written successfully");
});
```

- **Synchronous**

```javascript
try {
  fs.writeFileSync("example.txt", "Hello, World!");
  console.log("File written successfully");
} catch (err) {
  console.error(err);
}
```

- **Promises-based**

```javascript
fsPromises
  .writeFile("example.txt", "Hello, World!")
  .then(() => console.log("File written successfully"))
  .catch((err) => console.error(err));
```

#### 3. Appending to Files

- **Asynchronous**

```javascript
fs.appendFile("example.txt", "\nAppended text.", (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Text appended successfully");
});
```

- **Synchronous**

```javascript
try {
  fs.appendFileSync("example.txt", "\nAppended text.");
  console.log("Text appended successfully");
} catch (err) {
  console.error(err);
}
```

- **Promises-based**

```javascript
fsPromises
  .appendFile("example.txt", "\nAppended text.")
  .then(() => console.log("Text appended successfully"))
  .catch((err) => console.error(err));
```

#### 4. Deleting Files

- **Asynchronous**

```javascript
fs.unlink("example.txt", (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("File deleted successfully");
});
```

- **Synchronous**

```javascript
try {
  fs.unlinkSync("example.txt");
  console.log("File deleted successfully");
} catch (err) {
  console.error(err);
}
```

- **Promises-based**

```javascript
fsPromises
  .unlink("example.txt")
  .then(() => console.log("File deleted successfully"))
  .catch((err) => console.error(err));
```

---

### Directory Operations

#### 1. Creating Directories

- **Asynchronous**

```javascript
fs.mkdir("newDir", { recursive: true }, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Directory created successfully");
});
```

- **Synchronous**

```javascript
try {
  fs.mkdirSync("newDir", { recursive: true });
  console.log("Directory created successfully");
} catch (err) {
  console.error(err);
}
```

- **Promises-based**

```javascript
fsPromises
  .mkdir("newDir", { recursive: true })
  .then(() => console.log("Directory created successfully"))
  .catch((err) => console.error(err));
```

#### 2. Reading Directories

- **Asynchronous**

```javascript
fs.readdir("path/to/dir", (err, files) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(files);
});
```

- **Synchronous**

```javascript
try {
  const files = fs.readdirSync("path/to/dir");
  console.log(files);
} catch (err) {
  console.error(err);
}
```

- **Promises-based**

```javascript
fsPromises
  .readdir("path/to/dir")
  .then((files) => console.log(files))
  .catch((err) => console.error(err));
```

#### 3. Removing Directories

- **Asynchronous**

```javascript
fs.rmdir("path/to/dir", (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Directory removed successfully");
});
```

- **Synchronous**

```javascript
try {
  fs.rmdirSync("path/to/dir");
  console.log("Directory removed successfully");
} catch (err) {
  console.error(err);
}
```

- **Promises-based**

```javascript
fsPromises
  .rmdir("path/to/dir")
  .then(() => console.log("Directory removed successfully"))
  .catch((err) => console.error(err));
```

---

### Watching Files and Directories

#### Watching Files

```javascript
fs.watch("example.txt", (eventType, filename) => {
  if (filename) {
    console.log(`File ${filename} has a ${eventType} event`);
  }
});
```

#### Watching Directories

```javascript
fs.watch("path/to/dir", (eventType, filename) => {
  if (filename) {
    console.log(`Directory file ${filename} has a ${eventType} event`);
  }
});
```

---

## Error Handling

- Always check for errors using `try-catch` blocks in synchronous methods.
- Handle errors in callbacks or promises in asynchronous methods.

---

## Important Notes

1. Prefer asynchronous or promises-based methods for better performance in production.
2. Always use the `utf8` encoding when working with text files unless otherwise required.
3. Use the `fs/promises` API for modern and cleaner asynchronous programming.
4. Enable `recursive: true` when working with directories to avoid errors for nested paths.

# 3. Path Module in Node.js

The `path` module in Node.js is used for working with file and directory paths. It provides utilities to manipulate and transform file paths, ensuring platform-specific compatibility. The `path` module is a core module, so it does not require installation.

## Key Features of the Path Module

- Normalize file paths.
- Resolve absolute paths.
- Join multiple path segments.
- Extract file name, directory name, and extensions from paths.

---

## 1. Importing the Path Module

To use the `path` module, you need to import it in your script:

```javascript
const path = require("path");
```

---

## 2. Common Methods in the Path Module

### 2.1 `path.basename()`

This method returns the last portion of a path, typically the file name.

#### Syntax:

```javascript
path.basename(path[, ext])
```

#### Example:

```javascript
const filePath = "/home/user/docs/file.txt";
console.log(path.basename(filePath)); // Output: file.txt
console.log(path.basename(filePath, ".txt")); // Output: file
```

---

### 2.2 `path.dirname()`

This method returns the directory name of a path.

#### Syntax:

```javascript
path.dirname(path);
```

#### Example:

```javascript
const filePath = "/home/user/docs/file.txt";
console.log(path.dirname(filePath)); // Output: /home/user/docs
```

---

### 2.3 `path.extname()`

This method returns the extension of a file.

#### Syntax:

```javascript
path.extname(path);
```

#### Example:

```javascript
const filePath = "/home/user/docs/file.txt";
console.log(path.extname(filePath)); // Output: .txt
```

---

### 2.4 `path.join()`

This method joins multiple path segments into a single path, normalizing the resulting path.

#### Syntax:

```javascript
path.join([...paths]);
```

#### Example:

```javascript
const joinedPath = path.join("/home", "user", "docs", "file.txt");
console.log(joinedPath); // Output: /home/user/docs/file.txt
```

---

### 2.5 `path.resolve()`

This method resolves a sequence of paths into an absolute path.

#### Syntax:

```javascript
path.resolve([...paths]);
```

#### Example:

```javascript
const resolvedPath = path.resolve("docs", "file.txt");
console.log(resolvedPath); // Output: Absolute path to docs/file.txt
```

---

### 2.6 `path.normalize()`

This method normalizes a path, resolving `..` and `.` segments.

#### Syntax:

```javascript
path.normalize(path);
```

#### Example:

```javascript
const normalizedPath = path.normalize("/home/user/../docs/./file.txt");
console.log(normalizedPath); // Output: /home/docs/file.txt
```

---

### 2.7 `path.isAbsolute()`

This method checks if a path is an absolute path.

#### Syntax:

```javascript
path.isAbsolute(path);
```

#### Example:

```javascript
console.log(path.isAbsolute("/home/user/docs")); // Output: true
console.log(path.isAbsolute("docs/file.txt")); // Output: false
```

---

### 2.8 `path.relative()`

This method determines the relative path from one path to another.

#### Syntax:

```javascript
path.relative(from, to);
```

#### Example:

```javascript
const from = "/home/user/docs";
const to = "/home/user/images";
console.log(path.relative(from, to)); // Output: ../images
```

---

### 2.9 `path.parse()`

This method returns an object with information about the given path.

#### Syntax:

```javascript
path.parse(path);
```

#### Example:

```javascript
const parsedPath = path.parse("/home/user/docs/file.txt");
console.log(parsedPath);
// Output:
// {
//   root: '/',
//   dir: '/home/user/docs',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file'
// }
```

---

### 2.10 `path.format()`

This method constructs a path string from an object created by `path.parse()`.

#### Syntax:

```javascript
path.format(pathObject);
```

#### Example:

```javascript
const pathObject = {
  root: "/",
  dir: "/home/user/docs",
  base: "file.txt",
};
console.log(path.format(pathObject)); // Output: /home/user/docs/file.txt
```

---

## 3. Platform-Specific Path Handling

The `path` module provides properties for handling platform-specific path delimiters and separators.

### 3.1 `path.sep`

The platform-specific path segment separator:

- `'\'` on Windows
- `'/'` on POSIX

#### Example:

```javascript
console.log(path.sep); // Output: / on POSIX, \ on Windows
```

### 3.2 `path.delimiter`

The platform-specific delimiter for path segments in the `PATH` environment variable:

- `';'` on Windows
- `':'` on POSIX

#### Example:

```javascript
console.log(path.delimiter); // Output: : on POSIX, ; on Windows
```

---

## Conclusion

The `path` module is essential for file and directory path manipulations in Node.js. Its methods simplify working with paths across different platforms, ensuring compatibility and ease of use.

# URL Module in Node.js

The `url` module in Node.js provides utilities for URL resolution and parsing. It is a core module and does not require installation.

## Importing the `url` Module

To use the `url` module, you can import it using:

```javascript
const url = require("url");
```

---

## Key Classes and Functions

The `url` module exposes the following classes and functions:

### 1. URL Class

The `URL` class provides an interface for parsing and formatting URLs. It is part of the `url` module.

#### Creating a URL Object

```javascript
const myURL = new URL("https://example.com:8000/path/name?query=test#fragment");
console.log(myURL);
```

#### Properties of a URL Object

- `href`: Full URL string.
- `protocol`: Protocol scheme (e.g., `https:`).
- `hostname`: Hostname without port.
- `port`: Port number.
- `pathname`: Path of the URL.
- `search`: Query string, including `?`.
- `hash`: Fragment identifier, including `#`.

Example:

```javascript
console.log(myURL.href); // 'https://example.com:8000/path/name?query=test#fragment'
console.log(myURL.protocol); // 'https:'
console.log(myURL.hostname); // 'example.com'
console.log(myURL.port); // '8000'
console.log(myURL.pathname); // '/path/name'
console.log(myURL.search); // '?query=test'
console.log(myURL.hash); // '#fragment'
```

#### Manipulating URL Properties

- Update URL properties dynamically:

```javascript
myURL.searchParams.append("newKey", "newValue");
console.log(myURL.href); // Updated URL
```

---

### 2. Legacy URL API

The `url` module also provides a legacy API for working with URLs.

#### Parsing URLs

- **`url.parse()`**: Parses a URL string into an object.

```javascript
const parsedURL = url.parse(
  "https://example.com:8000/path/name?query=test#fragment"
);
console.log(parsedURL);
```

Output:

```json
{
  "protocol": "https:",
  "slashes": true,
  "auth": null,
  "host": "example.com:8000",
  "port": "8000",
  "hostname": "example.com",
  "hash": "#fragment",
  "search": "?query=test",
  "query": "query=test",
  "pathname": "/path/name",
  "path": "/path/name?query=test",
  "href": "https://example.com:8000/path/name?query=test#fragment"
}
```

#### Formatting URLs

- **`url.format()`**: Converts a URL object back into a URL string.

```javascript
const urlObject = {
  protocol: "https:",
  host: "example.com:8000",
  pathname: "/path/name",
  search: "?query=test",
};

const formattedURL = url.format(urlObject);
console.log(formattedURL); // 'https://example.com:8000/path/name?query=test'
```

---

### 3. `URLSearchParams` Class

The `URLSearchParams` class provides an interface for working with query strings.

#### Creating a `URLSearchParams` Instance

```javascript
const searchParams = new URLSearchParams("query=test&name=example");
console.log(searchParams);
```

#### Common Methods

- **`append(key, value)`**: Add a new key-value pair.

```javascript
searchParams.append("newKey", "newValue");
console.log(searchParams.toString()); // 'query=test&name=example&newKey=newValue'
```

- **`delete(key)`**: Remove a key-value pair.

```javascript
searchParams.delete("name");
console.log(searchParams.toString()); // 'query=test&newKey=newValue'
```

- **`get(key)`**: Retrieve the value of a key.

```javascript
console.log(searchParams.get("query")); // 'test'
```

- **`has(key)`**: Check if a key exists.

```javascript
console.log(searchParams.has("query")); // true
```

- **`keys()`**: Iterate through all keys.

```javascript
for (const key of searchParams.keys()) {
  console.log(key);
}
```

- **`values()`**: Iterate through all values.

```javascript
for (const value of searchParams.values()) {
  console.log(value);
}
```

---

## Key Differences Between `url.parse` and `URL` Class

| Feature        | `url.parse`                   | `URL` Class                  |
| -------------- | ----------------------------- | ---------------------------- |
| API Type       | Legacy API                    | Modern API                   |
| Input          | String                        | Absolute URL string          |
| Query Handling | Simple parsing (query string) | Works with `URLSearchParams` |

---

## Example: Resolving and Normalizing URLs

### Resolving URLs

- **`url.resolve()`**: Resolves a target URL relative to a base URL.

```javascript
const resolvedURL = url.resolve("https://example.com/path/", "newPath");
console.log(resolvedURL); // 'https://example.com/path/newPath'
```

### Normalizing URLs

- Automatically handled by the `URL` class:

```javascript
const normalizedURL = new URL("https://example.com//double//slashes/");
console.log(normalizedURL.href); // 'https://example.com/double/slashes/'
```

---

## Error Handling

- Always validate URLs before processing.
- Use `try-catch` blocks when working with dynamically generated URLs.

Example:

```javascript
try {
  const myURL = new URL("invalid-url");
} catch (err) {
  console.error("Invalid URL:", err.message);
}
```

---

## Use Cases

1. Parsing and formatting URLs for web applications.
2. Handling query parameters efficiently.
3. Resolving paths in APIs.
4. Validating and sanitizing user-provided URLs.

## Events Module

The events module implements the Observer pattern.

### Basic Event Handling

```javascript
const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

// Event listener
myEmitter.on("event", (arg) => {
  console.log("Event occurred with arg:", arg);
});

// Emit event
myEmitter.emit("event", "test argument");
```

### Advanced Event Features

```javascript
// Once listener (fires only once)
myEmitter.once("oneTimeEvent", () => {
  console.log("This will only fire once");
});

// Remove listener
const listener = () => console.log("Listener");
myEmitter.on("event", listener);
myEmitter.removeListener("event", listener);

// Error event
myEmitter.on("error", (err) => {
  console.error("Error occurred:", err);
});

// Get all listeners
console.log(myEmitter.listeners("event"));

// Set max listeners (default is 10)
myEmitter.setMaxListeners(15);
```

# OS Module in Node.js

The `os` module in Node.js provides a set of operating system-related utility methods and properties. It enables interaction with the underlying operating system and retrieves information such as the system's architecture, platform, and memory usage.

## Importing the `os` Module

To use the `os` module, you can import it using:

```javascript
const os = require("os");
```

---

## Methods and Properties of the `os` Module

### 1. System Information

#### `os.arch()`

Returns the operating system CPU architecture.

```javascript
console.log(os.arch()); // Example: 'x64'
```

#### `os.platform()`

Returns a string identifying the operating system platform.

```javascript
console.log(os.platform()); // Example: 'win32', 'darwin', 'linux'
```

#### `os.type()`

Returns the operating system name.

```javascript
console.log(os.type()); // Example: 'Windows_NT', 'Darwin', 'Linux'
```

#### `os.version()`

Returns the operating system version.

```javascript
console.log(os.version()); // Example: '10.0.19043'
```

#### `os.release()`

Returns the operating system release.

```javascript
console.log(os.release()); // Example: '10.0.19043'
```

---

### 2. CPU and Memory Information

#### `os.cpus()`

Returns an array of objects containing information about each logical CPU core.

```javascript
console.log(os.cpus());
```

Each object includes:

- `model`: The model of the CPU.
- `speed`: The speed (in MHz).
- `times`: An object containing CPU time spent in various states.

#### `os.totalmem()`

Returns the total system memory in bytes.

```javascript
console.log(os.totalmem()); // Example: 17179869184 (16 GB)
```

#### `os.freemem()`

Returns the free system memory in bytes.

```javascript
console.log(os.freemem()); // Example: 8589934592 (8 GB)
```

#### Calculating Memory Usage

```javascript
const totalMemory = os.totalmem();
const freeMemory = os.freemem();
const usedMemory = totalMemory - freeMemory;

console.log(`Total Memory: ${(totalMemory / 1e9).toFixed(2)} GB`);
console.log(`Free Memory: ${(freeMemory / 1e9).toFixed(2)} GB`);
console.log(`Used Memory: ${(usedMemory / 1e9).toFixed(2)} GB`);
```

---

### 3. Network Information

#### `os.networkInterfaces()`

Returns an object containing network interfaces and their details.

```javascript
console.log(os.networkInterfaces());
```

Each network interface includes:

- `address`: The IP address.
- `netmask`: The subnet mask.
- `family`: Address family (`IPv4` or `IPv6`).
- `mac`: The MAC address.
- `internal`: Indicates whether the interface is internal.

---

### 4. User and System Information

#### `os.userInfo()`

Returns information about the current user.

```javascript
console.log(os.userInfo());
```

Output example:

```json
{
  "username": "john",
  "uid": 1001,
  "gid": 1001,
  "shell": "/bin/bash",
  "homedir": "/home/john"
}
```

#### `os.uptime()`

Returns the system uptime in seconds.

```javascript
console.log(os.uptime()); // Example: 123456 (in seconds)
```

Convert uptime to a human-readable format:

```javascript
const uptimeInSeconds = os.uptime();
const hours = Math.floor(uptimeInSeconds / 3600);
const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
const seconds = uptimeInSeconds % 60;

console.log(`Uptime: ${hours}h ${minutes}m ${seconds}s`);
```

---

### 5. Directory and Path Information

#### `os.homedir()`

Returns the current user’s home directory.

```javascript
console.log(os.homedir()); // Example: '/home/john'
```

#### `os.tmpdir()`

Returns the path of the operating system's default temporary directory.

```javascript
console.log(os.tmpdir()); // Example: '/tmp'
```

---

### 6. Endianness

#### `os.endianness()`

Returns the endianness of the CPU (`'BE'` for big-endian or `'LE'` for little-endian).

```javascript
console.log(os.endianness()); // Example: 'LE'
```

---

### 7. Priority and Signals

#### `os.setPriority(pid, priority)`

Sets the scheduling priority for a process.

- `pid`: Process ID (default is `0`, the current process).
- `priority`: Priority level (from `-20` to `19`, lower is higher priority).

```javascript
os.setPriority(0, -10); // Set high priority for the current process
```

#### `os.getPriority(pid)`

Gets the scheduling priority for a process.

```javascript
console.log(os.getPriority(0)); // Example: 0
```

---

## Error Handling

- Always handle potential errors when working with the `os` module.
- Validate the output of methods before processing.

Example:

```javascript
try {
  const userInfo = os.userInfo();
  console.log(userInfo);
} catch (err) {
  console.error("Error fetching user info:", err.message);
}
```

---

## Use Cases

1. Monitor system performance in real-time applications.
2. Retrieve user-specific information for personalization.
3. Access and analyze network interface details.
4. Manage system resources and optimize applications.

# Process Module in Node.js

The `process` module in Node.js provides a way to interact with the current Node.js process. It is a global object, meaning it can be accessed anywhere without requiring additional imports. This module is particularly useful for accessing environment variables, controlling the Node.js runtime, and managing input/output streams.

## Introduction to the Process Module

The `process` module is a built-in module in Node.js that provides information and control over the current Node.js process. It includes properties and methods to interact with the runtime environment, handle system signals, and manage input/output streams.

---

## Key Features of the Process Module

- Access to environment variables.
- Fetching command-line arguments.
- Handling and emitting events.
- Controlling the process lifecycle (e.g., terminating the process).
- Fetching runtime-related information, such as Node.js version and platform.

---

## Process Properties

### process.argv

- **Definition:** An array that contains the command-line arguments passed to the Node.js process.
- **Example:**
  ```javascript
  console.log(process.argv);
  ```
- **Use Cases:** Parsing CLI inputs or arguments for dynamic behavior.

### process.env

- **Definition:** An object containing the user environment variables.
- **Example:**
  ```javascript
  console.log(process.env.NODE_ENV);
  ```
- **Use Cases:** Configuring environments (e.g., `development`, `production`).

### process.cwd()

- **Definition:** Returns the current working directory of the Node.js process.
- **Example:**
  ```javascript
  console.log(process.cwd());
  ```
- **Use Cases:** Locating files relative to the current working directory.

### process.version

- **Definition:** Returns the Node.js version.
- **Example:**
  ```javascript
  console.log(process.version);
  ```
- **Use Cases:** Ensuring compatibility with specific Node.js versions.

### process.versions

- **Definition:** Provides a detailed list of versions for Node.js and its dependencies.
- **Example:**
  ```javascript
  console.log(process.versions);
  ```
- **Use Cases:** Checking dependencies like V8, OpenSSL, and others.

### process.platform

- **Definition:** Returns a string identifying the operating system platform.
- **Example:**
  ```javascript
  console.log(process.platform);
  ```
- **Use Cases:** Implementing platform-specific logic (e.g., `win32`, `linux`).

---

## Process Methods

### process.exit()

- **Definition:** Exits the Node.js process with a specified code.
- **Example:**
  ```javascript
  process.exit(0); // Exits with success code
  ```
- **Use Cases:** Gracefully terminating the application.

### process.kill()

- **Definition:** Sends a signal to a process by its PID.
- **Example:**
  ```javascript
  process.kill(12345, "SIGTERM");
  ```
- **Use Cases:** Managing external processes.

### process.chdir()

- **Definition:** Changes the current working directory of the Node.js process.
- **Example:**
  ```javascript
  process.chdir("/path/to/directory");
  console.log(process.cwd());
  ```
- **Use Cases:** Dynamically switching the working directory.

### process.uptime()

- **Definition:** Returns the number of seconds the Node.js process has been running.
- **Example:**
  ```javascript
  console.log(process.uptime());
  ```
- **Use Cases:** Monitoring application uptime.

---

## Process Events

The `process` module can emit various events that provide insights into the runtime state:

- **'exit':** Triggered when the process is about to exit.
- **'uncaughtException':** Triggered when an exception is not caught.
- **'signal':** Triggered when a specific signal is received.

**Example:**

```javascript
process.on("exit", (code) => {
  console.log(`Process exiting with code: ${code}`);
});
```

---

## Examples

### Example 1: Accessing Command-Line Arguments

```javascript
const args = process.argv.slice(2);
console.log(`Arguments: ${args.join(", ")}`);
```

### Example 2: Setting and Accessing Environment Variables

```javascript
process.env.NODE_ENV = "development";
console.log(`Environment: ${process.env.NODE_ENV}`);
```

### Example 3: Handling Events

```javascript
process.on("uncaughtException", (err) => {
  console.error("Unhandled Exception:", err);
  process.exit(1);
});

throw new Error("This will trigger uncaughtException");
```

---

## Summary

The `process` module is a fundamental part of Node.js that facilitates interaction with the runtime environment. By understanding its properties, methods, and events, developers can build more efficient and robust applications.

# Stream and Crypto Modules in Node.js

## Stream Module

The `stream` module in Node.js provides an API to handle streaming data. It is a core module designed to work with large data chunks in a memory-efficient way by processing them piece-by-piece, rather than loading the entire data into memory.

### Types of Streams

1. **Readable Streams**

   - Used to read data.
   - Examples: HTTP requests, files, sockets.

2. **Writable Streams**

   - Used to write data.
   - Examples: HTTP responses, files, sockets.

3. **Duplex Streams**

   - Implement both readable and writable interfaces.
   - Example: TCP sockets.

4. **Transform Streams**
   - A type of Duplex stream used to modify or transform the data as it is read and written.
   - Example: `zlib.createGzip()`.

---

### Creating and Using Streams

#### Example: Readable Stream

```javascript
const fs = require("fs");
const readableStream = fs.createReadStream("./input.txt", "utf8");

readableStream.on("data", (chunk) => {
  console.log("Chunk received:", chunk);
});

readableStream.on("end", () => {
  console.log("No more data.");
});
```

#### Example: Writable Stream

```javascript
const fs = require("fs");
const writableStream = fs.createWriteStream("./output.txt");

writableStream.write("Hello, world!\n");
writableStream.end("Stream writing complete.");
```

#### Example: Pipe Streams

Efficiently transfer data between streams.

```javascript
const fs = require("fs");
const readableStream = fs.createReadStream("./input.txt");
const writableStream = fs.createWriteStream("./output.txt");

readableStream.pipe(writableStream);
```

---

### Common Stream Methods and Events

- **Events**:

  - `data`: Emitted when a chunk of data is available.
  - `end`: Emitted when no more data is available.
  - `error`: Emitted on errors.
  - `close`: Emitted when the stream is closed.

- **Methods**:
  - `read()`: Reads data from the stream.
  - `write(data)`: Writes data to the stream.
  - `pipe(destination)`: Pipes data to another stream.

---

## Crypto Module

The `crypto` module in Node.js provides cryptographic functionality to handle encryption, hashing, and digital signatures. It includes implementations of secure algorithms.

### Importing the `crypto` Module

```javascript
const crypto = require("crypto");
```

---

### Hashing

Used to generate a fixed-size hash from input data.

#### Example: Generate SHA-256 Hash

```javascript
const hash = crypto.createHash("sha256");
hash.update("Hello, world!");
console.log(hash.digest("hex")); // Outputs the hash in hexadecimal format
```

---

### Encryption and Decryption

#### Example: Symmetric Encryption with AES

```javascript
const algorithm = "aes-256-cbc";
const key = crypto.randomBytes(32); // Must be 32 bytes for aes-256-cbc
const iv = crypto.randomBytes(16);

// Encryption
const cipher = crypto.createCipheriv(algorithm, key, iv);
let encrypted = cipher.update("Hello, world!", "utf8", "hex");
encrypted += cipher.final("hex");
console.log("Encrypted:", encrypted);

// Decryption
const decipher = crypto.createDecipheriv(algorithm, key, iv);
let decrypted = decipher.update(encrypted, "hex", "utf8");
decrypted += decipher.final("utf8");
console.log("Decrypted:", decrypted);
```

---

### Key Pair Generation and Digital Signatures

#### Example: RSA Key Pair Generation

```javascript
const { generateKeyPairSync } = crypto;

const { publicKey, privateKey } = generateKeyPairSync("rsa", {
  modulusLength: 2048,
});

console.log("Public Key:", publicKey.export({ type: "pkcs1", format: "pem" }));
console.log(
  "Private Key:",
  privateKey.export({ type: "pkcs1", format: "pem" })
);
```

#### Example: Digital Signature

```javascript
const sign = crypto.createSign("SHA256");
sign.update("Hello, world!");
sign.end();
const signature = sign.sign(privateKey, "hex");
console.log("Signature:", signature);

const verify = crypto.createVerify("SHA256");
verify.update("Hello, world!");
verify.end();
const isValid = verify.verify(publicKey, signature, "hex");
console.log("Signature valid:", isValid);
```

---

### Random Bytes and Salts

#### Example: Generate Random Bytes

```javascript
crypto.randomBytes(16, (err, buffer) => {
  if (err) throw err;
  console.log("Random Bytes:", buffer.toString("hex"));
});
```

---

### PBKDF2 (Password-Based Key Derivation Function 2)

#### Example: Deriving a Key

```javascript
crypto.pbkdf2("password", "salt", 100000, 64, "sha512", (err, derivedKey) => {
  if (err) throw err;
  console.log("Derived Key:", derivedKey.toString("hex"));
});
```

---

## Use Cases

### Stream Module Use Cases

1. Processing large files (e.g., video or logs).
2. Building real-time applications (e.g., chat applications).
3. Piping data between input and output streams efficiently.

### Crypto Module Use Cases

1. Storing hashed passwords securely.
2. Encrypting sensitive data before storage.
3. Generating and verifying digital signatures.
4. Securing communication in network applications.

# Timers Module in Node.js

The `timers` module in Node.js provides functions to execute code after a specified delay or at regular intervals. It plays a crucial role in asynchronous programming by allowing scheduled execution of callbacks.

## Core Timer Functions

### 1. `setTimeout()`

Executes a function after a specified delay (in milliseconds).

#### Syntax

```javascript
setTimeout(callback, delay, ...args);
```

- `callback`: The function to execute.
- `delay`: Time in milliseconds to wait before execution.
- `...args`: Arguments to pass to the `callback`.

#### Example

```javascript
setTimeout(() => {
  console.log("Executed after 2 seconds");
}, 2000);
```

---

### 2. `clearTimeout()`

Cancels a `setTimeout()` before it executes.

#### Syntax

```javascript
clearTimeout(timeoutId);
```

- `timeoutId`: The identifier returned by `setTimeout()`.

#### Example

```javascript
const timerId = setTimeout(() => {
  console.log("This will not execute");
}, 2000);

clearTimeout(timerId);
```

---

### 3. `setInterval()`

Executes a function repeatedly at specified intervals (in milliseconds).

#### Syntax

```javascript
setInterval(callback, delay, ...args);
```

- `callback`: The function to execute.
- `delay`: Time in milliseconds between each execution.
- `...args`: Arguments to pass to the `callback`.

#### Example

```javascript
const intervalId = setInterval(() => {
  console.log("Executed every 1 second");
}, 1000);
```

---

### 4. `clearInterval()`

Stops a `setInterval()` from continuing execution.

#### Syntax

```javascript
clearInterval(intervalId);
```

- `intervalId`: The identifier returned by `setInterval()`.

#### Example

```javascript
const intervalId = setInterval(() => {
  console.log("This will stop after 5 seconds");
}, 1000);

setTimeout(() => {
  clearInterval(intervalId);
}, 5000);
```

---

### 5. `setImmediate()`

Executes a function immediately after the current event loop completes.

#### Syntax

```javascript
setImmediate(callback, ...args);
```

- `callback`: The function to execute.
- `...args`: Arguments to pass to the `callback`.

#### Example

```javascript
setImmediate(() => {
  console.log("Executed immediately after the current event loop");
});
```

---

### 6. `clearImmediate()`

Cancels a `setImmediate()` before it executes.

#### Syntax

```javascript
clearImmediate(immediateId);
```

- `immediateId`: The identifier returned by `setImmediate()`.

#### Example

```javascript
const immediateId = setImmediate(() => {
  console.log("This will not execute");
});

clearImmediate(immediateId);
```

---

## Differences Between Timers

| Function         | Use Case                                 | Example Timing               |
| ---------------- | ---------------------------------------- | ---------------------------- |
| `setTimeout()`   | Delay execution once                     | After the specified delay    |
| `setInterval()`  | Execute repeatedly at fixed intervals    | Every specified interval     |
| `setImmediate()` | Execute immediately after I/O operations | At the end of the event loop |

---

## Use Cases

### 1. Delayed Execution

Using `setTimeout()` for delayed tasks like animations, API calls, or retries.

### 2. Periodic Tasks

Using `setInterval()` for repeated tasks like polling or sending heartbeat signals.

### 3. Immediate Callbacks

Using `setImmediate()` for tasks that must run after the current phase of the event loop.

---

## Best Practices

1. **Avoid Memory Leaks**: Always clear timers (`clearTimeout`, `clearInterval`, `clearImmediate`) when they are no longer needed.
2. **Use `setImmediate` Over `setTimeout` (0ms)**: `setImmediate` is faster and more efficient than `setTimeout(fn, 0)`.
3. **Manage Long-Running Intervals**: Use logic to pause or stop intervals when they are no longer needed.

---

# Timers Module in Node.js

The `timers` module in Node.js provides functions to execute code after a specified delay or at regular intervals. It plays a crucial role in asynchronous programming by allowing scheduled execution of callbacks.

## Core Timer Functions

### 1. `setTimeout()`

Executes a function after a specified delay (in milliseconds).

#### Syntax

```javascript
setTimeout(callback, delay, ...args);
```

- `callback`: The function to execute.
- `delay`: Time in milliseconds to wait before execution.
- `...args`: Arguments to pass to the `callback`.

#### Example

```javascript
setTimeout(() => {
  console.log("Executed after 2 seconds");
}, 2000);
```

---

### 2. `clearTimeout()`

Cancels a `setTimeout()` before it executes.

#### Syntax

```javascript
clearTimeout(timeoutId);
```

- `timeoutId`: The identifier returned by `setTimeout()`.

#### Example

```javascript
const timerId = setTimeout(() => {
  console.log("This will not execute");
}, 2000);

clearTimeout(timerId);
```

---

### 3. `setInterval()`

Executes a function repeatedly at specified intervals (in milliseconds).

#### Syntax

```javascript
setInterval(callback, delay, ...args);
```

- `callback`: The function to execute.
- `delay`: Time in milliseconds between each execution.
- `...args`: Arguments to pass to the `callback`.

#### Example

```javascript
const intervalId = setInterval(() => {
  console.log("Executed every 1 second");
}, 1000);
```

---

### 4. `clearInterval()`

Stops a `setInterval()` from continuing execution.

#### Syntax

```javascript
clearInterval(intervalId);
```

- `intervalId`: The identifier returned by `setInterval()`.

#### Example

```javascript
const intervalId = setInterval(() => {
  console.log("This will stop after 5 seconds");
}, 1000);

setTimeout(() => {
  clearInterval(intervalId);
}, 5000);
```

---

### 5. `setImmediate()`

Executes a function immediately after the current event loop completes.

#### Syntax

```javascript
setImmediate(callback, ...args);
```

- `callback`: The function to execute.
- `...args`: Arguments to pass to the `callback`.

#### Example

```javascript
setImmediate(() => {
  console.log("Executed immediately after the current event loop");
});
```

---

### 6. `clearImmediate()`

Cancels a `setImmediate()` before it executes.

#### Syntax

```javascript
clearImmediate(immediateId);
```

- `immediateId`: The identifier returned by `setImmediate()`.

#### Example

```javascript
const immediateId = setImmediate(() => {
  console.log("This will not execute");
});

clearImmediate(immediateId);
```

---

## Differences Between Timers

| Function         | Use Case                                 | Example Timing               |
| ---------------- | ---------------------------------------- | ---------------------------- |
| `setTimeout()`   | Delay execution once                     | After the specified delay    |
| `setInterval()`  | Execute repeatedly at fixed intervals    | Every specified interval     |
| `setImmediate()` | Execute immediately after I/O operations | At the end of the event loop |

---

## Use Cases

### 1. Delayed Execution

Using `setTimeout()` for delayed tasks like animations, API calls, or retries.

### 2. Periodic Tasks

Using `setInterval()` for repeated tasks like polling or sending heartbeat signals.

### 3. Immediate Callbacks

Using `setImmediate()` for tasks that must run after the current phase of the event loop.

---

## Best Practices

1. **Avoid Memory Leaks**: Always clear timers (`clearTimeout`, `clearInterval`, `clearImmediate`) when they are no longer needed.
2. **Use `setImmediate` Over `setTimeout` (0ms)**: `setImmediate` is faster and more efficient than `setTimeout(fn, 0)`.
3. **Manage Long-Running Intervals**: Use logic to pause or stop intervals when they are no longer needed.

---

For more details, refer to the official documentation:

- [Node.js Timers Documentation](https://nodejs.org/api/timers.html)

---

# Cluster Module in Node.js

The `cluster` module enables the creation of child processes that share the same server port, which is particularly useful for utilizing multi-core systems effectively.

## Key Concepts

### 1. Primary Process and Workers

- The primary process spawns worker processes.
- Workers handle incoming requests, while the primary process manages their lifecycle.

### 2. Sharing Ports

- Workers share the same TCP connection and handle requests independently.

---

## Core Methods and Properties

### 1. `cluster.isPrimary`

A boolean indicating if the current process is the primary process.

#### Example

```javascript
if (cluster.isPrimary) {
  console.log("Primary process");
}
```

---

### 2. `cluster.isWorker`

A boolean indicating if the current process is a worker.

#### Example

```javascript
if (cluster.isWorker) {
  console.log("Worker process");
}
```

---

### 3. `cluster.fork()`

Spawns a new worker process.

#### Syntax

```javascript
cluster.fork([env]);
```

- `env`: Optional environment variables for the worker.

#### Example

```javascript
const cluster = require("cluster");

if (cluster.isPrimary) {
  cluster.fork();
  cluster.fork();
} else {
  console.log("Worker process");
}
```

---

### 4. `cluster.on()`

Listens for cluster-related events.

#### Example

```javascript
cluster.on("exit", (worker, code, signal) => {
  console.log(`Worker ${worker.process.pid} exited`);
});
```

---

# Child Process Module in Node.js

The `child_process` module provides the ability to spawn child processes and communicate with them.

## Core Methods

### 1. `spawn()`

Spawns a new process.

#### Syntax

```javascript
child_process.spawn(command, [args], [options]);
```

#### Example

```javascript
const { spawn } = require("child_process");
const ls = spawn("ls", ["-lh", "/usr"]);

ls.stdout.on("data", (data) => {
  console.log(`Output: ${data}`);
});
```

---

### 2. `exec()`

Executes a command in a shell and buffers the output.

#### Syntax

```javascript
child_process.exec(command, [options], callback);
```

#### Example

```javascript
const { exec } = require("child_process");
exec("ls", (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error}`);
    return;
  }
  console.log(`Output: ${stdout}`);
});
```

---

### 3. `fork()`

Creates a new Node.js process with a separate instance of the V8 engine.

#### Example

```javascript
const { fork } = require("child_process");
const worker = fork("./worker.js");

worker.on("message", (message) => {
  console.log(`Received: ${message}`);
});

worker.send("Hello from parent");
```

---

For more details, refer to the official documentation:

- [Node.js Cluster Documentation](https://nodejs.org/api/cluster.html)
- [Node.js Child Process Documentation](https://nodejs.org/api/child_process.html)
