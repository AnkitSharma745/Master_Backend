# Middleware in Express.js

## **What is Middleware?**

Middleware functions are functions that have access to the request object (`req`), the response object (`res`), and the `next` middleware function in the application’s request-response cycle. They can:

1. Execute any code.
2. Modify the request and response objects.
3. End the request-response cycle.
4. Call the next middleware function.

Middleware is the backbone of Express.js, enabling functionalities like logging, authentication, error handling, and more.

---

## **Why Middleware?**

### **Problem in Vanilla Node.js:**

- When handling HTTP requests, tasks like parsing request bodies, logging, and authentication need to be handled repeatedly in multiple routes.
- Example:

  ```javascript
  const http = require("http");

  const server = http.createServer((req, res) => {
    if (req.url === "/api" && req.method === "GET") {
      console.log("Incoming request"); // Logging every time
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Hello, World!" }));
    } else {
      res.writeHead(404);
      res.end("Not Found");
    }
  });

  server.listen(3000);
  ```

- **Challenges:**
  - Code duplication for tasks like logging.
  - Difficult to scale and manage common logic.

### **How Middleware Solves It:**

- Middleware modularizes repetitive tasks.
- Example: Logging middleware logs each request automatically without duplicating code in routes.

---

## **Types of Middleware**

1. **Built-in Middleware**

   - Middleware provided by Express.
   - Examples:
     - `express.json()`: Parses incoming JSON request bodies.
     - `express.static()`: Serves static files.

2. **Third-party Middleware**

   - External middleware packages.
   - Example: `morgan` for logging HTTP requests.

3. **Custom Middleware**
   - Middleware you write for specific tasks.
   - Example: Authentication, logging, etc.

---

## **Middleware Workflow**

1. **Request Flow:**

   - A client sends a request.
   - Middleware functions process the request sequentially.
   - A route handler sends a response.

2. **Using `next()`:**
   - Middleware calls `next()` to pass control to the next middleware.

---

## **Examples of Middleware**

### **1. Built-in Middleware: Parsing JSON**

```javascript
const express = require("express");
const app = express();

// Built-in middleware
app.use(express.json());

app.post("/data", (req, res) => {
  console.log(req.body); // Access parsed JSON body
  res.send("Data received");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

- **Test:**
  ```bash
  curl -X POST -H "Content-Type: application/json" -d '{"name": "John"}' http://localhost:3000/data
  ```

---

### **2. Third-party Middleware: Morgan**

```javascript
const express = require("express");
const morgan = require("morgan");
const app = express();

// Third-party middleware
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

- **What it does:** Logs all HTTP requests in the console.
- **Output Example:**
  ```
  GET / 200 4.567 ms - 12
  ```

---

### **3. Custom Middleware: Logging Requests**

```javascript
const express = require("express");
const app = express();

// Custom middleware
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next(); // Pass control to the next middleware or route handler
});

app.get("/", (req, res) => {
  res.send("Welcome to the Home Page");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

- **What it does:** Logs HTTP method and URL for each incoming request.
- **Output Example:**
  ```
  GET request to /
  ```

---

### **4. Error-handling Middleware**

Error-handling middleware is defined with four parameters: `(err, req, res, next)`.

```javascript
const express = require("express");
const app = express();

// Custom middleware
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error); // Pass error to error-handling middleware
});

// Error-handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      message: err.message,
    },
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

- **Test:** Visit any undefined route (e.g., `/unknown`).
- **Output:**
  ```json
  {
    "error": {
      "message": "Not Found"
    }
  }
  ```

---

## **Real-life Example: Authentication Middleware**

### **Scenario:**

Restrict access to specific routes for authenticated users.

```javascript
const express = require("express");
const app = express();

// Authentication middleware
const authenticate = (req, res, next) => {
  const token = req.headers["authorization"];
  if (token === "secret-token") {
    next(); // Proceed if authenticated
  } else {
    res.status(403).send("Forbidden: Invalid token");
  }
};

// Public route
app.get("/", (req, res) => {
  res.send("Welcome to the Public Page");
});

// Protected route
app.get("/dashboard", authenticate, (req, res) => {
  res.send("Welcome to the Dashboard");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

- **Test:**
  - Public route: `curl http://localhost:3000/`
  - Protected route (with token):
    ```bash
    curl -H "Authorization: secret-token" http://localhost:3000/dashboard
    ```

---

## **Best Practices**

1. Use middleware in a logical order.
2. Avoid overloading middleware with too much logic.
3. Modularize middleware into separate files for better readability.

---
