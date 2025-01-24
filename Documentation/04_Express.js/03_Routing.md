# Routing in Express.js

## **What is Routing?**

Routing in Express.js is the process of defining application endpoints (URIs) and how the server responds to client requests for those endpoints. Each route can handle one or more HTTP methods, such as GET, POST, PUT, DELETE, etc.

---

## **Why Routing is Important**

Routing is essential for organizing your application logic and managing how different parts of your application interact with user requests. Without routing:

- Applications become monolithic and harder to maintain.
- Scalability is compromised.
- Code duplication is common.

---

## **Route Definition Syntax**

```javascript
app.METHOD(PATH, HANDLER);
```

- **`METHOD`**: The HTTP method (GET, POST, PUT, DELETE, etc.).
- **`PATH`**: The endpoint or route URL (e.g., `/books`, `/users/:id`).
- **`HANDLER`**: A callback function executed when the route is matched.

---

## **Basic Routing Example**

```javascript
const express = require("express");
const app = express();

// GET route
app.get("/", (req, res) => {
  res.send("Welcome to the Home Page");
});

// POST route
app.post("/submit", (req, res) => {
  res.send("Form Submitted");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

---

## **Dynamic Routes**

Dynamic routes allow you to capture values from the URL and use them in your application logic.

### **Example**:

```javascript
app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  res.send(`User ID: ${userId}`);
});
```

- Visiting `http://localhost:3000/users/123` will respond with `User ID: 123`.

---

## **Route Parameters**

Route parameters are named segments in the URL that are captured as properties of the `req.params` object.

### **Multiple Parameters**:

```javascript
app.get("/users/:userId/books/:bookId", (req, res) => {
  const { userId, bookId } = req.params;
  res.send(`User ID: ${userId}, Book ID: ${bookId}`);
});
```

---

## **Query Parameters**

Query parameters are appended to the URL after a `?` and provide additional information to the request.

### **Example**:

```javascript
app.get("/search", (req, res) => {
  const { q } = req.query;
  res.send(`Search Query: ${q}`);
});
```

- Visiting `http://localhost:3000/search?q=nodejs` will respond with `Search Query: nodejs`.

---

## **Route Handling with Middleware**

Middleware functions can be used to execute code, modify the request/response, or terminate the request-response cycle.

### **Example**:

```javascript
// Middleware for logging
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.send("Home Page");
});
```

---

## **Real-World Example**

### **Scenario: Build an Online Store API**

#### **Project Setup:**

```bash
mkdir express-store && cd express-store
npm init -y
npm install express
```

#### **App Code:**

```javascript
const express = require("express");
const app = express();

// Products route
app.get("/products", (req, res) => {
  res.json([
    { id: 1, name: "Laptop", price: 1000 },
    { id: 2, name: "Phone", price: 500 },
  ]);
});

// Product by ID
app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  const products = [
    { id: 1, name: "Laptop", price: 1000 },
    { id: 2, name: "Phone", price: 500 },
  ];
  const product = products.find((p) => p.id === parseInt(id));

  if (product) {
    res.json(product);
  } else {
    res.status(404).send("Product not found");
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Store API running on port ${PORT}`);
});
```

#### **Test the API:**

1. `GET /products` → Returns a list of products.
2. `GET /products/1` → Returns details of the product with ID 1.

---

## **Key Takeaways**

- Routing is at the core of Express.js applications.
- Dynamic routes and query parameters make applications flexible and interactive.
- Middleware can enhance the functionality of routes by adding logging, authentication, etc.
