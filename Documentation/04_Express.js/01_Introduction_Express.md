# Introduction to Express.js

## **What is Express.js?**

Express.js is a lightweight and flexible web application framework for Node.js. It provides a robust set of features to develop web and mobile applications. It simplifies tasks like routing, handling HTTP requests, and managing middleware, making it easier to build scalable web applications.

---

## **Why Use Express.js?**

### **Problem in Vanilla Node.js:**

- When building a web server with the `http` module, handling routes, parsing data, and managing responses manually can become complex.
- Example:

  ```javascript
  const http = require("http");

  const server = http.createServer((req, res) => {
    if (req.url === "/" && req.method === "GET") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Welcome to the Home Page");
    } else if (req.url === "/about" && req.method === "GET") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("About Us");
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Page Not Found");
    }
  });

  server.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
  ```

- **Challenges:**
  - Manually handling routing logic.
  - Tedious to parse request bodies.
  - Lack of middleware support for repetitive tasks like logging and authentication.

### **How Express Solves It:**

- Built-in routing system.
- Middleware simplifies repetitive tasks.
- Supports plugins for additional functionality.
- Cleaner and more readable code.

---

## **Setting Up Express.js**

### **Installation**

1. Initialize a new Node.js project:
   ```bash
   npm init -y
   ```
2. Install Express:
   ```bash
   npm install express
   ```

### **Creating a Basic Express App**

```javascript
const express = require("express");
const app = express();

// Define a route
app.get("/", (req, res) => {
  res.send("Welcome to Express!");
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

- **Output:** Visit `http://localhost:3000` to see the message "Welcome to Express!"

---

## **Understanding Express App Components**

### **1. Routes**

A route defines how an application responds to a specific HTTP request method and URL.

- Example:

  ```javascript
  app.get("/about", (req, res) => {
    res.send("About Us");
  });

  app.post("/submit", (req, res) => {
    res.send("Form Submitted");
  });
  ```

### **2. Middleware**

Middleware functions are executed during the lifecycle of a request to the server. They can modify the request or response objects.

- Example:
  ```javascript
  // Custom middleware
  app.use((req, res, next) => {
    console.log(`${req.method} request to ${req.url}`);
    next(); // Pass control to the next middleware or route handler
  });
  ```

### **3. Application Object (`app`)**

The `app` object in Express represents the application. It is used to:

- Define routes.
- Configure middleware.
- Start the server.

---

## **Real-World Example**

### **Scenario:**

Build a small Express app for a library.

1. **Project Setup:**

   ```bash
   mkdir express-library && cd express-library
   npm init -y
   npm install express
   ```

2. **App Code:**

   ```javascript
   const express = require("express");
   const app = express();

   // Home route
   app.get("/", (req, res) => {
     res.send("Welcome to the Library");
   });

   // Books route
   app.get("/books", (req, res) => {
     res.json([
       { id: 1, title: "1984", author: "George Orwell" },
       { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
     ]);
   });

   // Specific book route
   app.get("/books/:id", (req, res) => {
     const { id } = req.params;
     const books = [
       { id: 1, title: "1984", author: "George Orwell" },
       { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
     ];
     const book = books.find((b) => b.id === parseInt(id));

     if (book) {
       res.json(book);
     } else {
       res.status(404).send("Book not found");
     }
   });

   const PORT = 3000;
   app.listen(PORT, () => {
     console.log(`Library app running on port ${PORT}`);
   });
   ```

3. **Test the App:**
   - Visit `http://localhost:3000/` to see "Welcome to the Library."
   - Visit `http://localhost:3000/books` to get the list of books.
   - Visit `http://localhost:3000/books/1` to get details of a specific book.

---
